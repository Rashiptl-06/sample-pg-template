import { createClient } from 'redis';
import config from '../config';

export const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on('error', (error) => {
  console.error('Redis Client Error', error);
});

export async function connectToRedis(): Promise<void> {
  await redisClient.connect();
  console.log('Redis connection established');

//   await redisClient.set('test', 'hello');

//   const value = await redisClient.get('test');

//   console.log('Redis test value:', value);
}

export default redisClient;