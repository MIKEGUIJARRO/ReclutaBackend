import express, { Application, Router } from 'express';
import 'colors';
import passport from 'passport';
import { AuthRoutes } from './routes/auth.routes';
import { CandidatesRoutes } from './routes/candidates.routes';
import { DatabaseSequelize } from './config/database/implementation/sequelize/database';
import { errorHandler } from './middlewares/errorHandler';
import session from 'express-session';
import cors from 'cors';
import connectSessionSequelize from 'connect-session-sequelize';
import { CompanyRoutes } from './routes/company.routes';
import { PositionsRoutes } from './routes/positions.routes';
import { CandidatesStatusRoutes } from './routes/candidatesStatus.routes';
import morgan from 'morgan';
import { QueryTypes } from 'sequelize';

// Extending module
declare module 'express-session' {
  interface SessionData {
    messages: string[];
    passport: any;
  }
}

export class App {
  private readonly app: Application;
  private isInit: boolean = false;
  constructor() {
    this.app = express();

    // Singleton implementation
  }

  init() {
    this.isInit = true;
    // Create Database
    const db = new DatabaseSequelize();
    //db.syncAllModels({ force: true });

    this.app.use(express.json({ limit: 2000000 }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
        credentials: true,
      })
    );

    this.app.use(morgan('dev'));
    const SequelizeStore = connectSessionSequelize(session.Store);
    const sessionStore = new SequelizeStore({ db: db.getDatabaseInstance() });
    checkIfSessionsTableExists().then((responseTableExists) => {
      if (!responseTableExists) {
        console.log('Table does not exists'.green);
        sessionStore.sync({ force: true });
      }
    });
    this.app.use(
      session({
        secret: 'random secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week expiration
        },
        store: sessionStore,
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.registerApiRoutes(this.app);
  }

  listen() {
    if (!this.isInit) {
      throw new Error(
        'The App needs to be init() before running other class functions.'
      );
    }
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`The app is running on port ${PORT} ✅`.green);
    });
  }

  registerApiRoutes(app: Application) {
    const mainRouter = Router();
    const prefix = '/api';
    const apiVersioning = '/v1';

    const authRoutes = new AuthRoutes();
    const candidatesRoutes = new CandidatesRoutes();
    const companyRoutes = new CompanyRoutes();
    const positionsRoutes = new PositionsRoutes();
    const candidatesStatusRoutes = new CandidatesStatusRoutes();

    mainRouter.use(`/${authRoutes.name}`, authRoutes.router);
    mainRouter.use(`/${candidatesRoutes.name}`, candidatesRoutes.router);
    mainRouter.use(`/${companyRoutes.name}`, companyRoutes.router);
    mainRouter.use(`/${positionsRoutes.name}`, positionsRoutes.router);
    mainRouter.use(
      `/${candidatesStatusRoutes.name}`,
      candidatesStatusRoutes.router
    );

    app.use(prefix + apiVersioning, mainRouter);

    app.use(errorHandler);
  }
}

const checkIfSessionsTableExists = async () => {
  const query = `SELECT EXISTS (
      SELECT * FROM pg_tables
      WHERE  schemaname = 'public'
      AND    tablename  = 'Sessions'
   );`;
  const database = new DatabaseSequelize();
  const queryResult = await database.getDatabaseInstance().query(query);
  const response: any = queryResult[0];
  return response[0].exists;
};
