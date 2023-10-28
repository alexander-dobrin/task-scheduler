import { EMAIL_SERVICE } from '@app/common/constants';
import { TaskEntity } from '@app/common/database/entities/task.entity';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { UserTasksStatistics } from '@app/common/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(EMAIL_SERVICE) private readonly emailClient: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendOutTaskStatistics(): Promise<void> {
    const prevDayDate = DateTime.now().minus({ days: 1 }).toISO();

    const statistics: UserTasksStatistics[] = await this.usersRepository
      .createQueryBuilder('user')
      .select('email')
      .addSelect(
        (subQuery) =>
          subQuery
            .from(TaskEntity, 'task')
            .select('count(*)')
            .where('"completedAt" is not null and "ownerId" = user.id')
            .andWhere('task."createdAt" >= :prevDayDate', { prevDayDate }),
        'completedTasksCount',
      )
      .addSelect(
        (subQuery) =>
          subQuery
            .from(TaskEntity, 'task')
            .select('count(*)')
            .where('"completedAt" is null and "ownerId" = user.id')
            .andWhere('task."createdAt" >= :prevDayDate', { prevDayDate }),
        'remainingTasksCount',
      )
      .getRawMany();

    this.emailClient.emit('send_out_task_statistics', statistics);
  }
}
