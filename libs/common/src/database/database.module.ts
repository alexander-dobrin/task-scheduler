import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './entities/user.entity';
import { TaskEntity } from './entities/task.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      entities: [UserEntity, TaskEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, TaskEntity]),
  ],
})
export class DatabaseModule {}
