import { DataTypes, Model } from 'sequelize';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
import { Candidate } from './candidate';
import { Position } from './position';

const databaseSequelize = new DatabaseSequelize();

export interface CandidateStatusAttributes {
  id: number;
  comments: string;
  stage: string;
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
      allowNull: false,
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
