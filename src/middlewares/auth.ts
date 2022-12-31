import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../common/errors/errorResponse';

export const partnerAuthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

export const PartnerAuthBlock = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  } else {
    next();
  }
};
