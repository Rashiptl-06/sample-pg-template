import loggerFactory from '../utils/logging';
import { BaseService } from './BaseService';
import {
  Transaction,
  UniqueConstraintError,
} from 'sequelize';
import { IUserToken } from '../interfaces/IUserToken';
import { Permission } from '../interfaces/Permission';
import DealRepository from '../repositories/DealRepository';
import { ICreateDealRequest } from '../interfaces/requests/ICreateDealRequest';
import { IListDealsParams } from '../interfaces/requests/IListDealsParams';
import { RequiredParametersFramework } from '../interfaces/requests/IListEvaluationFrameworkRequest';
import { NotFoundError } from '../exceptions/NotFoundError';
import EvaluationFrameworkRepository from '../repositories/EvaluationFrameworkRepository';
import { RequiredParametersResponse } from '../interfaces/requests/IListEvaluationFrameworkRequest';
import {
  DealMaterialsListParams,
  DealMaterialRow,
} from '../interfaces/entities/IDealMaterial';
import { buildAuditLogsPagination, sanitizeAuditSummary } from '../utils/dealAuditLogDisplay';
import { DealAuditLogsBody, DealAuditLogsQuery } from '../interfaces/requests/IDealMaterialsRequest';
import { PostgresDb } from '../db';
import { RedisDb } from '../db';
import { ConditionalBadRequest } from '../exceptions/ConditionalBadRequest';

const logger = loggerFactory.getLogger('DealService');

export class DealService extends BaseService {
  // getMaterials(user: IUserToken | undefined, dealId: number, arg2: { search: string | undefined; classificationId: number | undefined; fileTypes: string[]; page: number; limit: number; sortBy: string; sortOrder: "asc" | "desc"; }) {
  //   throw new Error('Method not implemented.');
  // }
  private normalizeFileTypes(fileTypes?: string[]): string[] {
    return (fileTypes ?? [])
      .map((fileType) => fileType.trim().toLowerCase())
      .filter(Boolean);
  }

  protected get dealRepository() {
    return new DealRepository();
  }
  private readonly evaluationFrameworkRepository: EvaluationFrameworkRepository;

  constructor() {
    super();
    this.evaluationFrameworkRepository = new EvaluationFrameworkRepository();
  }

  // async getAll(byUser?: IUserToken) {
  //   await this.authorize(Permission.view, byUser);
  //   logger.info('Fetching all records from deals table');
  //   return this.dealRepository.getDeals();
  // }
  async getAll(
    params: IListDealsParams,
    byUser?: IUserToken,
  ) {
    await this.authorize(Permission.view, byUser);
    logger.info('Fetching deals');
    return this.dealRepository.getDeals(params);
  }

  // async getDealById(
  //   byUser: IUserToken | undefined,
  //   dealId: number,
  // ) {
  //   await this.authorize(Permission.view, byUser);

  //   const cacheKey = `deal:${dealId}`; // Use a unique cache key for each deal

  //   const cachedData = await RedisDb.get(cacheKey);

  //   if (cachedData) {
  //     logger.info('Deal fetched from Redis cache', { dealId });

  //     const parsedData =
  //       JSON.parse(cachedData) as Record<string, unknown>;

  //     return {
  //       success: true,
  //       data: parsedData,
  //     };
  //   }

  //   logger.info('Deal cache miss, fetching from PostgreSQL', { dealId });

  //   const deal = await this.dealRepository.findDealById(dealId);

  //   if (!deal) {
  //     throw new NotFoundError(`Deal with id ${dealId} not found`);
  //   }

  //   await RedisDb.set(cacheKey, JSON.stringify(deal), {
  //     EX: 300,
  //   });

  //   return {
  //     success: true,
  //     data: deal,
  //   };
  // }

