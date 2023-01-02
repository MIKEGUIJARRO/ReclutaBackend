import { Request } from 'express';
import { ExpressUser } from '../../common/types/ExpressUser';

export interface AuthRequest extends Request {
  user: ExpressUser;
}
