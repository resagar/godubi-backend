import { NextFunction, Request, Response } from 'express';

export const apiAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const headerApiToken = req.headers['api-auth'];
  if (typeof headerApiToken !== 'undefined') {
    if (headerApiToken !== process.env.TOKEN_SECRET) {
      res.status(401).json({
        message: 'Invalid Token',
      });
    } else {
      next();
    }
  } else {
    res.status(401).json({
      message: 'access denied',
    });
  }
};
