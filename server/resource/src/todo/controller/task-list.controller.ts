import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { TaskListCreateRequest } from '../dto/task.list.create.request';
import { TaskService } from '../service/task.service';

@Controller('task-lists')
export class TaskListController {
  constructor(
    private taskService: TaskService
  ) { }

  @Post()
  create(@Body() taskListCreateRequest: TaskListCreateRequest) {
    return this.taskService.createTaskList({
      ...taskListCreateRequest,
      // 创建人id
      createById: 1,
    })
  }
}
