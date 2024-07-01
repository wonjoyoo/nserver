import { errorResponse } from '../utils/helper';
import { Request, Response, NextFunction } from 'express';

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return errorResponse(req, res, 401, 'Login is required');
  }
  next();
};

export const checkOwner = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  const { item } = req.body;
  // if (user?.id != item.userId && !user?.isActive) {
  //   return errorResponse(req, res, 403, 'You do not have permission');
  // }
  next();
};
