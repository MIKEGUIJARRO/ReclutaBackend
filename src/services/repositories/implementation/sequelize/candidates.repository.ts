import { ModelStatic } from 'sequelize';
import { Candidate } from '../../../../models/candidate';
import { CandidateRepository } from '../../interfaces/candidate';
import { BaseSequelizeRepository } from './base/base.repository';

export class CandidateSequelizeRepository
  extends BaseSequelizeRepository
  implements CandidateRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = Candidate;
    super(model);
    this.model = model;
  }
}
