import { Request, Response, NextFunction } from 'express';
import Validator, { ValidationSchema } from 'fastest-validator';

import { ValidationError } from '../../exceptions';

const validator = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    required: 'The param {field} is required.',
  },
});

export const paramsValidationHandler = (schema: ValidationSchema) => {
  const validatorInstance = validator.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const params = { ...req.params };

    const isValidationPassed = validatorInstance(params);

    if (typeof isValidationPassed === 'boolean') {
      res.locals.validatedParams = params;
      return next();
    }

    next(new ValidationError(isValidationPassed));
  };
};