import { ForbiddenError } from '../exceptions/ForbiddenError';
import { UnauthorizedError } from '../exceptions/UnauthorizedError';
import { IUserToken } from '../interfaces/IUserToken';
import { Permission } from '../interfaces/Permission';
import { Role } from '../interfaces/Role';

export class BaseService {
  protected authorize(action: Permission, byUser?: IUserToken) {
    if (!byUser) throw new ForbiddenError('access token is required!');
    switch (action) {
      case Permission.view:
        return Promise.resolve();
      case Permission.create:
      case Permission.edit:
      case Permission.delete:
      case Permission.suspend:
      case Permission.enable:
        if ([Role.admin, Role.root].includes(byUser.role as Role)) return Promise.resolve();
        break;
    }
    throw new UnauthorizedError(`you are not allowed to '${action}'`);
  }
}
