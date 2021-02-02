import express from 'express';
import logger from 'morgan';
import './routes/statistics';
import './routes/auth';
import cors from 'cors';
import * as bodyparser from 'body-parser';
import { RegisterRoutes } from './routes/routes';
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));

RegisterRoutes(app);

try {
  const swaggerDocument = require('./swagger.json');
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch (err) {
  console.error('Unable to read swagger.json', err);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    statusCode: 404,
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.json(function (err, req, res, next) {
    res.json({
      statusCode: 500,
      message: err.message,
      stack: err.stack,
    });
  });
});

export default app;
