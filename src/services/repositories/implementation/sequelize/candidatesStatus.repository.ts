import { ModelStatic } from 'sequelize';
import { CandidateStatus } from '../../../../models/candidateStatus';
import { CandidatesStatusRepository } from '../../interfaces/candidatesStatus';
import { BaseSequelizeRepository } from './base/base.repository';

export class CandidateStatusSequelizeRepository
  extends BaseSequelizeRepository<CandidateStatus>
  implements CandidatesStatusRepository
{
  constructor() {
    super(CandidateStatus);
  }
}
