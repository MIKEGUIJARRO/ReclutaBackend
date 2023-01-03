import { Request } from 'express';
import { ExpressUser } from '../../common/types/ExpressUser';

export interface RequestAuth extends Request {
  user: ExpressUser;
}
