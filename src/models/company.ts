import { DataTypes, Model } from 'sequelize';
import { DatabaseSequelize } from '../config/database/implementation/sequelize/database';
import { Partner } from './partner';

const databaseSequelize = new DatabaseSequelize();

export class Company extends Model {}

Company.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companySize: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['micro', 'small', 'medium', 'large'],
    },
  },
  {
    // Other model options go here
    indexes: [
      {
        unique: true,
        fields: ['partnerId'],
      },
    ],

    sequelize: databaseSequelize.getDatabaseInstance(), // We need to pass the connection instance
  }
);

// Associations
Partner.hasOne(Company, {
  foreignKey: {
    name: 'partnerId',
    allowNull: false,
  },
});

Company.belongsToMany(Partner, {
  through: 'CompanyPartner',
  foreignKey: {
    name: 'partnerId',
    allowNull: false,
  },
});

//Company.sync({ force: true });
