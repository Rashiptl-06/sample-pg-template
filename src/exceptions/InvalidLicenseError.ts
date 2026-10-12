import { AppError } from './AppError';

export class InvalidLicenseError extends AppError {
  constructor(description: string) {
    super('invalid_license', description, 400);
  }
}
