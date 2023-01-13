import { DataTypes, Model, Op } from 'sequelize';
import { ErrorResponse } from '../common/errors/errorResponse';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
import {
  getIndexProperties,
  updateGlobalIndexes,
  validateDataValues,
} from '../helpers/models/candidateStatus';
import { Candidate } from './candidate';
import { Position } from './position';

const databaseSequelize = new DatabaseSequelize();

export interface CandidateStatusAttributes {
  id: number;
  comments: string;
  stage: string;
  index: number;
  createdAt?: Date;
  updatedAt?: Date;
  positionId: number;
  candidateId: number;
}

export class CandidateStatus extends Model {}

CandidateStatus.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: databaseSequelize.getDatabaseInstance(),
  }
);

// Associations

// Candidate - CandidateStatus
Candidate.hasMany(CandidateStatus, {
  foreignKey: {
    name: 'candidateId',
    allowNull: false,
  },
});

CandidateStatus.belongsTo(Candidate, {
  foreignKey: {
    name: 'candidateId',
    allowNull: false,
  },
});

// Position CandidateStatus
Position.hasMany(CandidateStatus, {
  foreignKey: {
    name: 'positionId',
    allowNull: false,
  },
});

CandidateStatus.belongsTo(Position, {
  foreignKey: {
    name: 'positionId',
    allowNull: false,
  },
});

// Hooks
CandidateStatus.addHook('beforeCreate', async (candidateStatus, options) => {
  try {
    const dataValues: CandidateStatusAttributes = {
      ...candidateStatus.dataValues,
    };

    const promiseGetIndexProperties = getIndexProperties(dataValues);
    const promiseValidateDataValues = validateDataValues(dataValues);

    const [{ index }] = await Promise.all([
      promiseGetIndexProperties,
      promiseValidateDataValues,
    ]);

    candidateStatus.dataValues = {
      ...dataValues,
      index: index,
    };
  } catch (e) {
    console.log(e);
  }
});

CandidateStatus.addHook('beforeUpdate', async (candidateStatus, options) => {
  try {
    const dataValues: CandidateStatusAttributes = {
      ...candidateStatus.dataValues,
    };

    await updateGlobalIndexes(dataValues, candidateStatus.previous());
  } catch (e) {
    console.log(e);
  }
});
