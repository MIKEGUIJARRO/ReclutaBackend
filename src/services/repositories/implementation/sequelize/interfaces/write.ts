import { CreateOptions, DestroyOptions, UpdateOptions } from 'sequelize';

export interface SequelizeWrite {
  create(data: Object): Promise<any>;
  update(data: Object, options: UpdateOptions): Promise<any>;
  delete(options: DestroyOptions): Promise<void>;
}
