import type {
  Task,
  TaskStatus,
} from "../types";

import { TaskColumn } from "./TaskColumn";

type TaskBoardProps = {
  tasks: Task[];

  onComplete: (id: number) => void;

  onDelete: (id: number) => void;

  onEdit: (id: number) => void;
};

const columns: {
  status: TaskStatus;
  title: string;
}[] = [
  {
    status: "TODO",
    title: "TODO",
  },
  {
    status: "IN_PROGRESS",
    title: "IN PROGRESS",
  },
  {
    status: "DONE",
    title: "DONE",
  },
];

export function TaskBoard({
  tasks,
  onComplete,
  onDelete,
  onEdit,
}: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {columns.map((column) => (
        <TaskColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks}
          onComplete={onComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}