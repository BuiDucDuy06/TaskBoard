type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({
  onReset,
}: EmptyStateProps) {
  return (
    <div className="mb-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-14 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-xl">
        🔍
      </div>

      <h2 className="text-lg font-semibold text-white">
        No tasks found
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        No task matches your current filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-indigo-500"
      >
        Reset filters
      </button>
    </div>
  );
}