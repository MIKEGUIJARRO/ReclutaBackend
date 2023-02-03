import { Response } from 'express';
import { CandidatesService } from '../services/candidates.service';
import { CandidatesSequelizeRepository } from '../services/repositories/implementation/sequelize/candidates.repository';
import { RequestAuth } from './interfaces/AuthRequest';

export class CandidatesController {
  private readonly candidateService: CandidatesService;
  constructor() {
    const candidateSequelizeRepository = new CandidatesSequelizeRepository();
    this.candidateService = new CandidatesService(candidateSequelizeRepository);
  }

  public getCandidate = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const candidateId = parseInt(req.params.candidateId);
    const companyId = parseInt(req.user.company.id);
    const candidate = await this.candidateService.findOne(
      candidateId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: candidate,
    });
  };

  public getCandidates = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const positionIdNot = parseInt(req.query.positionIdNot as string);
    const candidates = await this.candidateService.findAll(
      companyId,
      positionIdNot
    );
    res.status(200).json({
      success: true,
      data: candidates,
    });
  };

  public postCandidate = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const newCandidate = await this.candidateService.create({
      ...req.body,
      companyId: companyId,
    });
    res.status(200).json({
      success: true,
      data: newCandidate,
    });
  };

  public putCandidate = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const body = req.body;
    const candidateId = parseInt(req.params.candidateId);
    const companyId = parseInt(req.user.company.id);

    const updatedCandidate = await this.candidateService.update(
      body,
      candidateId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: updatedCandidate,
    });
  };

  public deleteCandidate = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const candidateId = parseInt(req.params.candidateId);
    const companyId = parseInt(req.user.company.id);
    const deletedCandidate = await this.candidateService.delete(
      candidateId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
