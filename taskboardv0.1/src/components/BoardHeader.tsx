type BoardHeaderProps = {
  title: string;
  onNewTask: () => void;
};

export function BoardHeader({ title, onNewTask }: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>

      <button
        type="button"
        onClick={onNewTask}
        className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
      >
        + New Task
      </button>
    </div>
  );
}
