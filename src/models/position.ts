import { DataTypes, Model } from 'sequelize';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
import { Company } from './company';

const databaseSequelize = new DatabaseSequelize();

export interface PositionAttributes {
  id: string;
  title: string;
  description: string;
  stages: string[];
  createdAt?: Date;
  updatedAt?: Date;
  companyId: number;
}

export class Position extends Model {}

Position.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stages: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize: databaseSequelize.getDatabaseInstance(),
  }
);

// Associations
Company.hasMany(Position, {
  foreignKey: {
    name: 'companyId',
    allowNull: false,
  },
});

Position.belongsTo(Company, {
  foreignKey: {
    name: 'companyId',
    allowNull: false,
  },
});
