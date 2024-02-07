import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response, Application } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '../../errors/AppError';
// import '@shared/typeorm';
import '@shared/container';
import uploadConfig from '@config/upload';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import logger from '@config/logger';
import { connect } from '../typeorm';

export class SetupServer {
  private app: Application;

  constructor(private port = 3333) {
    this.app = express();
  }

  public async init() {
    this.setupExpress();
  }

  private setupExpress(): void {
    this.app.use(rateLimiter);

    this.app.use('/files', express.static(uploadConfig.directory));
    this.app.use(routes);
    this.app.use(errors());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      cors({
        origin: '*',
      }),
    );

    this.app.use(errors());
    this.app.use(
      (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
      ) => {
        if (error instanceof AppError) {
          return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
          });
        } else {
          logger.info('Error: ' + error);
          return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
          });
        }
      },
    );
    this.app.use(helmet());
    this.app.use(compression());
  }

  private async databaseSetup(): Promise<void> {
    await connect;
  }

  public async start(): Promise<void> {
    await this.databaseSetup();

    this.app.listen(this.port, () => {
      logger.info('Server rodando na porta: ' + this.port + ' 🚀');
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(rateLimiter);

// app.use(pagination);
// app.use('/files', express.static(uploadConfig.directory));
// app.use(routes);
// app.use(errors());

// app.use(
//   (error: Error, request: Request, response: Response, next: NextFunction) => {
//     if (error instanceof AppError) {
//       return response.status(error.statusCode).json({
//         status: 'error',
//         message: error.message,
//       });
//     } else {
//       return response.status(500).json({
//         status: 'error',
//         message: 'Internal server error',
//       });
//     }
//   },
// );

// app.listen(3333, () => {
//   console.log('Server startedd on port 3333! 🚀');
// });
