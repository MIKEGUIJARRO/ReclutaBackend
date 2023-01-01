import { Request } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { ExpressUser } from '../common/types/ExpressUser';
import { MODELS } from '../constants/models';
import { STRATEGIES } from '../constants/strategies';
import { Partner } from '../models/partner';
import { hashPassword, matchPassword } from '../util/helpers';
import { CompanyService } from './company.service';
import { CompanySequelizeRepository } from './repositories/implementation/sequelize/company.repository';

export class PassportService {
  public passport: passport.PassportStatic = passport;

  constructor() {
    this.initPassport();
    this.initStrategies();
  }

  initPassport() {
    const companyRepository = new CompanySequelizeRepository();
    const companyService = new CompanyService(companyRepository);
    this.passport.serializeUser(async (user: any, cb: Function) => {
      // Only called on login
      const coreUser: any = {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        company: null,
      };

      const companies = await companyService.findAll(user.id);

      if (companies.length > 0) {
        const company = companies[0];
        coreUser.company = company;
      }

      cb(null, coreUser);
    });

    this.passport.deserializeUser(async (user: ExpressUser, cb: Function) => {
      // Called on all requests
      if (!user.company) {
        const companies = await companyService.findAll(parseInt(user.id));
        if (companies.length > 0) {
          const company = companies[0];
          user.company = company;
        }
      }
      return cb(null, user);
    });
  }

  initStrategies() {
    this.localSignupStrategy();
    this.localSigninStrategy();
  }

  private localSigninStrategy() {
    this.passport.use(
      STRATEGIES.localSignin,
      new passportLocal.Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
        },
        async (
          req: Request,
          email: string,
          password: string,
          done: Function
        ) => {
          const partner = await Partner.scope(
            MODELS.partner.scopes.withPassword
          ).findOne({
            where: { email: email },
          });

          if (!partner) {
            // Email does not exists
            return done(null, false);
          }

          const isSamePassword = await matchPassword(
            password,
            partner.dataValues.password
          );

          if (!isSamePassword) {
            // Password is incorrect
            return done(null, false);
          }

          return done(null, partner.dataValues);
        }
      )
    );
  }

  private localSignupStrategy() {
    this.passport.use(
      STRATEGIES.localSignup,
      new passportLocal.Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true,
        },
        async (
          req: Request,
          email: string,
          password: string,
          done: Function
        ) => {
          const hashedPassword = await hashPassword(password);
          const [partner, created] = await Partner.findOrCreate({
            where: { email: email },
            defaults: { ...req.body, password: hashedPassword },
          });
          if (!created) {
            return done(null, false);
          }
          return done(null, partner.dataValues);
        }
      )
    );
  }
}
