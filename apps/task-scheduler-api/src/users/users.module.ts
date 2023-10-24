import { EMAIL_SERVICE } from '@app/common/constants';
import { DatabaseModule } from '@app/common/database/database.module';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalSerializer } from './serializers/local.serializer';
import { LocalAuthStrategy } from './strategies/local-auth.strategy';
import { CustomRegisterStrategy } from './strategies/custom-register.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([UserEntity]),
    ClientsModule.register([
      {
        name: EMAIL_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: EMAIL_SERVICE,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    LocalAuthStrategy,
    CustomRegisterStrategy,
    LocalSerializer,
  ],
})
export class UsersModule {}
