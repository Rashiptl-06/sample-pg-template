import { NextFunction, Request, Response } from 'express';

import { EvaluationFrameworkService } from '../services/EvaluationFrameworkService';
import { GetCategoriesByTaxonomyQuery, GetEvaluationFrameworkParams } from '../interfaces/requests/IListEvaluationFrameworkRequest';

export class EvaluationFrameworkController {
  private readonly evaluationFrameworkService: EvaluationFrameworkService;

  constructor(evaluationFrameworkService: EvaluationFrameworkService) {
    this.evaluationFrameworkService = evaluationFrameworkService;
  }

  // async getById(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<void> {
  //   try {
  //     const { frameworkId } =
  //       res.locals.validatedParams as { frameworkId: number };

  //     const framework =
  //       await this.evaluationFrameworkService.getFrameworkById(
  //         frameworkId,
  //         req.user,
  //       );

  //     res.status(200).json({
  //       success: true,
  //       data: framework,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { frameworkId } =
        res.locals.validatedParams as GetEvaluationFrameworkParams;

      const framework =
        await this.evaluationFrameworkService.getFrameworkById(
          frameworkId,
          req.user,
        );

      res.status(200).json({
        success: true,
        data: framework,
      });
    } catch (error) {
      next(error);
    }
  };

  getCategoriesByTaxonomy = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const {
        sectorId,
        dealTypeId,
        industryId,
      } = res.locals.validatedQuery as GetCategoriesByTaxonomyQuery;

      const framework =
        await this.evaluationFrameworkService.getCategoriesByTaxonomy(
          sectorId,
          dealTypeId,
          industryId,
          req.user,
        );

      res.status(200).json({
        success: true,
        data: framework,
      });
    } catch (error) {
      next(error);
    }
  };
}