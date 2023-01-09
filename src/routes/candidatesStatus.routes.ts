import { Router } from 'express';
import { BaseRoutes } from '../common/routes/base.routes';
import { CandidatesController } from '../controllers/candidate.controller';
import { CandidatesStatusController } from '../controllers/candidatesStatus.controller';
import { partnerAuthCheck } from '../middlewares/auth';
import { asyncHandler } from '../util/asyncHandler';

export class CandidatesStatusRoutes
  implements BaseRoutes<CandidatesStatusController>
{
  readonly name: string = 'candidates-status';
  readonly controller: CandidatesStatusController =
    new CandidatesStatusController();
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router
      .route('/')
      .get(partnerAuthCheck, asyncHandler(this.controller.getCandidatesStatus))
      .post(
        partnerAuthCheck,
        asyncHandler(this.controller.postCandidateStatus)
      );
    this.router
      .route('/:candidateStatusId')
      .get(partnerAuthCheck, asyncHandler(this.controller.getCandidateStatus))
      .put(partnerAuthCheck, asyncHandler(this.controller.putCandidateStatus))
      .delete(
        partnerAuthCheck,
        asyncHandler(this.controller.deleteCandidateStatus)
      );
  }
}
