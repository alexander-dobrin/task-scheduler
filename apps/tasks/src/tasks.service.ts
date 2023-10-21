import { TaskEntity } from '@app/common/database/entities/task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
  ) {}

  create(dto): Promise<TaskEntity> {
    return this.tasksRepository.save(dto);
  }

  get(): Promise<TaskEntity[]> {
    return this.tasksRepository.find();
  }

  async update(id: number, dto): Promise<void> {
    await this.tasksRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
