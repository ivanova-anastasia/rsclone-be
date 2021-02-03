import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import logger from 'morgan';
import './routes/statistics';
import './routes/auth';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { RegisterRoutes } from './routes/routes';
import swaggerUI from 'swagger-ui-express';
import { ValidateError } from 'tsoa';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

RegisterRoutes(app);

try {
  const swaggerDocument = require('./swagger.json');
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (err) {
  console.error('Unable to read swagger.json', err);
}

// catch 404 and forward to error handler
app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || 500;
    console.log('err: ' + JSON.stringify(err));
    const body: any = {
      fields: err.fields || undefined,
      message: err.message || 'An error occurred during the request.',
      name: err.name,
      status,
    };
    res.status(status).json(body);
    next();
  }
);

export default app;
