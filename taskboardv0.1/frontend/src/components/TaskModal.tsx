import { useEffect } from "react";
import type { ReactNode } from "react";

type TaskModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  isSubmitting?: boolean;
};

export function TaskModal({
  open,
  title,
  children,
  onClose,
  isSubmitting = false,
}: TaskModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose, isSubmitting]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl"
      >
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="task-modal-title"
            className="text-xl font-semibold text-white"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        {children}
      </div>
    </div>
  );
}