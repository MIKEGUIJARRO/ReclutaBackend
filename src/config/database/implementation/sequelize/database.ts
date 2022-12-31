import { Sequelize, SyncOptions } from 'sequelize';
import { Database } from '../../database';

export class DatabaseSequelize implements Database {
  private static instance: DatabaseSequelize;
  private sequelize: Sequelize = new Sequelize(process.env.DATABASE_URL);

  // Singleton
  constructor() {
    if (DatabaseSequelize.instance) {
      return DatabaseSequelize.instance;
    }
    this.testConnection();
    DatabaseSequelize.instance = this;
  }

  testConnection() {
    this.sequelize
      .authenticate()
      .then(() => {
        console.log(
          'DB connection has been established successfully. 🎉'.blue.underline
            .bold
        );
      })
      .catch((err) => {
        console.error('Unable to connect to the database:'.red.bold, err);
      });
  }

  closeConnection() {
    this.sequelize
      .close()
      .then(() => {
        'DB connection has been closed successfully. 🎉'.blue.underline.bold;
      })
      .catch((err) => {
        console.error('Unable to close the connection: '.red.bold, err);
      });
  }

  getDatabaseInstance(): Sequelize {
    return this.sequelize;
  }

  syncAllModels(options: SyncOptions) {
    this.sequelize.sync(options).then(() => {
      console.log('All models were synchronized successfully. 🎈'.green);
    });
  }
}
