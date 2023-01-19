import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { ErrorResponse } from '../common/errors/errorResponse';

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof ValidationError) {
    let message = '';
    err.errors.forEach((error) => {
      message += `${error.type}. ${error.message}. `;
    });
    err.message = message;
  }

  res.status(err?.statusCode || 500).json({
    success: false,
    error: err?.message || 'Server Error',
    data: err?.data || {},
  });
};
