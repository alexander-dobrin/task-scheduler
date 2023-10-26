import { EMAIL_SERVICE } from '@app/common/constants';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LocalSerializer } from '../auth/serializers/local.serializer';
import { CustomRegisterStrategy } from '../auth/strategies/custom-register.strategy';
import { LocalAuthStrategy } from '../auth/strategies/local-auth.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
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
