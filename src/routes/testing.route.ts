import { Router, RequestHandler } from 'express';
import { TestingController } from '../controllers/TestingController';
import { TestingService } from '../services';

const router = Router();

const testingController = new TestingController(new TestingService());

router.get('/', testingController.getAll as unknown as RequestHandler);

export default router;
