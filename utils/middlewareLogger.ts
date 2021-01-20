import * as express from 'express';
import { finished } from 'stream';

//TODO: delete

const requestLoggerMiddleware = (
  req: express.Request,
  resp: express.Response,
  next: express.NextFunction
) => {
  console.info(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  resp.on('finished', () => {
    const elapsed = new Date().getTime() - start;
    console.info(
      `${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsed}ms`
    );
  });
  next();
};

export { requestLoggerMiddleware };
