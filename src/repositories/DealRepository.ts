import Deal from '../models/Deal';
import DealFile from '../models/DealFile';
import SourceDealFile from '../models/SourceDealFile';
import FileClassification from '../models/FileClassification';
import { Op, Order, WhereOptions, col, fn, Transaction, where as sequelizeWhere } from 'sequelize';
import { ICreateDealRequest } from '../interfaces/requests/ICreateDealRequest';
import { IListDealsParams } from '../interfaces/requests/IListDealsParams';
import { DealMaterialsListParams } from '../interfaces/entities/IDealMaterial';
import DealAuditLog from '../models/DealAuditLog';
import {
  ListDealAuditLogsParams,
  ListDealAuditLogsFilterAggregation,
} from '../interfaces/requests/IDealMaterialsRequest';
import {
  buildDealAuditLogsWhere,
  buildAuditLogsCreatedAtWhere,
} from '../utils/dealAuditLogQuery';
import AiProcessingJob from '../models/AiProcessingJob';
import AiDealParameterResult from '../models/AiDealParameterResult';
import EvaluationFramework from '../models/EvaluationFramework';
import { CreateAiProcessingJobData } from '../interfaces/entities/IDeal';
import DealStage from '../models/DealStage';

const listDealsSortColumnMap: Record<string, unknown[]> = {
  dealName: ['deal_name'],
  createdAt: ['created_at'],
  updatedAt: ['updated_at'],
};

const dealMaterialsSortColumnMap: Record<string, unknown[]> = {
  dealFileId: ['id'],
  fileName: [{ model: SourceDealFile, as: 'sourceFile' }, 'file_name'],
  fileType: [{ model: SourceDealFile, as: 'sourceFile' }, 'file_type'],
  fileSize: [{ model: SourceDealFile, as: 'sourceFile' }, 'size_bytes'],
  classificationName: [
    { model: FileClassification, as: 'classification' },
    'name',
  ],
  updatedAt: ['updated_at'],
};

export default class DealRepository {
  // async getDeals() {
  //   return Deal.findAll();
  // }
  // async getDeals(
  //   params: IListDealsParams
  // ) {
  //   const { page, limit } = params;

  //   const { rows, count } = await Deal.findAndCountAll({
  //     limit: Number(limit),
  //     offset: (Number(page) - 1) * Number(limit),
  //   });

