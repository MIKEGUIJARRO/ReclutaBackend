import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';

export interface CandidatesRepository extends SequelizeRead, SequelizeWrite {}
