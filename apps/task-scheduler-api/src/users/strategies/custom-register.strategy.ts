import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { UsersService } from '../users.service';

@Injectable()
export class CustomRegisterStrategy extends PassportStrategy(
  Strategy,
  'register',
) {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(req) {
    return this.usersService.register({
      email: req.body.email,
      password: req.body.password,
    });
  }
}
