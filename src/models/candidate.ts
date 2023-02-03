import { DataTypes, Model } from 'sequelize';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
import { Company } from './company';

const databaseSequelize = new DatabaseSequelize();

export interface CandidateAttributes {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  companyId: number;
}

export class Candidate extends Model implements CandidateAttributes {
  declare id: number;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string;
  declare createdAt?: Date | undefined;
  declare updatedAt?: Date | undefined;
  declare companyId: number;
}

Candidate.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize: databaseSequelize.getDatabaseInstance(), // We need to pass the connection instance
  }
);

// Associations
Company.hasMany(Candidate, {
  foreignKey: {
    name: 'companyId',
    allowNull: false,
  },
});

Candidate.belongsTo(Company, {
  foreignKey: {
    name: 'companyId',
    allowNull: false,
  },
});
