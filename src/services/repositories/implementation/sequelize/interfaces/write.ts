import { CreateOptions, DestroyOptions, UpdateOptions } from 'sequelize';

export interface SequelizeWrite {
  create(data: Object): Promise<Object>;
  update(data: Object, options: UpdateOptions): Promise<Object>;
  delete(options: DestroyOptions): Promise<void>;
}
