import { ModelStatic } from 'sequelize';
import { Company } from '../../../../models/company';
import { CompanyRepository } from '../../interfaces/company';
import { BaseSequelizeRepository } from './base/base.repository';

export class CompanySequelizeRepository
  extends BaseSequelizeRepository
  implements CompanyRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = Company;
    super(model);
    this.model = model;
  }
}
