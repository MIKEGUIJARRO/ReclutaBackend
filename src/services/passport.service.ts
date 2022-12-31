import { Request } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { MODELS } from '../constants/models';
import { STRATEGIES } from '../constants/strategies';
import { Partner } from '../models/partner';
import { hashPassword, matchPassword } from '../util/helpers';

const saltRounds = 10;

export class PassportService {
  public passport: passport.PassportStatic = passport;

  constructor() {
    this.passport.serializeUser((user: any, cb: Function) => {
      // Only called on login
      const coreUser = {
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
      };
      cb(null, coreUser);
    });

    this.passport.deserializeUser((user: Express.User, cb: Function) => {
      // Called on all requests
      return cb(null, user);
    });

    this.initStrategies();
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
