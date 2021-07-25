import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import AppError from './Error/AppError';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, requeste: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'ERROR',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'ERROR',
      message: 'Internal server error',
    });
  }
);

app.listen(3334, () => console.log('backend started'));
