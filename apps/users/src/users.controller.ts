import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_by_id')
  handleGetById(@Payload() data, @Ctx() context: RmqContext) {
    return this.usersService.getById(data.id, context);
  }
}
