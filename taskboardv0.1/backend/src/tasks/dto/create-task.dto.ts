import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import type { TaskPriority } from '../task.type.js';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  priority: TaskPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}