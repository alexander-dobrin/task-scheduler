import { EMAIL_SERVICE } from '@app/common/constants';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(EMAIL_SERVICE) private readonly emailClient: ClientProxy,
  ) {}
}
