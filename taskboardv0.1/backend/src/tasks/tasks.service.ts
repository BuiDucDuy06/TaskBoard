import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { Task } from './task.type.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [
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

create(taskData: CreateTaskDto) {
  const newTask: Task = {
    id:
      this.tasks.length > 0
        ? Math.max(...this.tasks.map((task) => task.id)) + 1
        : 1,
    title: taskData.title,
    description: taskData.description,
    status: 'TODO',
    priority: taskData.priority,
    dueDate: taskData.dueDate,
  };

  this.tasks.push(newTask);

  return newTask;
}

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }

    if (updateTaskDto.status !== undefined) {
      task.status = updateTaskDto.status;
    }

    if (updateTaskDto.priority !== undefined) {
      task.priority = updateTaskDto.priority;
    }

    if (updateTaskDto.dueDate !== undefined) {
      task.dueDate = updateTaskDto.dueDate;
    }

    return task;
  }

  remove(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    const deletedTask = this.tasks[taskIndex];

    this.tasks.splice(taskIndex, 1);

    return deletedTask;
  }
}
