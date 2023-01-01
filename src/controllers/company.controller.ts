import { Request, Response } from 'express';
import { CompanyService } from '../services/company.service';
import { CompanySequelizeRepository } from '../services/repositories/implementation/sequelize/company.repository';
import { AuthRequest } from './interfaces/AuthRequest';

export class CompanyController {
  private readonly companyService: CompanyService;
  constructor() {
    const companySequelizeRepository = new CompanySequelizeRepository();
    this.companyService = new CompanyService(companySequelizeRepository);
  }

  public getCompany = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const userId = parseInt(req.user.id);
    const companyId = parseInt(req.params.companyId);
    const company = await this.companyService.findOne(companyId, userId);
    res.status(200).json({
      success: true,
      data: company,
    });
  };

  public getCompanies = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const userId = parseInt(req.user.id);
    const companies = await this.companyService.findAll(userId);
    res.status(200).json({
      success: true,
      data: companies,
    });
  };

  public postCompany = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user.id;
    const body = req.body;
    const newCompany = await this.companyService.create({
      ...body,
      partnerId: userId,
    });
    if (req.session.passport) {
      req.session.passport.user.company = newCompany;
    }
    res.status(200).json({
      success: true,
      data: newCompany,
    });
  };

  public putCompany = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const body = req.body;
    const userId = parseInt(req.user.id);
    const companyId = parseInt(req.params.companyId);
    const updatedCompany = await this.companyService.update(
      body,
      companyId,
      userId
    );
    res.status(200).json({
      success: true,
      data: updatedCompany,
    });
  };

  public deleteCompany = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const companyId = parseInt(req.params.companyId);
    const userId = parseInt(req.user.id);
    const deletedCompany = await this.companyService.delete(companyId, userId);
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
