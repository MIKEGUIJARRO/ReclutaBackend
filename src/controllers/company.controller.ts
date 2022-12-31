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
    const userId = req.user.id;
    const companyId = parseInt(req.params.companyId);
    const company = await this.companyService.findOne(companyId);
    res.status(200).json({
      success: true,
      data: company,
    });
  };

  public getCompanies = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user.id;
    const companyId = parseInt(req.params.companyId);
    const companies = await this.companyService.findAll();
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
    const userId = req.user.id;
    const companyId = req.params.companyId;
    const updatedCompany = await this.companyService.update(body, {
      where: {
        id: companyId,
        partnerId: userId,
      },
    });
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
    const userId = req.user.id;
    const deletedCompany = await this.companyService.delete({
      where: { id: companyId, partnerId: userId },
    });
    res.status(200).json({
      success: true,
      data: {},
    });
  };
}
