import { ValidationError } from '../exceptions/ValidationError';

export const validNumberCheck = (id: string, fieldName: string) => {
  const _id = Number(id);
  if (isNaN(_id)) {
    throw new ValidationError([
      {
        type: 'invalid_request',
        field: fieldName,
        message: `Invalid ${fieldName}: ${fieldName} must be a number.`,
        actual: id,
        expected: 'number',
      },
    ]);
  }
  return _id;
};
