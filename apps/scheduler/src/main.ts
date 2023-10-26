import { NestFactory } from '@nestjs/core';
import { SchedulerModule } from './scheduler.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SchedulerModule);

  await app.listen();
}
bootstrap();
