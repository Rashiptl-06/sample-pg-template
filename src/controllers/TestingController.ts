import { Response, NextFunction } from 'express';
import { TestingService } from '../services';
import { Request } from '../interfaces/Request';

export class TestingController {
  constructor(protected testingService: TestingService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.testingService.getAll(req.user);
      return res.status(200).json({ data });
    } catch (error) {
      return next(error);
    }
  };
}
