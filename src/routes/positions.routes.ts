import { Router } from 'express';
import { BaseRoutes } from '../common/routes/base.routes';
import { PositionsController } from '../controllers/positions.controller';
import { partnerAuthCheck } from '../middlewares/auth';
import { asyncHandler } from '../util/asyncHandler';
import { KanbanPositionRoutes } from './kanbanPosition.routes';

export class PositionsRoutes implements BaseRoutes<PositionsController> {
  readonly name: string = 'positions';
  readonly controller: PositionsController = new PositionsController();
  readonly router: Router = Router({ mergeParams: true });

  constructor() {
    this.initChildRoutes();
    this.initRoutes();
  }

  initRoutes(): void {
    this.router
      .route('/')
      .get(partnerAuthCheck, asyncHandler(this.controller.getPositions))
      .post(partnerAuthCheck, asyncHandler(this.controller.postPosition));

    this.router
      .route('/:positionId')
      .get(partnerAuthCheck, asyncHandler(this.controller.getPosition))
      .put(partnerAuthCheck, asyncHandler(this.controller.putPosition))
      .delete(partnerAuthCheck, asyncHandler(this.controller.deletePosition));
  }

  initChildRoutes(): void {
    const kanbanPositionRoutes = new KanbanPositionRoutes();
    this.router.use('/:positionId/kanban', kanbanPositionRoutes.router);
  }
}
