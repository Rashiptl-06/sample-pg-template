// import { strict as assert } from 'node:assert';
// import { describe, it } from 'mocha';
// import { TestingService } from '../../src/services/TestingService';
// import { ForbiddenError } from '../../src/exceptions/ForbiddenError';

// describe('TestingService', () => {
//   describe('getAll', () => {
//     it('should reject the request when no user token is provided', async () => {
//       const service = new TestingService();

//       await assert.rejects(
//         service.getAll(),
//         ForbiddenError
//       );
//     });
//   });
// });


import { strict as assert } from 'node:assert';
import { describe, it } from 'mocha';
import { BaseService } from '../../src/services/BaseService';
import { ForbiddenError } from '../../src/exceptions/ForbiddenError';
import { Permission } from '../../src/interfaces/Permission';

describe('BaseService', () => {
  it('should throw ForbiddenError when no user token is provided', () => {
    const service = new BaseService();

    assert.throws(
      () => service['authorize'](Permission.view, undefined),
      ForbiddenError,
    );
  });
});
