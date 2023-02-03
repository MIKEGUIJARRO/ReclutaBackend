import {
  DestroyOptions,
  FindOptions,
  Includeable,
  UpdateOptions,
} from 'sequelize';
import { CandidateStatus } from '../models/candidateStatus';
import { CandidateAttributes } from '../models/candidate';
import { CandidatesRepository } from './repositories/interfaces/candidates';

export class CandidatesService {
  constructor(private readonly candidatesRepository: CandidatesRepository) {}

  public async findOne(
    id: number,
    companyId: number
  ): Promise<CandidateAttributes | null> {
    const options: FindOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const candidate = await this.candidatesRepository.findOne(options);
    return candidate?.dataValues;
  }

  public async findAll(
    companyId: number,
    positionId?: number
  ): Promise<CandidateAttributes[]> {
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

    const candidates = await this.candidatesRepository.findAll(options);
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

  public async create(data: CandidateAttributes): Promise<CandidateAttributes> {
    const newCandidate = await this.candidatesRepository.create(data);
    return newCandidate;
  }

  public async update(
    data: Object,
    id: number,
    companyId: number
  ): Promise<CandidateAttributes[]> {
    const options: UpdateOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const updatedCandidate = await this.candidatesRepository.update(
      data,
      options
    );
    return updatedCandidate;
  }

  public async delete(id: number, companyId: number): Promise<void> {
    const options: DestroyOptions = {
      where: { id: id, companyId: companyId },
    };
    const deletedCandidate = await this.candidatesRepository.delete(options);
    return deletedCandidate;
  }
}
