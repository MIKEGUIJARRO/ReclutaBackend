import { ModelStatic } from 'sequelize';
import { Position } from '../../../../models/position';
import { PositionsRepository } from '../../interfaces/positions';
import { BaseSequelizeRepository } from './base/base.repository';

export class PositionsSequelizeRepository
  extends BaseSequelizeRepository
  implements PositionsRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = Position;
    super(model);
    this.model = model;
  }
}
