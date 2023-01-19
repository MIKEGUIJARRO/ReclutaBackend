import {
  DestroyOptions,
  FindOptions,
  Includeable,
  Op,
  UpdateOptions,
} from 'sequelize';
import { CandidateStatus } from '../models/candidateStatus';
import { CandidatesRepository } from './repositories/interfaces/candidates';

export class CandidateService {
  constructor(private readonly candidateRepository: CandidatesRepository) {}

  public async findOne(id: number, companyId: number): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const candidate = await this.candidateRepository.findOne(options);
    return candidate;
  }

  public async findAll(companyId: number, positionId?: any): Promise<Object> {
    const includeOptions: Includeable = {
      model: CandidateStatus,
    };

    const options: FindOptions = {
      where: { companyId: companyId },
      include: [includeOptions],
      order: [['createdAt', 'DESC']],
    };

    if (positionId) {
      options.where = {
        '$CandidateStatuses.candidateId$': null,
        ...options.where,
      };

      includeOptions.subQuery = false;
    }

    const candidates = await this.candidateRepository.findAll(options);
    candidates.forEach((candidate) => {
      if (
        candidate.dataValues.CandidateStatuses &&
        candidate.dataValues.CandidateStatuses.length
      ) {
        candidate.dataValues.positions =
          candidate.dataValues.CandidateStatuses.length;
      } else {
        candidate.dataValues.positions = 0;
      }
    });

    return candidates;
  }

  public async create(data: Object): Promise<Object> {
    const newCandidate = await this.candidateRepository.create(data);
    return newCandidate;
  }

  public async update(
    data: Object,
    id: number,
    companyId: number
  ): Promise<Object> {
    const options: UpdateOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const updatedCandidate = await this.candidateRepository.update(
      data,
      options
    );
    return updatedCandidate;
  }

  public async delete(id: number, companyId: number): Promise<void> {
    const options: DestroyOptions = {
      where: { id: id, companyId: companyId },
    };
    const deletedCandidate = await this.candidateRepository.delete(options);
    return deletedCandidate;
  }
}
