import {
  Controller,
  Delete,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CookieAuthGuard } from './guards/cookie-auth.guard';
import { CustomRegisterGuard } from './guards/custom-register.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  @HttpCode(200)
  @UseGuards(CustomRegisterGuard)
  register() {}

  @Post('session')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  logIn() {}

  @Delete('session')
  @UseGuards(CookieAuthGuard)
  logOut(@Request() req) {
    req.session.destroy();
  }
}
