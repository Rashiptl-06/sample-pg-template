import { Request, Response, NextFunction } from 'express';
import Validator, { ValidationSchema } from 'fastest-validator';
import { ValidationError } from '../../exceptions/ValidationError';

const validator = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    required: 'The query param {field} is required.',
  },
});

export const querystringValidationHandler = (schema: ValidationSchema) => {
  const validatorInstance = validator.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const isValidationPassed = validatorInstance(query);

    if (typeof isValidationPassed === 'boolean') {
      res.locals.validatedQuery = query;
      return next();
    }

    next(new ValidationError(isValidationPassed));
  };
};