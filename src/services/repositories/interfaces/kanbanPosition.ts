import { FindOptions } from 'sequelize';

export interface KanbanPositionRepository {
  findOne(options: FindOptions): Promise<any>;
}
