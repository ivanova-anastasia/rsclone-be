import { BodyProp, Header, Controller, Delete, Get, Post, Route, Tags } from 'tsoa';

import md5 from 'md5';
import {v4 as uuid} from 'uuid';
import { UsersModel } from '../types/user';
import { SessionsModel } from '../types/sessions';

const { PG_SALT } = process.env;

const getPasswordHash = (password) => {
  console.log("PG_SALT: " + PG_SALT)
  const pgSalt = ""
  return md5(password + PG_SALT);
}

const generateToken = (userId) => {

  const token = uuid()

  const newSession = new SessionsModel({
    token: token,
    userId: userId,
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
  });

  newSession
    .save()
    .then((item) => {
      console.log('Session is saved '+ item)
    })
    .catch((err) => console.log('Session isnt saved ' + err));
  return token;
}

@Route('/auth')
@Tags('AuthController')
export class AuthController extends Controller {
  

  @Post('/login')
  public async create(
    @BodyProp() userName: string,
    @BodyProp() password: string
  ): Promise<any> {
    
    console.log("login request: username - " + userName + " password - " + password );
    const passwordHash = getPasswordHash(password);


    const newUser = new UsersModel({
      userName: userName,
      passwordHash: passwordHash,
    });

    console.log("log: ")
    return UsersModel.findOne({ userName: userName, passwordHash: passwordHash })
    .then((user: any) => {
      console.log("log: " + user)
      this.setStatus(200);
      const token = generateToken(user._id);
      return { token: token};
    })
    .catch((err: any) => {
      this.setStatus(403)
      return { reason: 'Invalid username or password'}
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

    const existingUserCheck = UsersModel.findOne({ userName: userName})
    .then((user: any) => {
      if (user) {
        this.setStatus(409);
        console.log("user exist: " + user)
      } else {
        //return { reason: 'This username already exists'}
        return user;
      }
    })
    .catch((err: any) => {
      console.log("err: " + err);
    });

    console.log("existingUserCheck: " + existingUserCheck.userName);
    if (existingUserCheck) return { reason: 'This username already exists'};

    return newUser
      .save()
      .then((user) => {

      const token = generateToken(user._id);
      console.log ("token: " + token);
      this.setStatus(201);
      return { token: token};
      })
      .catch((err) => this.setStatus(500));
      
  }
}
