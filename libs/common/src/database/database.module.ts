import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from './entities/user.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      host: 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      entities: [UserEntity, TaskEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, TaskEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
