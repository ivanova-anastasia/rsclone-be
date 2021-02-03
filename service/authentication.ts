import * as express from 'express';
import { ServerError } from './../types/errors/serverErrors';
import { SessionsModel } from '../types/sessions';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'api_token') {
    let token = request.headers['authorization'];

    console.log('api_token: ' + token);

    return SessionsModel.findOne({ token: token }).then((session: any) => {
      if (session !== null) {
        request.app.set('session', session.userId);
        return Promise.resolve();
      } else {
        return Promise.reject(new ServerError('No token provided', 401));
      }
    });
  }
}
