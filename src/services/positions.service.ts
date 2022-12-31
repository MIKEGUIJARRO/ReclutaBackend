import { FindOptions } from 'sequelize';
import { PositionRepository } from './repositories/interfaces/position';

export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  public async findOne(id: number, user: Object): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
      },
    };
    const position = await this.positionRepository.findOne(options);
    return position;
  }

  public async findAll(): Promise<Object[]> {
    const options: FindOptions = {};
    const positions = await this.positionRepository.findAll(options);
    return positions;
  }
}
