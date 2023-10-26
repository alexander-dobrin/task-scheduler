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

  async create(dto): Promise<TaskEntity> {
    // TODO: get id from payload
    const user = await this.usersRepository.findOneBy({ id: dto.owner.id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.tasksRepository.save({ ...dto, user });
  }

  get(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  async update(id: number, dto): Promise<void> {
    const task = new TaskEntity();
    task.title = dto.title ?? task.title;
    task.text = dto.text ?? task.text;

    if (dto.status) {
      task.status = dto.status;
      task.completedAt = DateTime.utc().toJSDate();
    }

    await this.tasksRepository.update(id, task);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
