import { Router, RequestHandler } from 'express';
import { DealController } from '../controllers/DealController';
import { DealService } from '../services/DealService';
import { createDealBody } from '../validation/deal';
import { validationHandler } from '../utils/middlewares/validationHandler';
import { listDealsQuery } from "../validation/deal";
import { 
  dealIdParam, 
  dealMaterialsListQuery, 
  dealMaterialsBody, 
  dealAuditLogsBody, 
  dealAuditLogsQuery,
  retryAiJobBody,
  updateDealStageBody,
} from '../validation/deal';
import { querystringValidationHandler } from '../utils/middlewares/querystringValidationHandler';
import { EvaluationCommentController } from '../controllers/EvaluationCommentController';
import { EvaluationCommentService } from '../services/EvaluationCommentService';

import {
  dealParameterCommentsParams,
  dealParameterCommentIdParams,
  upsertCommentBody,
} from '../validation/evaluationComment';

import { paramsValidationHandler } from '../utils/middlewares/paramsValidationHandler';

const router = Router();

const dealController = new DealController(new DealService());

const evaluationCommentController =
  new EvaluationCommentController(
    new EvaluationCommentService(),
  );

router.get(
  '/',
  querystringValidationHandler(listDealsQuery) as RequestHandler,
  dealController.getAll as unknown as RequestHandler
);

router.get(
  '/:dealId',
  paramsValidationHandler(dealIdParam) as RequestHandler,
  dealController.getById as unknown as RequestHandler,
);

router.post(
  '/',
  validationHandler(createDealBody),
  dealController.create as unknown as RequestHandler,
);

router.patch(
  '/:dealId/stage',
  paramsValidationHandler(dealIdParam) as RequestHandler,
  validationHandler(updateDealStageBody),
  dealController.updateStage as unknown as RequestHandler,
);

router.post(
  '/:dealId/materials',
  paramsValidationHandler(dealIdParam) as RequestHandler,
  querystringValidationHandler(dealMaterialsListQuery) as RequestHandler,
  validationHandler(dealMaterialsBody) as RequestHandler,
  dealController.getMaterials as unknown as RequestHandler,
);

router.post(
  '/:dealId/audit-logs',
  paramsValidationHandler(dealIdParam),
  querystringValidationHandler(dealAuditLogsQuery),
  validationHandler(dealAuditLogsBody),
  dealController.getAuditLogs,
);

router.post(
  '/:dealId/ai-jobs/retry',
  paramsValidationHandler(dealIdParam) as RequestHandler,
  validationHandler(retryAiJobBody) as RequestHandler,
  dealController.retryAiJob as unknown as RequestHandler,
);

router.get(
  '/:dealId/required-parameters',
  paramsValidationHandler(dealIdParam),
  dealController.getRequiredParameters,
);

router.get(
  '/:dealId/required-parameters/:parameterId/comments',
  paramsValidationHandler(
    dealParameterCommentsParams,
  ) as RequestHandler,
  evaluationCommentController.list as unknown as RequestHandler,
);

router.put(
  '/:dealId/required-parameters/:parameterId/comments',
  paramsValidationHandler(
    dealParameterCommentsParams,
  ) as RequestHandler,
  validationHandler(upsertCommentBody),
  evaluationCommentController.upsert as unknown as RequestHandler,
);

router.delete(
  '/:dealId/required-parameters/:parameterId/comments/:commentId',
  paramsValidationHandler(
    dealParameterCommentIdParams,
  ) as RequestHandler,
  evaluationCommentController.delete as unknown as RequestHandler,
);

export default router;