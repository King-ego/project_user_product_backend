import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../Error/AppError';
import AuthConfig from '../config/Auth';

interface TokenProps {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAutenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const headersAuth = request.headers.authorization;

  if (!headersAuth) {
    throw new AppError('JWT token is missing', 401);
  }

  const { secret } = AuthConfig.jwt;

  const [, token] = headersAuth.split(' ');

  try {
    const decore = verify(token, secret);

    const { sub } = decore as TokenProps;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid: JWT invalid', 401);
  }
};

export default ensureAutenticated;
