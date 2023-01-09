import { Response } from 'express';
import { ErrorResponse } from '../common/errors/errorResponse';
import { CandidateStatusService } from '../services/candidatesStatus.service';
import { CandidateStatusSequelizeRepository } from '../services/repositories/implementation/sequelize/candidatesStatus.repository';
import { RequestAuth } from './interfaces/AuthRequest';

export class CandidatesStatusController {
  private readonly candidateStatusService: CandidateStatusService;
  constructor() {
    const candidateStatusSequelizeRepository =
      new CandidateStatusSequelizeRepository();
    this.candidateStatusService = new CandidateStatusService(
      candidateStatusSequelizeRepository
    );
  }

  public getCandidateStatus = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.user.company.id);
    const candidateStatusId = parseInt(req.params.candidateStatusId);

    const candidateStatus = await this.candidateStatusService.findOne(
      candidateStatusId,
      companyId
    );
    res.status(200).json({
      success: true,
      data: candidateStatus,
    });
  };

  public getCandidatesStatus = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    if (!req.query.positionId) {
      throw new ErrorResponse('Missing query param positionId.', 400);
    }

    const companyId = parseInt(req.user.company.id);
    const positionId = parseInt(String(req.query.positionId));

    const candidatesStatus = await this.candidateStatusService.findAll(
      companyId,
      positionId
    );
    res.status(200).json({
      success: true,
      data: candidatesStatus,
    });
  };

  public postCandidateStatus = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const body = req.body;

    const newCandidateStatus = await this.candidateStatusService.create({
      ...body,
    });
    res.status(200).json({
      success: true,
      data: newCandidateStatus,
    });
  };

  public putCandidateStatus = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const body = req.body;
    const candidateStatusId = parseInt(req.params.candidateStatusId);
    const positionId = parseInt(String(req.query.positionId));
    const candidateId = parseInt(String(req.query.candidateId));

    const updatedCandidateStatus = await this.candidateStatusService.update(
      body,
      candidateStatusId,
      candidateId,
      positionId
    );
    res.status(200).json({
      success: true,
      data: updatedCandidateStatus,
    });
  };

  public deleteCandidateStatus = async (
    req: RequestAuth,
    res: Response
  ): Promise<void> => {
    const candidateStatusId = parseInt(req.params.candidateStatusId);
    const positionId = parseInt(String(req.query.positionId));
    const candidateId = parseInt(String(req.query.candidateId));

    const deletedCandidateStatus = await this.candidateStatusService.delete(
      candidateStatusId,
      candidateId,
      positionId
    );
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
