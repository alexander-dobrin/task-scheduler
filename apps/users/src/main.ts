import { USERS_SERVICE } from '@app/common/constants';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: USERS_SERVICE,
      noAck: false,
      persistent: true,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
