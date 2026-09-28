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
  "min-h-13 rounded-[14px] border border-ink/10 bg-white px-4 text-base font-medium text-ink shadow-[0_1px_2px_rgba(23,18,37,0.04)] transition-[border-color,box-shadow] placeholder:text-muted-3 focus:border-accent focus:shadow-[0_0_0_4px_rgba(108,60,224,0.15)] focus:outline-none";
export const primaryButton =
  "btn inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2.5 rounded-2xl border-0 bg-accent px-6 text-[17px] font-bold text-white shadow-[0_16px_32px_-14px_rgba(108,60,224,0.75)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none";

export function ArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Encabezado de los modales: ícono violeta, etiqueta y título con el
// fragmento final resaltado, como en los títulos de la página.
export function ModalHeader({
  icon,
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  highlight: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col gap-3 pr-12">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-accent text-white shadow-[0_10px_24px_-10px_rgba(108,60,224,0.8)]">{icon}</span>
        <span className="text-[13px] font-extrabold tracking-widest text-accent uppercase">{eyebrow}</span>
      </div>
      <p className="m-0 text-[34px] leading-[1.05] font-extrabold tracking-[-0.03em] max-[480px]:text-[28px]">
        {title} <span className="text-accent">{highlight}</span>
      </p>
      <p className="m-0 text-[17px] leading-normal text-muted">{subtitle}</p>
    </div>
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
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-[32px] border border-white/60 bg-pearl text-ink shadow-[0_50px_100px_-40px_rgba(21,18,31,0.6),0_2px_8px_rgba(23,18,37,0.08)] max-[480px]:rounded-[26px] ${
          size === "lg" ? "max-w-210" : "max-w-135 p-9 max-[480px]:p-5"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-6 right-6 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/8 bg-white text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white max-[480px]:top-4 max-[480px]:right-4"
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
