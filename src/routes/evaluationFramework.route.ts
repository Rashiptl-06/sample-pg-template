import { Router, RequestHandler } from 'express';

import { EvaluationFrameworkController } from '../controllers/EvaluationFrameworkController';
import { EvaluationFrameworkService } from '../services/EvaluationFrameworkService';

import { querystringValidationHandler } from '../utils/middlewares/querystringValidationHandler';
import { paramsValidationHandler } from '../utils/middlewares/paramsValidationHandler';

import {
  frameworkIdParam,
  categoriesByTaxonomyQuery,
} from '../validation/evaluationFramework';

const router = Router();

const evaluationFrameworkController =
  new EvaluationFrameworkController(
    new EvaluationFrameworkService(),
  );

router.get(
  '/categories',
  querystringValidationHandler(
    categoriesByTaxonomyQuery,
  ) as RequestHandler,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  evaluationFrameworkController.getCategoriesByTaxonomy as unknown as RequestHandler,
);

router.get(
  '/:frameworkId',
  paramsValidationHandler(frameworkIdParam) as RequestHandler,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  evaluationFrameworkController.getById as unknown as RequestHandler,
);

export default router;