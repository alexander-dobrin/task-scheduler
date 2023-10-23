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

  async getByCredentials(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
