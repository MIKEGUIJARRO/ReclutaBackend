import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { Position } from '../../../models/position';
export interface PositionsRepository
  extends SequelizeRead<Position>,
    SequelizeWrite<Position> {}
