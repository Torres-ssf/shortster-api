import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { auth } from '@config/auth';

import { AppError } from '@shared/errors/AppError';

interface ITokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export function checkAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const [, token] = authHeader.split(' ');

    const { secret } = auth.jwt;

    if (!secret) {
      throw Error('jwt token secret was not defined');
    }

    try {
      const decoded = verify(token, secret);

      const { sub } = decoded as ITokenPayLoad;

      request.body.user_id = sub;
    } catch {
      throw new AppError('Invalid JWT token', 401);
    }
  }

  return next();
}
