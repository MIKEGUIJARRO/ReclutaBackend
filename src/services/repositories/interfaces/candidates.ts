import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { Candidate } from '../../../models/candidate';
export interface CandidatesRepository
  extends SequelizeRead<Candidate>,
    SequelizeWrite<Candidate> {}
