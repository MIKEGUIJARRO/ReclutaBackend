import { DataTypes, Model, Op } from 'sequelize';
import { ErrorResponse } from '../common/errors/errorResponse';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
import { Candidate } from './candidate';
import { Position } from './position';

const databaseSequelize = new DatabaseSequelize();

export interface CandidateStatusAttributes {
  id: number;
  comments: string;
  stage: string;
  index: number;
  positionStageIndex: string;
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
    positionStageIndex: {
      type: DataTypes.STRING,
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

// Hooks Helpers

const validateDataValues = async (
  dataValues: CandidateStatusAttributes
): Promise<void> => {
  const promisePosition = Position.findOne({
    where: {
      id: dataValues.positionId,
      stages: { [Op.contains]: [dataValues.stage] },
    },
  });
  const promiseCandidateStatus = CandidateStatus.findOne({
    where: {
      positionId: dataValues.positionId,
      candidateId: dataValues.candidateId,
    },
  });

  const [responsePosition, responseCandidateStatus] = await Promise.all([
    promisePosition,
    promiseCandidateStatus,
  ]);

  if (!responsePosition) {
    throw new ErrorResponse('Invalid stage property', 400);
  }
  if (responseCandidateStatus) {
    throw new ErrorResponse('This candidate status already exists', 400);
  }
};
const getIndexProperties = async (
  dataValues: CandidateStatusAttributes
): Promise<{ index: number; positionStageIndex: string }> => {
  const count = await CandidateStatus.count({
    where: {
      stage: dataValues.stage,
    },
  });
  return {
    index: count,
    positionStageIndex:
      dataValues.positionId + ',' + dataValues.stage + ',' + count,
  };
};

// Hooks
CandidateStatus.addHook('beforeCreate', async (candidateStatus, options) => {
  const dataValues: CandidateStatusAttributes = {
    ...candidateStatus.dataValues,
  };

  const promiseGetIndexProperties = getIndexProperties(dataValues);
  const promiseValidateDataValues = validateDataValues(dataValues);

  const [{ index, positionStageIndex }] = await Promise.all([
    promiseGetIndexProperties,
    promiseValidateDataValues,
  ]);

  candidateStatus.dataValues = {
    ...dataValues,
    index: index,
    positionStageIndex: positionStageIndex,
  };
});

CandidateStatus.sync({ force: true });
