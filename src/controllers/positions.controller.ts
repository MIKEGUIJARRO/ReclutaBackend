import { Response } from 'express';
import { PositionsService } from '../services/positions.service';
import { PositionsSequelizeRepository } from '../services/repositories/implementation/sequelize/positions.repository';
import { RequestAuth } from './interfaces/AuthRequest';

export class PositionsController {
  private readonly positionsService: PositionsService;
  constructor() {
    const positionsSequelizeRepository = new PositionsSequelizeRepository();
    this.positionsService = new PositionsService(positionsSequelizeRepository);
  }

  public getPosition = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const positionId = parseInt(req.params.positionId);
    const position = await this.positionsService.findOne(positionId, companyId);
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
    const positions = await this.positionsService.findAll(companyId);

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
    const newPosition = await this.positionsService.create({
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
    const updatedPosition = await this.positionsService.update(
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
    const deletedPosition = await this.positionsService.delete(
      positionId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
