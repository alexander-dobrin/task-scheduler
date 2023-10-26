import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto, @Session() session) {
    return this.tasksService.create(dto, session);
  }

  @Get()
  get() {
    return this.tasksService.get();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto, @Session() session) {
    return this.tasksService.update(id, dto, session);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
