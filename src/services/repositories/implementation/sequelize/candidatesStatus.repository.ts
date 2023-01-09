import { ModelStatic } from 'sequelize';
import { CandidateStatus } from '../../../../models/candidateStatus';
import { CandidatesStatusRepository } from '../../interfaces/candidatesStatus';
import { BaseSequelizeRepository } from './base/base.repository';

export class CandidateStatusSequelizeRepository
  extends BaseSequelizeRepository
  implements CandidatesStatusRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = CandidateStatus;
    super(model);
    this.model = model;
  }
}
