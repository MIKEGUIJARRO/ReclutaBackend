import { Response } from 'express';
import { PositionService } from '../services/positions.service';
import { PositionSequelizeRepository } from '../services/repositories/implementation/sequelize/position.repository';
import { RequestAuth } from './interfaces/AuthRequest';

export class PositionsController {
  private readonly positionService: PositionService;
  constructor() {
    const positionSequelizeRepository = new PositionSequelizeRepository();
    this.positionService = new PositionService(positionSequelizeRepository);
  }

  public getPosition = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const positionId = parseInt(req.params.positionId);
    const position = await this.positionService.findOne(positionId, companyId);
    res.status(200).json({
      success: true,
      data: position,
    });
  };

  public getPositions = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const positions = await this.positionService.findAll(companyId);
    res.status(200).json({
      success: true,
      data: positions,
    });
  };

  public postPosition = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const body = req.body;
    const companyId = parseInt(req.user.company.id);
    const newPosition = await this.positionService.create({
      ...body,
      companyId: companyId,
    });

    res.status(200).json({
      success: true,
      data: newPosition,
    });
  };

  public putPosition = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const body = req.body;
    const positionId = parseInt(req.params.positionId);
    const companyId = parseInt(req.user.company.id);
    const updatedPosition = await this.positionService.update(
      body,
      positionId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: updatedPosition,
    });
  };

  public deletePosition = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const positionId = parseInt(req.params.positionId);
    const companyId = parseInt(req.user.company.id);
    const deletedPosition = await this.positionService.delete(
      positionId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
