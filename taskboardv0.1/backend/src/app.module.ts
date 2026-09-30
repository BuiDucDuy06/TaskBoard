import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/task.entity.js';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? '123456',
      database: process.env.DB_NAME ?? 'project_management',
      entities: [TaskEntity],
      synchronize: false,
    }),
    TasksModule,
  ],
})
export class AppModule {}