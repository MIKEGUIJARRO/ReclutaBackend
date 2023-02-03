import { DataTypes, Model } from 'sequelize';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
const databaseSequelize = new DatabaseSequelize();

export interface PartnerAttributes {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Partner extends Model implements PartnerAttributes {
  declare id: number;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare createdAt?: Date | undefined;
  declare updatedAt?: Date | undefined;
}

Partner.init(
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
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\S+@\S+\.\S+$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {},
    },
    sequelize: databaseSequelize.getDatabaseInstance(), // We need to pass the connection instance
  }
);
