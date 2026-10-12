import { Response, NextFunction } from 'express';
import { customAlphabet } from 'nanoid';
import asyncLocalStorage from '../asyncContext';
import { Request } from '../../interfaces/Request';

export const requestIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  /** REASON: In local it's crashing the nodemon with asyncLocalStorage */
  if (req.hostname !== 'localhost') {
    req.id = await customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 20)();
    const store = new Map<string, string>();
    asyncLocalStorage.run(store, () => {
      store.set('requestId', req.id);
      res.setHeader('X-Request-Id', req.id);
      next();
    });
  } else {
    next();
  }
};
