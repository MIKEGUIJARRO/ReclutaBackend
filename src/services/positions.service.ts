import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { Candidate } from '../models/candidate';
import { CandidateStatus } from '../models/candidateStatus';
import { PositionsRepository } from './repositories/interfaces/positions';
import { PositionAttributes } from '../models/position';

export class PositionsService {
  constructor(private readonly positionRepository: PositionsRepository) {}

  public async findOne(
    id: number,
    companyId: number
  ): Promise<PositionAttributes | null> {
    const options: FindOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
      include: [
        {
          model: CandidateStatus,
          include: [
            {
              model: Candidate,
            },
          ],
        },
      ],
    };
    const position = await this.positionRepository.findOne(options);
    if (!position) {
      return null;
    }
    if (
      position.dataValues.CandidateStatuses &&
      position.dataValues.CandidateStatuses.length
    ) {
      position.dataValues.candidates =
        position.dataValues.CandidateStatuses.length;
    } else {
      position.dataValues.candidates = 0;
    }

    return position;
  }

  public async findAll(companyId: number): Promise<PositionAttributes[]> {
    const options: FindOptions = {
      where: {
        companyId: companyId,
      },
      include: [
        {
          model: CandidateStatus,
        },
      ],
    };
    const positions = await this.positionRepository.findAll(options);
    positions.forEach((position) => {
      if (
        position.dataValues.CandidateStatuses &&
        position.dataValues.CandidateStatuses.length
      ) {
        position.dataValues.candidates =
          position.dataValues.CandidateStatuses.length;
      } else {
        position.dataValues.candidates = 0;
      }
    });
    return positions;
  }

  public async create(data: PositionAttributes): Promise<PositionAttributes> {
    const newPosition = await this.positionRepository.create(data);
    return newPosition;
  }

  public async update(
    data: Object,
    id: number,
    companyId: number
  ): Promise<PositionAttributes[]> {
    const options: UpdateOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const updatedPosition = await this.positionRepository.update(data, options);
    return updatedPosition;
  }

  public async delete(id: number, companyId: number): Promise<void> {
    const options: DestroyOptions = {
      where: { id: id, companyId: companyId },
    };
    const deletedPosition = await this.positionRepository.delete(options);
    return deletedPosition;
  }
}
