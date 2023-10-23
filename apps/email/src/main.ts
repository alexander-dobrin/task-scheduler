import { EMAIL_SERVICE } from '@app/common/constants';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { EmailModule } from './email.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: EMAIL_SERVICE,
      noAck: false,
      persistent: true,
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
