import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import type { TaskPriority, TaskStatus } from '../task.type.js';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsIn(['TODO', 'IN_PROGRESS', 'DONE'])
  @IsOptional()
  status?: TaskStatus;

  @IsIn(['LOW', 'MEDIUM', 'HIGH'])
  @IsOptional()
  priority?: TaskPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
