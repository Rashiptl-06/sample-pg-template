export interface IUserToken {
  sub: string;
  role: string;
  email?: string;
  name?: string;
  iat?: number;
  exp?: number;
}
