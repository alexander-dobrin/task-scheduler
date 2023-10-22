import { USERS_SERVICE } from '@app/common/constants';
import { TaskEntity } from '@app/common/database/entities/task.entity';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  async create(dto): Promise<TaskEntity> {
    try {
      const user = await lastValueFrom(
        this.usersClient.send('get_by_id', { id: dto.owner.id }), // TODO: get id from payload
      );

      return this.tasksRepository.save({ ...dto, user });
    } catch (err) {
      if (err.status && err.message) {
        throw new HttpException(err.message, err.status);
      }
      throw err;
    }
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
