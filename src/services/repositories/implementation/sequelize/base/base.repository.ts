// Import all interfaces
import { SequelizeRead } from '../interfaces/read';
import { SequelizeWrite } from '../interfaces/write';

import {
  Model,
  ModelStatic,
  UpdateOptions,
  FindOptions,
  CountOptions,
  DestroyOptions,
} from 'sequelize';
import { ErrorResponse } from '../../../../../common/errors/errorResponse';
import { MakeNullishOptional } from 'sequelize/types/utils';

// that class only can be extended
export abstract class BaseSequelizeRepository<SpecificModel extends Model>
  implements SequelizeRead, SequelizeWrite
{
  constructor(public model: ModelStatic<SpecificModel>) {}

  async findAll(options: FindOptions): Promise<SpecificModel[]> {
    const allInstances = await this.model.findAll(options);
    return allInstances;
  }

  async findOne(options: FindOptions): Promise<SpecificModel | null> {
    const instance = await this.model.findOne(options);
    return instance;
  }

  async count(options: CountOptions<any>): Promise<Number> {
    const count = await this.model.count(options);
    return count;
  }

  async update(data: Object, options: UpdateOptions): Promise<SpecificModel[]> {
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
  async create(
    data: MakeNullishOptional<SpecificModel>
  ): Promise<SpecificModel> {
    const instance = await this.model.create(data);
    return instance;
  }
}
