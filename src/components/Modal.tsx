import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg";
  tone?: "light" | "dark";
};

export default function Modal({ open, onClose, title, children, size = "md", tone = "light" }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fade-in_0.2s_ease]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto shadow-[0_30px_60px_rgba(23,18,37,0.3)] max-[480px]:p-5.5 ${
          size === "lg" ? "max-w-190 rounded-[28px] p-0" : "max-w-110 rounded-[24px] p-7"
        } ${tone === "dark" ? "bg-panel text-white" : "bg-white text-ink"}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className={`absolute right-5 top-5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full ${
            tone === "dark"
              ? "text-white/60 hover:bg-white/10 hover:text-white"
              : "text-muted-2 hover:bg-cream hover:text-ink"
          }`}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
