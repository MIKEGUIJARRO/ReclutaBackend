import { SequelizeRead } from '../implementation/sequelize/interfaces/read';
import { SequelizeWrite } from '../implementation/sequelize/interfaces/write';
import { PositionAttributes } from '../../../models/position';
export interface PositionsRepository
  extends SequelizeRead<PositionAttributes>,
    SequelizeWrite<PositionAttributes> {}
