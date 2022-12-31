import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { BaseRoutes } from '../common/routes/base.routes';
import { asyncHandler } from '../util/asyncHandler';
import { PartnerAuthBlock, partnerAuthCheck } from '../middlewares/auth';

export class AuthRoutes implements BaseRoutes<AuthController> {
  readonly name: string = 'auth';
  readonly controller: AuthController = new AuthController();
  readonly router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.post(
      '/login/local',
      PartnerAuthBlock,
      asyncHandler(this.controller.postLocalLogin)
    );

    this.router.post(
      '/signup/local',
      PartnerAuthBlock,
      asyncHandler(this.controller.postLocalSignup)
    );

    this.router.get(
      '/success',
      partnerAuthCheck,
      asyncHandler(this.controller.getLoginSuccess)
    );

    this.router.post(
      '/success',
      partnerAuthCheck,
      asyncHandler(this.controller.getLoginSuccess)
    );

    this.router.get('/failure', asyncHandler(this.controller.getLoginFailure));

    this.router.post('/failure', asyncHandler(this.controller.getLoginFailure));

    this.router.get(
      '/profile',
      partnerAuthCheck,
      asyncHandler(this.controller.getProfile)
    );

    this.router.post(
      '/logout',
      partnerAuthCheck,
      asyncHandler(this.controller.postLogout)
    );
  }
}
