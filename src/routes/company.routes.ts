import { Router } from 'express';
import { BaseRoutes } from '../common/routes/base.routes';
import { CompanyController } from '../controllers/company.controller';
import { partnerAuthCheck } from '../middlewares/auth';
import { asyncHandler } from '../util/asyncHandler';

export class CompanyRoutes implements BaseRoutes<CompanyController> {
  readonly name: string = 'company';
  readonly controller: CompanyController = new CompanyController();
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router
      .route('/')
      .get(partnerAuthCheck, asyncHandler(this.controller.getCompanies))
      .post(partnerAuthCheck, asyncHandler(this.controller.postCompany));

    this.router
      .route('/:companyId')
      .get(partnerAuthCheck, asyncHandler(this.controller.getCompany))
      .put(partnerAuthCheck, asyncHandler(this.controller.putCompany))
      .delete(partnerAuthCheck, asyncHandler(this.controller.deleteCompany));
  }
}
