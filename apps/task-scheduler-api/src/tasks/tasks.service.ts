import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from '../database/entities/task.entity';
import { UserEntity } from '../database/entities/user.entity';

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
    await this.tasksRepository.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
