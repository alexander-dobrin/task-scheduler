import { DatabaseModule } from '@app/common/database/database.module';
import { TaskEntity } from '@app/common/database/entities/task.entity';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([TaskEntity, UserEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
