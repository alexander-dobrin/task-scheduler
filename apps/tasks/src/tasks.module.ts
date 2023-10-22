import { USERS_SERVICE } from '@app/common/constants';
import { DatabaseModule } from '@app/common/database/database.module';
import { TaskEntity } from '@app/common/database/entities/task.entity';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([TaskEntity]),
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: USERS_SERVICE,
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
