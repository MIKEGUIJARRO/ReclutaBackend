import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { PositionRepository } from './repositories/interfaces/position';

export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  public async findOne(id: number, companyId: number): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const position = await this.positionRepository.findOne(options);
    return position;
  }

  public async findAll(companyId: number): Promise<Object[]> {
    const options: FindOptions = {
      where: {
        companyId: companyId,
      },
    };
    const positions = await this.positionRepository.findAll(options);
    return positions;
  }

  public async create(data: Object): Promise<Object> {
    const newPosition = await this.positionRepository.create(data);
    return newPosition;
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
