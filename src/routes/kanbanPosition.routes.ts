import { Router } from 'express';
import { BaseRoutes } from '../common/routes/base.routes';
import { KanbanPositionController } from '../controllers/kanbanPosition.controller';
import { PositionsController } from '../controllers/positions.controller';
import { partnerAuthCheck } from '../middlewares/auth';
import { asyncHandler } from '../util/asyncHandler';

export class KanbanPositionRoutes
  implements BaseRoutes<KanbanPositionController>
{
  readonly name: string = 'kanban';
  readonly controller: KanbanPositionController =
    new KanbanPositionController();
  readonly router: Router = Router({ mergeParams: true });

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router
      .route('/')
      .get(partnerAuthCheck, asyncHandler(this.controller.getKanbanPosition));
  }
}
