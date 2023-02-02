import { CountOptions, FindOptions } from 'sequelize';

export interface SequelizeRead<T> {
  findAll(options: FindOptions): Promise<T[]>;
  findOne(options: FindOptions): Promise<T | null>;
  count(options: CountOptions): Promise<Number>;
}
