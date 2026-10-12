import { Response, NextFunction } from 'express';
import { DealService } from '../services/DealService';
import { Request } from '../interfaces/Request';
import { ICreateDealRequest } from '../interfaces/requests/ICreateDealRequest';
import { IListDealsParams } from '../interfaces/requests/IListDealsParams';
import { DealMaterialsParams, DealMaterialsQuery, DealMaterialsBody, DealAuditLogsBody, DealAuditLogsQuery } from '../interfaces/requests/IDealMaterialsRequest';
import { ConditionalBadRequest } from '../exceptions/ConditionalBadRequest';

type RetryAiJobBody = {
  jobType:
  | 'PARAMETER_EVALUATION'
  | 'DILIGENCE_REPORT_GENERATION'
  | 'VIRTUAL_IC_MEMBER_REPORT_GENERATION'
  | 'BALANCED_REPORT_GENERATION';
  versionId?: number;
};

export class DealController {
  constructor(protected dealService: DealService) { }

  // getAll = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const result = await this.dealService.getAll(req.user);

  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return next(error);
  //   }
  // };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const params: IListDealsParams = res.locals.validatedQuery;

      const result = await this.dealService.getAll(
        params,
        req.user,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { dealId } =
        res.locals.validatedParams as DealMaterialsParams;

      const result = await this.dealService.getDealById(
        req.user,
        dealId,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.dealService.create(
        req.body as ICreateDealRequest,
        req.user,
      );

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  updateStage = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { dealId } =
        res.locals.validatedParams as DealMaterialsParams;

      const { stageId } = req.body as {
        stageId: number;
      };

      const result = await this.dealService.updateDealStage(
        req.user,
        dealId,
        stageId,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  getMaterials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dealId } = res.locals.validatedParams as DealMaterialsParams;

      const {
        search,
        classificationId,
        page,
        limit,
        sortBy,
        sortOrder,
      } = res.locals.validatedQuery as DealMaterialsQuery;

      const { fileTypes } = (req.body ?? {}) as DealMaterialsBody;

      const result = await this.dealService.getMaterials(req.user, dealId, {
        search,
        classificationId,
        fileTypes,
        page,
        limit,
        sortBy,
        sortOrder,
      });

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  getRequiredParameters = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { dealId } =
        res.locals.validatedParams as { dealId: number };

      const result = await this.dealService.getRequiredParameters(
        dealId,
        req.user,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  getAuditLogs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { dealId } =
        res.locals.validatedParams as DealMaterialsParams;

      const query =
        res.locals.validatedQuery as DealAuditLogsQuery;

      const body = (req.body ?? {}) as DealAuditLogsBody;

      const result = await this.dealService.getAuditLogs(
        req.user,
        dealId,
        query,
        body,
      );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  retryAiJob = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { dealId } =
        res.locals.validatedParams as DealMaterialsParams;

      const { jobType, versionId } =
        (req.body ?? {}) as RetryAiJobBody;

      if (jobType !== 'PARAMETER_EVALUATION') {
        throw new ConditionalBadRequest(
          'Only PARAMETER_EVALUATION retry is currently implemented.',
        );
      }

      if (versionId !== undefined) {
        throw new ConditionalBadRequest(
          'versionId must not be provided when retrying PARAMETER_EVALUATION.',
        );
      }

      const result =
        await this.dealService.retryParameterEvaluation(
          req.user,
          dealId,
        );

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}