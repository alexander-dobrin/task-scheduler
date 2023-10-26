import { EMAIL_SERVICE } from '@app/common/constants';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    DatabaseModule,
    ScheduleModule.forRoot(),
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
  providers: [SchedulerService],
})
export class SchedulerModule {}
