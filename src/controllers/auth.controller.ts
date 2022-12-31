import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { ErrorResponse } from '../common/errors/errorResponse';
import { STRATEGIES } from '../constants/strategies';
import { PassportService } from '../services/passport.service';
export class AuthController {
  passport = passport;

  constructor() {
    const passportService = new PassportService();
  }

  public postLocalLogin = this.passport.authenticate(STRATEGIES.localSignin, {
    failureRedirect: '/api/v1/auth/failure',
    successRedirect: '/api/v1/auth/success',
    failureMessage: 'Invalid username or password',
    session: true,
  });

  public postLocalSignup = this.passport.authenticate(STRATEGIES.localSignup, {
    failureRedirect: '/api/v1/auth/failure',
    successRedirect: '/api/v1/auth/success',
    failureMessage: 'This account already exists',
    session: true,
  });

  public async getLoginSuccess(req: Request, res: Response) {
    res.status(200).json({ success: true, data: { user: req.user } });
  }

  public async getLoginFailure(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const messages = req.session.messages;
    console.log('Messages');
    console.log(messages);
    let error = 'Auth problem.';
    let statusCode = 500;
    if (messages && messages.length > 0) {
      error = messages[messages.length - 1];
      statusCode = 400;
    }
    req.session.messages = [];
    next(new ErrorResponse(error, statusCode));
  }

  public async getProfile(req: Request, res: Response) {
    res.status(200).json({ success: true, data: { user: req.user } });
  }

  public async postLogout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }
        res.status(200).json({ success: true, message: 'Successful logout' });
      });
    });
  }
}
