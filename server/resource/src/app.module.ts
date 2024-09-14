import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    CoreModule,
    TodoModule
  ],
  controllers: [
  ],
  providers: [],
})
export class AppModule { }
