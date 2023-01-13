import { ModelStatic } from 'sequelize';
import { Position } from '../../../../models/position';
import { KanbanPositionRepository } from '../../interfaces/kanbanPosition';
import { BaseSequelizeRepository } from './base/base.repository';

export class KanbanPositionSequelizeRepository
  extends BaseSequelizeRepository
  implements KanbanPositionRepository
{
  model: ModelStatic<any>;
  constructor() {
    const model = Position;
    super(model);
    this.model = model;
  }
}
