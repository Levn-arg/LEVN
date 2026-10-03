import type { ReactNode } from "react";

type ContactOptionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

// Tarjeta de contacto sobre el panel oscuro (Formulario / Agendar llamada).
export default function ContactOption({ icon, title, description, onClick }: ContactOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-47.5 w-full cursor-pointer flex-col gap-2.5 rounded-[26px] border border-white/12 bg-white/6 p-7 text-left font-[inherit] text-cream transition-colors duration-200 hover:bg-white/12 max-[1100px]:min-h-17 max-[1100px]:flex-row max-[1100px]:items-center max-[1100px]:gap-3.5 max-[1100px]:rounded-[20px] max-[1100px]:px-4.5 max-[1100px]:py-3"
    >
      <span className="flex h-13 w-13 flex-none items-center justify-center rounded-2xl bg-white/10 max-[1100px]:h-auto max-[1100px]:w-auto max-[1100px]:bg-transparent">
        {icon}
      </span>
      <span className="flex flex-col gap-2.5 max-[1100px]:gap-0">
        <span className="mt-2.5 text-[22px] font-extrabold max-[1100px]:mt-0 max-[1100px]:text-[17px]">{title}</span>
        <span className="text-base text-ondark max-[1100px]:text-sm">{description}</span>
      </span>
    </button>
  );
}
