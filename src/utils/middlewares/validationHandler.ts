// import { Request, Response, NextFunction } from 'express';
// import Validator, { ValidationSchema } from 'fastest-validator';
// import { ValidationError } from '../../exceptions/ValidationError';

// export const validationHandler =
//   (schema: ValidationSchema) => (req: Request, res: Response, next: NextFunction) => {
//     const validator = new Validator({ useNewCustomCheckerFunction: true });
//     const validatorInstance = validator.compile(schema);
//     const isValidationPassed = validatorInstance(
//       Object.keys(req.body as Record<string, unknown>).length > 0 ? req.body : req.query,
//     );
//     if (typeof isValidationPassed === 'boolean') {
//       return next();
//     } else {
//       next(new ValidationError(isValidationPassed));
//     }
//   };
import { Request, Response, NextFunction } from 'express';
import Validator, { ValidationSchema } from 'fastest-validator';

import { ValidationError } from '../../exceptions/ValidationError';

export const validationHandler =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator({
      useNewCustomCheckerFunction: true,
    });

    const validatorInstance = validator.compile(schema);

    const body = req.body as Record<string, unknown>;

    const isValidationPassed = validatorInstance(body);

    if (typeof isValidationPassed === 'boolean') {
      res.locals.validatedBody = body;
      return next();
    }

    next(new ValidationError(isValidationPassed));
  };