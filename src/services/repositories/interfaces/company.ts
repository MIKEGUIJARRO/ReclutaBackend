import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { CompanyAttributes } from '../../../models/company';
export interface CompanyRepository
  extends SequelizeRead<CompanyAttributes>,
    SequelizeWrite<CompanyAttributes> {}
