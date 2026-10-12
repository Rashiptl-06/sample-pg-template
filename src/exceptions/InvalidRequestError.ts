import { AppError } from './AppError';

export class InvalidRequestError extends AppError {
  constructor(description: string) {
    super('invalid_request', description, 400);
  }
}
