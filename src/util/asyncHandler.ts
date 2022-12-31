import { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler = (fn: Function): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err: Error) => {
      return next(err);
    });
  };
};
