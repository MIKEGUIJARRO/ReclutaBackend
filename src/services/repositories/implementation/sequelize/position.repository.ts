import { ModelStatic } from 'sequelize';
import { Position } from '../../../../models/position';
import { PositionRepository } from '../../interfaces/position';
import { BaseSequelizeRepository } from './base/base.repository';

export class PositionSequelizeRepository
  extends BaseSequelizeRepository
  implements PositionRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = Position;
    super(model);
    this.model = model;
  }
}
