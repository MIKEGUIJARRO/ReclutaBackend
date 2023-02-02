import { DestroyOptions, UpdateOptions } from 'sequelize';

export interface SequelizeWrite<T> {
  create(data: Object): Promise<T>;
  update(data: Object, options: UpdateOptions): Promise<T[]>;
  delete(options: DestroyOptions): Promise<void>;
}
