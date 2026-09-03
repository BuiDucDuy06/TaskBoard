type BoardSummaryProps = {
  total: number;
  done: number;
  overdue: number;
  high: number;
};

export function BoardSummary({
  total,
  done,
  overdue,
  high,
}: BoardSummaryProps) {
  return (
    <div className="flex gap-3">
      <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
        <span className="text-xs text-slate-400">
          Total
        </span>

        <span className="ml-2 font-semibold">
          {total}
        </span>
      </div>

      <div className="rounded-xl border border-emerald-900/50 bg-emerald-950/30 px-4 py-2">
        <span className="text-xs text-emerald-400">
          Done
        </span>

        <span className="ml-2 font-semibold text-emerald-300">
          {done}
        </span>
      </div>

      <div className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-2">
        <span className="text-xs text-red-400">
          Overdue
        </span>

        <span className="ml-2 font-semibold text-red-300">
          {overdue}
        </span>
      </div>

      <div className="rounded-xl border border-orange-900/50 bg-orange-950/30 px-4 py-2">
        <span className="text-xs text-orange-400">
          High
        </span>

        <span className="ml-2 font-semibold text-orange-300">
          {high}
        </span>
      </div>
    </div>
  );
}