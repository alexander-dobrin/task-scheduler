import { EMAIL_SERVICE } from '@app/common/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(EMAIL_SERVICE) private readonly emailClient: ClientProxy,
  ) {}

  async register(dto) {
    const userWithSameEmail = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (userWithSameEmail) {
      throw new BadRequestException('Email adress is allready in use');
    }

    const user = await this.usersRepository.save({ ...dto });

    this.emailClient.emit('user_registered', user);

    return user;
  }

  async getByCredentials(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
