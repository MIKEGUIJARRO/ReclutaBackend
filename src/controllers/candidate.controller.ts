import { NextFunction, Request, Response } from 'express';
import { CandidateService } from '../services/candidates.service';
import { CandidateSequelizeRepository } from '../services/repositories/implementation/sequelize/candidates.repository';

export class CandidatesController {
  private readonly candidateService: CandidateService;
  constructor() {
    const candidateSequelizeRepository = new CandidateSequelizeRepository();
    this.candidateService = new CandidateService(candidateSequelizeRepository);
  }

  public getCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const candidateId = parseInt(req.params.candidateId);
    const candidate = await this.candidateService.findOne(candidateId);
    res.status(200).json({
      success: true,
      data: candidate,
    });
  };

  public getCandidates = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const candidates = await this.candidateService.findAll();
    res.status(200).json({
      success: true,
      data: candidates,
    });
  };

  public postCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const body = req.body;
    console.log(body);
    const newCandidate = await this.candidateService.create(body);
    res.status(200).json({
      success: true,
      data: newCandidate,
    });
  };

  public putCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const body = req.body;
    const candidateId = req.params.candidateId;
    const updatedCandidate = await this.candidateService.update(body, {
      where: {
        id: candidateId,
      },
    });
    res.status(200).json({
      success: true,
      data: updatedCandidate,
    });
  };

  public deleteCandidate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const candidateId = parseInt(req.params.candidateId);
    const deletedCandidate = await this.candidateService.delete({
      where: { id: candidateId },
    });
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
