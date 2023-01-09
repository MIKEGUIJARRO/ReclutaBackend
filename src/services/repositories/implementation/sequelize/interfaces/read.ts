import { CountOptions, FindOptions } from 'sequelize';

export interface SequelizeRead {
  findAll(options: FindOptions): Promise<any[]>;
  findOne(options: FindOptions): Promise<any>;
  count(options: CountOptions): Promise<Number>;
}
