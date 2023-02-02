import { ModelStatic } from 'sequelize';
import { Company } from '../../../../models/company';
import { CompanyRepository } from '../../interfaces/company';
import { BaseSequelizeRepository } from './base/base.repository';

export class CompanySequelizeRepository
  extends BaseSequelizeRepository<Company>
  implements CompanyRepository
{
  constructor() {
    super(Company);
  }
}
