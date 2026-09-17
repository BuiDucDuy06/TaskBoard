import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private readonly tasks = [
    {
      id: 1,
      title: 'Setup project',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: '2026-09-20',
    },
    {
      id: 2,
      title: 'Build board',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      dueDate: '2026-09-22',
    },
    {
      id: 3,
      title: 'Read docs',
      status: 'DONE',
      priority: 'LOW',
      dueDate: '2026-09-15',
    },
    {
      id: 4,
      title: 'Learn state',
      status: 'TODO',
      priority: 'HIGH',
      dueDate: '2026-09-25',
    },
  ];

  findAll() {
    return this.tasks;
  }
}