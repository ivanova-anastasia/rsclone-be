import { BodyProp, Header, Controller, Delete, Get, Post, Route, Tags } from 'tsoa';

import md5 from 'md5';
import {v4 as uuid} from 'uuid';
import { UsersModel } from '../types/user';
import { SessionsModel } from '../types/sessions';

@Route('/registration')
@Tags('RegistrationController')
export class RegistrationController extends Controller {
  

  @Post('/test')
  public async test(
    @BodyProp() userName: string,
    @BodyProp() password: string
  ): Promise<any> {
  }
}
