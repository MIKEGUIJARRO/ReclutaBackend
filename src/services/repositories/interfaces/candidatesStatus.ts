import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { CandidateStatus } from '../../../models/candidateStatus';
export interface CandidatesStatusRepository
  extends SequelizeRead<CandidateStatus>,
    SequelizeWrite<CandidateStatus> {}
