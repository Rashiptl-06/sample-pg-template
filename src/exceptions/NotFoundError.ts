import { AppError } from './AppError';

export class NotFoundError extends AppError {
  constructor(description = 'Record Not Found!') {
    super('resource_not_found', description, 404);
  }
}
