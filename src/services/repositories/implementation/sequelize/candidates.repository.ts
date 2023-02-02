import { ModelStatic } from 'sequelize';
import { Candidate } from '../../../../models/candidate';
import { CandidatesRepository } from '../../interfaces/candidates';
import { BaseSequelizeRepository } from './base/base.repository';

export class CandidatesSequelizeRepository
  extends BaseSequelizeRepository<Candidate>
  implements CandidatesRepository
{
  constructor() {
    super(Candidate);
  }
}
