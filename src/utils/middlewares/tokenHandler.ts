// import { Response, NextFunction } from 'express';
// import { decode } from 'jsonwebtoken';
// import { IUserToken } from '../../interfaces/IUserToken';
// import { Request } from '../../interfaces/Request';

// export const tokenHandler = (req: Request, res: Response, next: NextFunction) => {
//   let token = '';
//   try {
//     if (req.headers) token = req.headers.authorization ? req.headers.authorization.toString().split(' ')[1] : '';
//     if (!token || token === '') if (next) return next();
//     const decoded = decode(token) as IUserToken;
//     req.user = decoded;
//     return next();
//   } catch (e) {
//     return next();
//   }
// };

import { Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import { IUserToken } from '../../interfaces/IUserToken';
import { Role } from '../../interfaces/Role';
import { Request } from '../../interfaces/Request';

interface KeycloakToken extends IUserToken {
  realm_access?: {
    roles?: string[];
  };
}

export const tokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = '';

  try {
    if (req.headers) {
      token = req.headers.authorization
        ? req.headers.authorization.toString().split(' ')[1]
        : '';
    }

    if (!token) return next();

    const decoded = decode(token);

    if (!decoded || typeof decoded !== 'object') return next();

    const user = decoded as KeycloakToken;
    const roles = user.realm_access?.roles ?? [];

    if (roles.includes(Role.root)) {
      user.role = Role.root;
    } else if (roles.includes(Role.admin)) {
      user.role = Role.admin;
    } else {
      user.role = Role.user;
    }

    req.user = user;

    return next();
  } catch {
    return next();
  }
};