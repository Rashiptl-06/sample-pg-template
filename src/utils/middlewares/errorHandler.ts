import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../exceptions/AppError';
import loggerFactory from '../logging';

const logger = loggerFactory.getLogger('errorHandler');

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) return next();
  logger.error(err);
  if (err instanceof AppError) {
    const errorResponse = {
      ...err.getResponse(),
      stack: err.getResponse().stack,
      statusCode: err.getStatusCode(),
    };
    return res.status(err.getStatusCode()).json(errorResponse);
  } else {
    const errorResponse = {
      error: err.data || err.message || err || 'Something went Wrong!',
      type: err.type,
      statusCode: err.statusCode,
      validations: err.validations,
    };
    return res.status(400).json(errorResponse);
  }
};
