import { Request, Response, NextFunction } from 'express';

export function asyncWrapper(routeHandler: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await routeHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