  async getDealById(
    byUser: IUserToken | undefined,
    dealId: number,
  ) {
    await this.authorize(Permission.view, byUser);

    const cacheKey = `deal:${dealId}`;

    try {
      const cachedData = await RedisDb.get(cacheKey);

      if (cachedData) {
        logger.info('Deal fetched from Redis cache', { dealId });

        const parsedData =
          JSON.parse(cachedData) as Record<string, unknown>;

        return {
          success: true,
          data: parsedData,
        };
      }
    } catch (error) {
      logger.warn('Redis deal cache read failed, fetching from PostgreSQL', {
        dealId,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    logger.info('Deal cache miss, fetching from PostgreSQL', { dealId });

    const deal = await this.dealRepository.findDealById(dealId);

    if (!deal) {
      throw new NotFoundError(`Deal with id ${dealId} not found`);
    }

    try {
      await RedisDb.set(cacheKey, JSON.stringify(deal), {
        EX: 300,
      });
    } catch (error) {
      logger.warn('Redis deal cache write failed', {
        dealId,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return {
      success: true,
      data: deal,
    };
  }

  async create(data: ICreateDealRequest, byUser?: IUserToken) {
    await this.authorize(Permission.create, byUser);
    logger.info(`Creating deal: ${data.dealName}`);

    return this.dealRepository.createDeal(data);
  }

  async getRequiredParameters(
    dealId: number,
    byUser?: IUserToken,
  ): Promise<RequiredParametersResponse> {
    await this.authorize(Permission.view, byUser);

    logger.info(`Fetching required parameters for deal: ${dealId}`);

    const deal = await this.dealRepository.findDealById(dealId);

    if (!deal) {
      throw new NotFoundError(`Deal with id ${dealId} not found`);
    }

    const framework = await this.evaluationFrameworkRepository.findActiveByTaxonomy(
      deal.sectorId,
      deal.dealTypeId,
      deal.industryId
    );

    if (!framework) {
      throw new NotFoundError(
        'No active evaluation framework is configured for this deal.',
      );
    }

    const frameworkWithDetails =
      await this.evaluationFrameworkRepository.getFrameworkById(
        framework.id,
      );

    if (!frameworkWithDetails) {
      throw new NotFoundError(
        `Evaluation framework with id ${framework.id} not found`,
      );
    }

    // const data = frameworkWithDetails.get({ plain: true }) as {
    //   id: number;
    //   frameworkName: string;
    //   description: string | null;
    //   categories?: {
    //     id: number;
    //     categoryName: string;
    //     displayOrder: number;
    //     weightage: number;
    //     parameters?: {
    //       id: number;
    //       parameterName: string;
    //       description: string | null;
    //       displayOrder: number;
    //       weightage: number;
    //     }[];
    //   }[];
    // };
    const data =
      frameworkWithDetails.get({ plain: true }) as unknown as RequiredParametersFramework;

    return {
      success: true,
      data: {
        dealId: deal.id,
        dealName: deal.dealName,
        frameworkId: data.id,
        frameworkName: data.frameworkName,
        description: data.description,
        categories: (data.categories ?? []).map((category) => ({
          categoryId: category.id,
          categoryName: category.categoryName,
          displayOrder: category.displayOrder,
          weightage: Number(category.weightage),
          parameters: (category.parameters ?? []).map((parameter) => ({
            parameterId: parameter.id,
            parameterName: parameter.parameterName,
            description: parameter.description,
            displayOrder: parameter.displayOrder,
            weightage: Number(parameter.weightage),
          })),
        })),
      },
    };
  }

  async getMaterials(
    byUser: IUserToken | undefined,
    dealId: number,
    query: Omit<DealMaterialsListParams, 'dealId' | 'fileTypes'> & {
      fileTypes?: string[];
    },
  ) {
    await this.authorize(Permission.view, byUser);

    const fileTypes = this.normalizeFileTypes(query.fileTypes);

    logger.info('Fetching deal materials', {
      dealId,
      ...query,
      fileTypes,
    });

    const deal = await this.dealRepository.findDealById(dealId);

    if (!deal) {
      throw new NotFoundError(`Deal with id ${dealId} not found`);
    }

    const [materials, meta] = await Promise.all([
      this.dealRepository.getMaterials(
        {
          dealId,
          ...query,
          fileTypes,
        },
      ),
      this.dealRepository.getMaterialsMeta(dealId),
    ]);

    const items = materials.rows.map((row) => {
      const data = row.get({ plain: true }) as unknown as DealMaterialRow;

      return {
        dealFileId: data.id,
        sourceFileId: data.sourceFileId,
        fileName: data.sourceFile?.fileName ?? null,
        fileType: data.sourceFile?.fileType
          ? data.sourceFile.fileType.toUpperCase()
          : null,
        fileSize: data.sourceFile ? Number(data.sourceFile.sizeBytes) : null,
        sourcePath: data.sourceFile?.sourcePath ?? null,
        storagePath: data.sourceFile?.storagePath ?? null,
        sourceFileVersion: data.sourceFileVersion,
        classificationId: data.classificationId,
        classificationName: data.classification?.name ?? null,
        lastUpdatedAt: data.updatedAt,
      };
    });

    return {
      success: true,
      data: {
        filters: {
          fileTypes: meta.fileTypes,
        },
        lastUpdatedAt: meta.lastUpdatedAt,
        items,
        pagination: {
          page: query.page,
          limit: query.limit,
          totalItems: materials.count,
          totalPages: Math.ceil(materials.count / query.limit),
        },
      },
    };
  }

  async getAuditLogs(
    byUser: IUserToken | undefined,
    dealId: number,
    query: DealAuditLogsQuery,
    body: DealAuditLogsBody = {},
  ) {
    await this.authorize(Permission.view, byUser);

    const params = {
      ...query,
      ...body,
    };

    logger.info('Fetching deal audit logs', {
      dealId,
      page: query.page,
      limit: query.limit,
      performedByIds: body.performedByIds,
      actions: body.actions,
      startDate: body.startDate,
      endDate: body.endDate,
    });

    const deal = await this.dealRepository.findDealById(dealId);

    if (!deal) {
      throw new NotFoundError(`Deal with id ${dealId} not found`);
    }

    const [logsResult, filterAgg] = await Promise.all([
      this.dealRepository.getAuditLogsByDealId(dealId, params),
      this.dealRepository.getAuditLogsFilterAggregation(
        dealId,
        body.startDate,
        body.endDate,
      ),
    ]);

    const plainRows = logsResult.rows.map((row) =>
      row.get({ plain: true }) as unknown as {
        id: number;
        dealId: number;
        entityType: string;
        entityId: number | null;
        action: string;
        performedBy: string;
        summary: string;
        details: Record<string, unknown> | null;
        createdAt: Date;
      },
    );

    return {
      success: true,
      data: {
        filters: {
          performedByIds: filterAgg.performedByIds,
          actions: filterAgg.actions,
        },

        items: plainRows.map((row) => ({
          id: row.id,
          dealId: row.dealId,
          entityType: row.entityType,
          entityId: row.entityId,
          action: row.action,
          performedById: row.performedBy,
          summary: sanitizeAuditSummary(row.summary),
          details: row.details,
          createdAt: row.createdAt,
        })),

        pagination: buildAuditLogsPagination(
          query.page,
          query.limit,
          logsResult.count,
        ),
      },
    };
  }

  async retryParameterEvaluation(
    byUser: IUserToken | undefined,
    dealId: number,
  ): Promise<{
    success: true;
    data: {
      dealId: number;
      aiJobId: number;
      retryOfJobId: number;
      jobStatus: string;
    };
  }> {
    await this.authorize(Permission.edit, byUser);

    const actor = byUser;

    if (!actor) {
      throw new NotFoundError('User information not found');
    }

    logger.info('Retrying parameter evaluation', {
      dealId,
      performedBy: actor.sub,
    });

    try {
      const result = await PostgresDb.sequelize.transaction(
        {
          isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
        },
        async (transaction) => {
          const deal = await this.dealRepository.findDealById(dealId);

          if (!deal) {
            throw new NotFoundError(`Deal with id ${dealId} not found`);
          }

          const failedJob =
            await this.dealRepository.findLatestAiJobByDealAndType(
              dealId,
              'PARAMETER_EVALUATION',
              transaction,
            );

          if (!failedJob || failedJob.status !== 'Failed') {
            throw new ConditionalBadRequest(
              'Parameter evaluation can only be retried when the latest job has Failed.',
            );
          }

          const framework =
            await this.dealRepository.findDealEvaluationFrameworkByDealId(
              dealId,
              transaction,
            );

          if (!framework) {
            throw new ConditionalBadRequest(
              'Deal evaluation framework was not found for this deal.',
            );
          }

          const frameworkId = Number(framework.id);

          await this.dealRepository.deactivateAiParameterResults(
            dealId,
            frameworkId,
            transaction,
          );

          const aiJob = await this.dealRepository.createAiProcessingJob(
            {
              dealId,
              frameworkId,
              jobType: 'PARAMETER_EVALUATION',
              reason: 'INITIAL_PROCESSING',
              requestedBy: actor.sub,
              retryOfJobId: failedJob.id,
            },
            transaction,
          );

          return {
            dealId,
            aiJobId: Number(aiJob.id),
            retryOfJobId: Number(failedJob.id),
            jobStatus: String(aiJob.status),
          };
        },
      );

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        throw new ConditionalBadRequest(
          'An active parameter evaluation job already exists for this deal.',
        );
      }

      throw error;
    }
  }

  async updateDealStage(
    byUser: IUserToken | undefined,
    dealId: number,
    stageId: number,
  ) {
    await this.authorize(Permission.edit, byUser);

    const actor = byUser;

    if (!actor) {
      throw new ConditionalBadRequest(
        'User information is required to update deal stage.',
      );
    }

    const result = await PostgresDb.sequelize.transaction(
      async (transaction) => {
        const deal = await this.dealRepository.findDealById(dealId);

        if (!deal) {
          throw new NotFoundError(`Deal with id ${dealId} not found`);
        }

        const stage =
          await this.dealRepository.findActiveDealStageById(stageId);

        if (!stage) {
          throw new NotFoundError(
            `Deal stage with id ${stageId} not found`,
          );
        }

        if (deal.stageId === stageId) {
          throw new ConditionalBadRequest(
            'Deal is already in the requested stage.',
          );
        }

        const previousStageId = deal.stageId;
        const stageChangedAt = new Date();

        await this.dealRepository.updateDealStage(
          dealId,
          stageId,
          actor.sub,
          stageChangedAt,
          transaction,
        );

        await this.dealRepository.createDealAuditLog(
          {
            dealId,
            entityType: 'DEAL',
            entityId: dealId,
            action: 'STAGE_CHANGED',
            performedBy: actor.sub,
            summary: 'Deal stage changed',
            details: {
              previousStageId,
              newStageId: stageId,
            },
          },
          transaction,
        );

        // const updatedDeal =
        //   await this.dealRepository.findDealById(dealId);
        const updatedDeal = await this.dealRepository.findDealById(
          dealId,
          transaction,
        );

        if (!updatedDeal) {
          throw new NotFoundError(
            `Deal with id ${dealId} not found`,
          );
        }

        return updatedDeal;
      },
    );

    // await RedisDb.del(`deal:${dealId}`);
    try {
      await RedisDb.del(`deal:${dealId}`);
    } catch (error) {
      logger.warn('Redis deal cache invalidation failed', {
        dealId,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return {
      success: true,
      data: result,
    };
  }
}