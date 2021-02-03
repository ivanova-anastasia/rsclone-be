import {
  BodyProp,
  Header,
  Controller,
  Delete,
  Get,
  Post,
  Route,
  Tags,
} from 'tsoa';

import md5 from 'md5';
import { v4 as uuid } from 'uuid';
import { UsersModel } from '../types/user';
import { SessionsModel } from '../types/sessions';
import { ServerError } from './../types/errors/serverErrors';

//const { PG_SALT } = process.env;

const getPasswordHash = (password) => {
  const PG_SALT = 'qwe123';
  console.log('PG_SALT: ' + PG_SALT);
  return md5(password + PG_SALT);
};

const generateToken = (userId) => {
  const token = uuid();

  const newSession = new SessionsModel({
    token: token,
    userId: userId,
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
  });

  return newSession
    .save()
    .then((item: any) => {
      return item.token;
    })
    .catch((err) => console.log('Session is not saved ' + err));
};

const removeOldSessions = (userId) => {
  return SessionsModel.deleteMany({ userId: userId })
    .then(() => {
      return userId;
    })
    .catch((err) => console.log('old sessions not found'));
};

@Route('/auth')
@Tags('AuthController')
export class AuthController extends Controller {
  @Post('/login')
  public async create(
    @BodyProp() userName: string,
    @BodyProp() password: string
  ): Promise<any> {
    const passwordHash = getPasswordHash(password);

    return UsersModel.findOne({
      userName: userName,
      passwordHash: passwordHash,
    })
      .then((user: any) => {
        return removeOldSessions(user._id);
      })
      .then((user: any) => {
        return generateToken(user._id);
      })
      .then((token: any) => {
        this.setStatus(200);
        return { token: token };
      })
      .catch((err: any) => {
        this.setStatus(403);
        return { reason: 'Invalid username or password' };
      });
  }

  @Post('/register')
  public async register(
    @BodyProp() userName: string,
    @BodyProp() password: string
  ): Promise<any> {
    const passwordHash = getPasswordHash(password);

    const newUser = new UsersModel({
      userName: userName,
      passwordHash: passwordHash,
    });

    return UsersModel.findOne({ userName: userName })
      .then((user: any) => {
        console.log('user: ' + JSON.stringify(user));

        if (user) {
          return Promise.reject(
            new ServerError('This username already exists', 409)
          );
        } else return null;
      })
      .then(() => {
        return newUser.save();
      })
      .then((user: any) => {
        return generateToken(user._id);
      })
      .then((token: any) => {
        this.setStatus(201);
        return { token: token };
      })
      .catch((err: any) => {
        return Promise.reject(new ServerError(err, 409));
      });
  }
}
