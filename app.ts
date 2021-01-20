import express from 'express';
import logger from 'morgan';
import statisticsRouter from './routes/statistics';
import cors from 'cors';
import * as bodyparser from 'body-parser';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/statistics', statisticsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json({
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
