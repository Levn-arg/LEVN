import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "md" | "lg";
};

// Clases compartidas por los formularios de los modales, para que coincidan
// con el resto de la página.
export const fieldLabel = "flex flex-col gap-2 text-sm font-bold text-ink";
export const fieldInput =
  "min-h-13 rounded-[14px] border border-ink/12 bg-pearl/60 px-4 text-base font-medium text-ink placeholder:text-muted-3 focus:border-accent focus:bg-white focus:outline-none";
export const primaryButton =
  "btn inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-0 bg-accent px-6 text-[17px] font-bold text-white shadow-[0_16px_32px_-14px_rgba(108,60,224,0.75)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none";

export function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SuccessMessage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 px-2 py-10 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
      <p className="m-0 text-[28px] font-extrabold tracking-[-0.03em]">{title}</p>
      <p className="m-0 text-[17px] leading-normal text-muted">{children}</p>
    </div>
  );
}

export default function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
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
      <div className="absolute inset-0 bg-panel/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-[28px] border border-ink/7 bg-white text-ink shadow-[0_40px_80px_-40px_rgba(108,60,224,0.55),0_2px_8px_rgba(23,18,37,0.08)] max-[480px]:rounded-3xl ${
          size === "lg" ? "max-w-200" : "max-w-130 p-8 max-[480px]:p-5"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-5 right-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-accent-soft text-accent transition-colors hover:bg-accent hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
