// Import all interfaces
import { SequelizeRead } from '../interfaces/read';
import { SequelizeWrite } from '../interfaces/write';

import {
  ModelStatic,
  UpdateOptions,
  FindOptions,
  CountOptions,
  DestroyOptions,
} from 'sequelize';
import { ErrorResponse } from '../../../../../common/errors/errorResponse';

// that class only can be extended
export abstract class BaseSequelizeRepository
  implements SequelizeRead, SequelizeWrite
{
  model: ModelStatic<any>;
  constructor(model: ModelStatic<any>) {
    this.model = model;
  }

  async findAll(options: FindOptions): Promise<Object[]> {
    const allInstances = await this.model.findAll(options);
    return allInstances;
  }

  async findOne(options: FindOptions): Promise<Object> {
    const instance = await this.model.findOne(options);
    return instance;
  }

  async count(options: CountOptions<any>): Promise<Number> {
    const count = await this.model.count(options);
    return count;
  }

  async update(data: Object, options: UpdateOptions): Promise<Object> {
    const updatedInstance = await this.model.update(
      { ...data },
      { ...options, returning: true }
    );
    if (updatedInstance[0] === 0) {
      throw new ErrorResponse('Invalid request.', 400);
    }

    return updatedInstance[1];
  }

  async delete(options: DestroyOptions): Promise<void> {
    const deletedInstance = await this.model.destroy(options);

    if (!deletedInstance) {
      throw new ErrorResponse('Record not found', 400);
    }
  }
  async create(data: Object): Promise<Object> {
    const instance = await this.model.create({ ...data });
    return instance;
  }
}
