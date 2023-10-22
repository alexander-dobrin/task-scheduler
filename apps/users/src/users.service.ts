import { UserEntity } from '@app/common/database/entities/user.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RmqContext, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number, context: RmqContext): Promise<UserEntity> {
    const user = await this.usersRepository.findOneBy({ id });
    console.log(user);
    const channel = context.getChannelRef();
    channel.ack(context.getMessage());

    if (!user) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    }

    return user;
  }
}
