import { TaskEntity } from '@app/common/database/entities/task.entity';
import { UserEntity } from '@app/common/database/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(dto, session): Promise<TaskEntity> {
    const user = await this.usersRepository.findOneBy({
      id: session.passport.user,
    });

    return this.tasksRepository.save({ ...dto, owner: user });
  }

  get(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  async update(id: number, dto, session): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOneBy({
      owner: { id: session.passport.user },
      id,
    });

    if (!task) {
      throw new NotFoundException('Task not found for user');
    }

    task.title = dto.title ?? task.title;
    task.text = dto.text ?? task.text;

    if (dto.status) {
      task.status = dto.status;
      task.completedAt = DateTime.utc().toJSDate();
    }

    await this.tasksRepository.update(id, task);

    return task;
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
