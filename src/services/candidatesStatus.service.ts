import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Candidate } from '../models/candidate';
import { CandidateStatusAttributes } from '../models/candidateStatus';
import { Position } from '../models/position';
import { CandidatesStatusRepository } from './repositories/interfaces/candidatesStatus';

export class CandidateStatusService {
  constructor(
    private readonly candidateStatusRepository: CandidatesStatusRepository
  ) {}

  public async findOne(id: number, companyId: number): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
      },
      include: [
        {
          model: Candidate,
          where: {
            companyId: companyId,
          },
        },
        {
          model: Position,
          where: {
            companyId: companyId,
          },
        },
      ],
    };
    const position = await this.candidateStatusRepository.findOne(options);
    return position;
  }

  public async findAll(
    companyId: number,
    positionId: number
  ): Promise<Object[]> {
    const options: FindOptions = {
      order: [['index', 'ASC']],
      include: [
        {
          model: Candidate,
          where: {
            companyId: companyId,
          },
        },
        {
          model: Position,
          where: {
            id: positionId,
          },
        },
      ],
    };
    const positions = await this.candidateStatusRepository.findAll(options);
    return positions;
  }

  public async create(data: Object): Promise<Object> {
    const newPosition = await this.candidateStatusRepository.create(data);
    return newPosition;
  }

  public async bulkCreate(data: CandidateStatusAttributes[]): Promise<Object> {
    const promises = data.map((candidateStatus) => {
      return this.candidateStatusRepository.create(candidateStatus);
    });

    const responses = await Promise.all(promises);
    return responses;
  }

  public async update(
    data: CandidateStatusAttributes,
    id: number,
    candidateId: number,
    positionId: number
  ): Promise<Object> {
    const options: UpdateOptions = {
      where: {
        id: id,
        candidateId: candidateId,
        positionId: positionId,
      },
      individualHooks: true,
    };
    const updatedPosition = await this.candidateStatusRepository.update(
      data,
      options
    );
    return updatedPosition;
  }

  public async delete(
    id: number,
    candidateId: number,
    positionId: number
  ): Promise<void> {
    const options: DestroyOptions = {
      where: {
        id: id,
        candidateId: candidateId,
        positionId: positionId,
      },
    };
    const deletedPosition = await this.candidateStatusRepository.delete(
      options
    );
    return deletedPosition;
  }
}
