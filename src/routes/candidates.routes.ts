import { Request, Response, Router } from 'express';
import { BaseRoutes } from '../common/routes/base.routes';
import { CandidatesController } from '../controllers/candidate.controller';
import { partnerAuthCheck } from '../middlewares/auth';
import { asyncHandler } from '../util/asyncHandler';

export class CandidatesRoutes implements BaseRoutes<CandidatesController> {
  readonly name: string = 'candidates';
  readonly controller: CandidatesController = new CandidatesController();
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router
      .route('/')
      .get(partnerAuthCheck, asyncHandler(this.controller.getCandidates))
      .post(partnerAuthCheck, asyncHandler(this.controller.postCandidate));
    this.router
      .route('/:candidateId')
      .get(partnerAuthCheck, asyncHandler(this.controller.getCandidate))
      .put(partnerAuthCheck, asyncHandler(this.controller.putCandidate))
      .delete(partnerAuthCheck, asyncHandler(this.controller.deleteCandidate));
  }
}
