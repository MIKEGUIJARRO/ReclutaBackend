import { CountOptions, FindOptions } from 'sequelize';

export interface SequelizeRead {
  findAll(options: FindOptions): Promise<Object[]>;
  findOne(options: FindOptions): Promise<Object>;
  count(options: CountOptions): Promise<Number>;
}
