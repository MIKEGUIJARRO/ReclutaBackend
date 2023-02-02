import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { Company } from '../../../models/company';
export interface CompanyRepository
  extends SequelizeRead<Company>,
    SequelizeWrite<Company> {}
