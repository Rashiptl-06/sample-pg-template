import { AppError } from './AppError';

export class UnauthorizedError extends AppError {
  constructor(description = 'you are not authorized to access this resource') {
    super('unauthorized', description, 401);
  }
}
