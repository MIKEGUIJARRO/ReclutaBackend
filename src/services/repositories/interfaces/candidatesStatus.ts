import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { CandidateStatusAttributes } from '../../../models/candidateStatus';
export interface CandidatesStatusRepository
  extends SequelizeRead<CandidateStatusAttributes>,
    SequelizeWrite<CandidateStatusAttributes> {}
