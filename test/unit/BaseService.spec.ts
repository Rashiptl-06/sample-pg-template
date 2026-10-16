// import { strict as assert } from 'node:assert';
// import { describe, it } from 'mocha';
// import { BaseService } from '../../src/services/BaseService';
// import { ForbiddenError } from '../../src/exceptions/ForbiddenError';
// import { Permission } from '../../src/interfaces/Permission';

// describe('BaseService', () => {
//   it('should throw ForbiddenError when no user token is provided', () => {
//     const service = new BaseService();

//     assert.throws(
//       () => service['authorize'](Permission.view, undefined),
//       ForbiddenError,
//     );
//   });
// });
import { strict as assert } from 'node:assert';
import { describe, it } from 'mocha';
import { BaseService } from '../../src/services/BaseService';
import { ForbiddenError } from '../../src/exceptions/ForbiddenError';
import { UnauthorizedError } from '../../src/exceptions/UnauthorizedError';
import { Permission } from '../../src/interfaces/Permission';
import { Role } from '../../src/interfaces/Role';
import { IUserToken } from '../../src/interfaces/IUserToken';

describe('BaseService', () => {
  const service = new BaseService();

  const userToken: IUserToken = {
    sub: 'test-user-id',
    role: Role.user,
  };

  const adminToken: IUserToken = {
    sub: 'test-admin-id',
    role: Role.admin,
  };

  it('should throw ForbiddenError when no user token is provided', () => {
    assert.throws(
      () => service['authorize'](Permission.view, undefined),
      ForbiddenError,
    );
  });

  it('should throw UnauthorizedError when a regular user attempts a restricted operation', () => {
    assert.throws(
      () => service['authorize'](Permission.create, userToken),
      UnauthorizedError,
    );
  });

  it('should allow an admin to perform a restricted operation', () => {
    assert.doesNotThrow(() =>
      service['authorize'](Permission.create, adminToken),
    );
  });

  it('should allow a regular user to perform the view operation', () => {
    assert.doesNotThrow(() =>
      service['authorize'](Permission.view, userToken),
    );
  });
});
