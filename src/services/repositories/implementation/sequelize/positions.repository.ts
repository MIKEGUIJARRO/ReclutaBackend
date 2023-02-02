import { ModelStatic } from 'sequelize';
import { Position } from '../../../../models/position';
import { PositionsRepository } from '../../interfaces/positions';
import { BaseSequelizeRepository } from './base/base.repository';

export class PositionsSequelizeRepository
  extends BaseSequelizeRepository<Position>
  implements PositionsRepository
{
  constructor() {
    super(Position);
  }
}
