import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { TaskListController } from './controller/task-list.controller';
import { PrismaService } from 'src/core/service/prisma.service';

@Module({
    imports: [
    ],
    controllers: [
        TaskController,
        TaskListController
    ],
    providers: [
        TaskService,
        PrismaService
    ],
})
export class TodoModule {};