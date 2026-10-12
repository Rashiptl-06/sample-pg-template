import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import loggerFactory from './utils/logging';
import { formatLogger } from './utils/middlewares/formatLogger';
import { requestIdHandler } from './utils/middlewares/requestIdHandler';
import { tokenHandler } from './utils/middlewares/tokenHandler';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(
  loggerFactory.connectLogger(loggerFactory.getLogger('http'), {
    level: 'auto',
    format: formatLogger,
  }),
);
app.use(requestIdHandler as unknown as express.RequestHandler);
app.use(tokenHandler as express.RequestHandler);

export default app;
