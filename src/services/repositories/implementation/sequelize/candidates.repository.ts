import { ModelStatic } from 'sequelize';
import { Candidate } from '../../../../models/candidate';
import { CandidatesRepository } from '../../interfaces/candidates';
import { BaseSequelizeRepository } from './base/base.repository';

export class CandidateSequelizeRepository
  extends BaseSequelizeRepository
  implements CandidatesRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = Candidate;
    super(model);
    this.model = model;
  }
}
