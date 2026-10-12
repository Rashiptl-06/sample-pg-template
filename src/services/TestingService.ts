import loggerFactory from '../utils/logging';
import { BaseService } from './BaseService';
import { IUserToken } from '../interfaces/IUserToken';
import { Permission } from '../interfaces/Permission';
import TestingRepository from '../repositories/TestingRepository';
import { RedisDb } from '../db';

const logger = loggerFactory.getLogger('TestingService');

export class TestingService extends BaseService {
  constructor() {
    super();
  }

  protected get testingRepository() {
    return new TestingRepository();
  }

  // async getAll(byUser?: IUserToken) {
  //   await this.authorize(Permission.view, byUser);
  //   logger.info('Fetching all records from testing table');
  //   return this.testingRepository.getAll();
  // }
  // async getAll(byUser?: IUserToken) {
  //   await this.authorize(Permission.view, byUser);

  //   const cacheKey = 'testingdata:all';

  //   const cachedData = await RedisDb.get(cacheKey);

  //   if (cachedData) {
  //     logger.info('Testing data fetched from Redis cache');
  //     const parsedData =
  //       JSON.parse(cachedData) as Awaited<ReturnType<TestingRepository['getAll']>>;

  //     return parsedData;
  //   }

  //   logger.info('Testing data cache miss, fetching from PostgreSQL');

  //   const data = await this.testingRepository.getAll();

  //   // await RedisDb.set(cacheKey, JSON.stringify(data));
  //   await RedisDb.set(cacheKey, JSON.stringify(data), {
  //     EX: 300,
  //   });
  //   return data;
  // }
  async getAll(byUser?: IUserToken) {
    await this.authorize(Permission.view, byUser);

    const cacheKey = 'testingdata:all';

    try {
      const cachedData = await RedisDb.get(cacheKey);

      if (cachedData) {
        logger.info('Testing data fetched from Redis cache');

        const parsedData =
          JSON.parse(cachedData) as Awaited<
            ReturnType<TestingRepository['getAll']>
          >;

        return parsedData;
      }
    } catch (error) {
      logger.warn('Redis cache read failed, fetching from PostgreSQL', {
        error: error instanceof Error ? error.message : String(error),
      });
    }

    logger.info('Testing data cache miss, fetching from PostgreSQL');

    const data = await this.testingRepository.getAll();

    try {
      await RedisDb.set(cacheKey, JSON.stringify(data), {
        EX: 300,
      });
    } catch (error) {
      logger.warn('Redis cache write failed', {
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return data;
  }
}
