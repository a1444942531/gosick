import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/service/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService
  ) { }

  createTaskList(taskListCreateRequest: Prisma.TaskListCreateInput) {
    return this.prisma.taskList.create({
      data: taskListCreateRequest
    })
  }
}