  //   return { rows, count };
  // }
  async getDeals(params: IListDealsParams) {
    const {
      search,
      sectorIds,
      geographyIds,
      industryIds,
      dealTypeIds,
      stageIds,
      page,
      limit,
      sortBy,
      sortOrder,
    } = params;

    // const where = search
    //   ? {
    //     dealName: {
    //       [Op.iLike]: `%${search}%`,
    //     },
    //   }
    //   : {};
    const where: WhereOptions = {};

    if (search) {
      where.dealName = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (sectorIds && sectorIds.length > 0) {
      where.sectorId = {
        [Op.in]: sectorIds,
      };
    }

    if (geographyIds && geographyIds.length > 0) {
      where.geographyId = {
        [Op.in]: geographyIds,
      };
    }

    if (industryIds && industryIds.length > 0) {
      where.industryId = {
        [Op.in]: industryIds,
      };
    }

    if (dealTypeIds && dealTypeIds.length > 0) {
      where.dealTypeId = {
        [Op.in]: dealTypeIds,
      };
    }

    if (stageIds && stageIds.length > 0) {
      where.stageId = {
        [Op.in]: stageIds,
      };
    }

    const sortColumns =
      listDealsSortColumnMap[sortBy] ?? listDealsSortColumnMap.updatedAt;

    const order = [
      [...sortColumns, (sortOrder ?? 'desc').toUpperCase()],
    ] as unknown as Order;

    const { rows, count } = await Deal.findAndCountAll({
      where,
      order,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });

    return { rows, count };
  }

  async createDeal(data: ICreateDealRequest) {
    return Deal.create(data);
  }

  async findDealById(dealId: number, transaction?: Transaction) {
    return Deal.findByPk(dealId, {
      attributes: [
        'id',
        'sourceDealId',
        'repositoryId',
        'dealName',
        'sectorId',
        'geographyId',
        'sponsorId',
        'dealTypeId',
        'industryId',
        'stageId',
        'status',
        'ndaConfirmed',
        'aiOutputConfirmedBy',
        'aiOutputConfirmedAt',
        'stageChangedBy',
        'stageChangedAt',
        'completedAt',
        'createdBy',
        'createdAt',
        'updatedAt',
      ],
       transaction,
    });
  }

  async findActiveDealStageById(stageId: number) {
    return DealStage.findOne({
      where: {
        id: stageId,
        active: true,
      },
    });
  }

  async updateDealStage(
    dealId: number,
    stageId: number,
    stageChangedBy: string,
    stageChangedAt: Date,
    transaction: Transaction,
  ) {
    return Deal.update(
      {
        stageId,
        stageChangedBy,
        stageChangedAt,
      },
      {
        where: {
          id: dealId,
        },
        returning: true,
        transaction,
      },
    );
  }

  async createDealAuditLog(
    data: {
      dealId: number;
      entityType: string;
      entityId: number | null;
      action: string;
      performedBy: string;
      summary: string;
      details: Record<string, unknown> | null;
    },
    transaction: Transaction,
  ) {
    return DealAuditLog.create(data, { transaction });
  }

  async getMaterials(params: DealMaterialsListParams) {
    const {
      dealId,
      search,
      classificationId,
      fileTypes,
      page,
      limit,
      sortBy,
      sortOrder,
    } = params;

    const conditions: WhereOptions[] = [{ dealId }];

    if (classificationId !== undefined) {
      conditions.push({ classificationId });
    }

    if (search) {
      conditions.push({
        '$sourceFile.file_name$': {
          [Op.iLike]: `%${search}%`,
        },
      });
    }

    if (fileTypes && fileTypes.length > 0) {
      conditions.push(
        sequelizeWhere(
          fn('LOWER', col('sourceFile.file_type')),
          {
            [Op.in]: fileTypes,
          },
        ) as unknown as WhereOptions,
      );
    }

    const sortColumns =
      dealMaterialsSortColumnMap[sortBy] ??
      dealMaterialsSortColumnMap.updatedAt;

    const order = [
      [...sortColumns, (sortOrder ?? 'desc').toUpperCase()],
    ] as unknown as Order;

    const { rows, count } = await DealFile.findAndCountAll({
      where: {
        [Op.and]: conditions,
      },
      include: [
        {
          model: SourceDealFile,
          as: 'sourceFile',
          required: true,
        },
        {
          model: FileClassification,
          as: 'classification',
          required: false,
        },
      ],
      order,
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      subQuery: false,
      distinct: true,
    });

    return { rows, count };
  }

  async getMaterialsMeta(dealId: number) {
    const [fileTypeRows, lastUpdatedAt] = await Promise.all([
      DealFile.findAll({
        where: { dealId },
        include: [
          {
            model: SourceDealFile,
            as: 'sourceFile',
            attributes: [],
          },
        ],
        attributes: [
          [
            fn(
              'DISTINCT',
              fn('UPPER', col('sourceFile.file_type')),
            ),
            'fileType',
          ],
        ],
        order: [[col('fileType'), 'ASC']],
        raw: true,
      }) as unknown as Promise<{ fileType: string }[]>,

      DealFile.max('updatedAt', {
        where: { dealId },
      }),
    ]);

    return {
      fileTypes: fileTypeRows.map((row) => row.fileType),
      lastUpdatedAt: lastUpdatedAt ?? null,
    };
  }

  async getAuditLogsByDealId(
    dealId: number,
    params: ListDealAuditLogsParams,
  ) {
    const { page, limit } = params;

    return DealAuditLog.findAndCountAll({
      where: buildDealAuditLogsWhere(dealId, params),

      order: [
        ['createdAt', 'DESC'],
        ['id', 'DESC'],
      ],

      limit,
      offset: (page - 1) * limit,
    });
  }

  async getAuditLogsFilterAggregation(
    dealId: number,
    startDate?: string,
    endDate?: string,
  ): Promise<ListDealAuditLogsFilterAggregation> {
    const where = {
      dealId,
      ...buildAuditLogsCreatedAtWhere(startDate, endDate),
    };

    const [performedByRows, actionRows] = await Promise.all([
      DealAuditLog.findAll({
        attributes: [
          [fn('DISTINCT', col('performed_by')), 'performedBy'],
        ],
        where,
        order: [[col('performed_by'), 'ASC']],
        raw: true,
      }) as unknown as Promise<{ performedBy: string }[]>,

      DealAuditLog.findAll({
        attributes: [
          [fn('DISTINCT', col('action')), 'action'],
        ],
        where,
        order: [[col('action'), 'ASC']],
        raw: true,
      }) as unknown as Promise<{ action: string }[]>,
    ]);

    return {
      performedByIds: performedByRows
        .map((row) => row.performedBy)
        .filter(Boolean),

      actions: actionRows
        .map((row) => row.action)
        .filter(Boolean),
    };
  }

  async findLatestAiJobByDealAndType(
    dealId: number,
    jobType: string,
    transaction?: Transaction,
  ) {
    return AiProcessingJob.findOne({
      where: {
        dealId,
        jobType,
        active: true,
      },
      order: [['id', 'DESC']],
      transaction,
    });
  }

  async findDealEvaluationFrameworkByDealId(
    dealId: number,
    transaction?: Transaction,
  ) {
    const deal = await Deal.findByPk(dealId, {
      attributes: [
        'id',
        'sectorId',
        'dealTypeId',
        'industryId',
      ],
      transaction,
    });

    if (!deal) {
      return null;
    }

    return EvaluationFramework.findOne({
      where: {
        sectorId: deal.sectorId,
        dealTypeId: deal.dealTypeId,
        industryId: deal.industryId,
      },
      attributes: ['id'],
      transaction,
    });
  }

  async deactivateAiParameterResults(
    dealId: number,
    frameworkId: number,
    transaction?: Transaction,
  ): Promise<number> {
    const [affectedCount] = await AiDealParameterResult.update(
      {
        active: false,
      },
      {
        where: {
          dealId,
          frameworkId,
          active: true,
        },
        transaction,
      },
    );

    return affectedCount;
  }

  async createAiProcessingJob(
    data: CreateAiProcessingJobData,
    transaction?: Transaction,
  ) {
    return AiProcessingJob.create(data, {
      transaction,
    });
  }
}