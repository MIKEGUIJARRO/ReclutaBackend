import { Response } from 'express';
import { KanbanPositionService } from '../services/kanbanPosition.service';
import { KanbanPositionSequelizeRepository } from '../services/repositories/implementation/sequelize/kanbanPosition.repository';
import { RequestAuth } from './interfaces/AuthRequest';

export class KanbanPositionController {
  private readonly kanbanPositionService: KanbanPositionService;
  constructor() {
    const kanbanPositionSequelizeRepository =
      new KanbanPositionSequelizeRepository();
    this.kanbanPositionService = new KanbanPositionService(
      kanbanPositionSequelizeRepository
    );
  }

  public getKanbanPosition = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const positionId = parseInt(req.params.positionId);
    const position = await this.kanbanPositionService.findOne(
      positionId,
      companyId
    );
    position;
    res.status(200).json({
      success: true,
      data: position,
    });
  };
}
