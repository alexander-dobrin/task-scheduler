import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto) {
    return this.tasksService.create(dto);
  }

  @Get()
  get() {
    return this.tasksService.get();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }
}
