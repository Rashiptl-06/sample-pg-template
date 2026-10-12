import { NextFunction, Request, Response } from 'express';

import { EvaluationCommentService } from '../services/EvaluationCommentService';

import {
  DealParameterCommentsParams,
  DealParameterCommentParams,
  UpsertEvaluationCommentBody,
} from '../interfaces/requests/IEvaluationComment';

export class EvaluationCommentController {
  private readonly evaluationCommentService: EvaluationCommentService;

  constructor(evaluationCommentService: EvaluationCommentService) {
    this.evaluationCommentService = evaluationCommentService;
  }

  list = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const params =
        res.locals.validatedParams as DealParameterCommentsParams;

      const comments =
        await this.evaluationCommentService.listComments(
          params,
          req.user,
        );

      res.status(200).json({
        success: true,
        data: comments,
      });
    } catch (error) {
      next(error);
    }
  };

  upsert = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const params =
        res.locals.validatedParams as DealParameterCommentsParams;

      const body =
        res.locals.validatedBody as UpsertEvaluationCommentBody;

      const result =
        await this.evaluationCommentService.upsertComment(
          params,
          body,
          req.user,
        );

      res.status(result.statusCode).json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const params =
        res.locals.validatedParams as DealParameterCommentParams;

      const result =
        await this.evaluationCommentService.deleteComment(
          params,
          req.user,
        );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  };
}