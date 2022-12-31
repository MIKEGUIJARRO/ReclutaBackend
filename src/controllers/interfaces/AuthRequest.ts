import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
  };
}
