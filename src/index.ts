import 'dotenv/config';
import { ErrorRequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import app from './app';
import httpServer from './server';
import config from './config';
import { PostgresDb } from './db';
import { RedisDb } from './db';
import { corsHandler, errorHandler, healthCheckHandler } from './utils/middlewares';
import testingRoute from './routes/testing.route';
import dealRoute from './routes/deal.route';
import evaluationFrameworkRoute from "./routes/evaluationFramework.route";
import { swaggerJson } from './swagger.json';
import loggerFactory from './utils/logging';

const logger = loggerFactory.getLogger('server');

const server = async () => {
  app.disable('etag');

  app.get('/healthcheck', healthCheckHandler);
  app.use(corsHandler);

  await PostgresDb.connectToDatabase();
  await RedisDb.connect();

  app.use('/api/v1/testingdata', testingRoute);
  app.use('/api/v1/deals', dealRoute);
  app.use('/api/v1/evaluation-framework', evaluationFrameworkRoute,)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson()));

  app.use(errorHandler as ErrorRequestHandler);

  httpServer.listen(config.port, () => {
    logger.info(`Server is running on port ${config.port}`);
  });
};

server().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
