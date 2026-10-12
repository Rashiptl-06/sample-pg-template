import { IUserToken } from '../../interfaces/IUserToken';

export {};

declare global {
  namespace Express {
    export interface Request {
      id: string;
      user?: IUserToken;
    }
  }
}
