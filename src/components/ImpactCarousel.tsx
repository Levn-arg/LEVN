import { useState } from "react";

type Stat = { label: string; value: string };

type Feature = {
  id: string;
  icon: string;
  angle: number;
  iconColorClass: string;
  title: string;
  metricLabel: string;
  metricValue: string;
  metricVs: string;
  sparkPath: string;
  stats: Stat[];
};

const FEATURES: Feature[] = [
  {
    id: "whatsapp",
    icon: "☎",
    angle: -40,
    iconColorClass: "text-whatsapp",
    title: "Reactivación por WhatsApp",
    metricLabel: "Consultas nuevas",
    metricValue: "+68%",
    metricVs: "vs. mes anterior",
    sparkPath: "M2 28 C 40 10, 60 30, 90 18 S 150 4, 218 8",
    stats: [
      { label: "Ventas generadas", value: "+42%" },
      { label: "Tiempo ahorrado", value: "120h/mes" },
      { label: "Tareas automáticas", value: "86%" },
    ],
  },
  {
    id: "landing",
    icon: "✉",
    angle: 50,
    iconColorClass: "text-accent",
    title: "Landing + captación",
    metricLabel: "Leads capturados",
    metricValue: "+54%",
    metricVs: "vs. mes anterior",
    sparkPath: "M2 24 C 40 26, 60 6, 90 14 S 160 26, 218 6",
    stats: [
      { label: "Formularios completados", value: "312" },
      { label: "Tiempo de respuesta", value: "2 min" },
      { label: "Conversión a venta", value: "31%" },
    ],
  },
  {
    id: "reportes",
    icon: "▦",
    angle: 140,
    iconColorClass: "text-accent",
    title: "Reportes automáticos",
    metricLabel: "Horas ahorradas",
    metricValue: "120h",
    metricVs: "al mes",
    sparkPath: "M2 20 C 40 4, 70 30, 110 16 S 170 2, 218 18",
    stats: [
      { label: "Reportes generados", value: "48" },
      { label: "Fuentes conectadas", value: "6" },
      { label: "Errores manuales", value: "-90%" },
    ],
  },
  {
    id: "turnos",
    icon: "▤",
    angle: 220,
    iconColorClass: "text-accent",
    title: "Turnos + recordatorios",
    metricLabel: "Ausencias evitadas",
    metricValue: "-64%",
    metricVs: "vs. mes anterior",
    sparkPath: "M2 10 C 40 28, 70 8, 110 20 S 180 30, 218 12",
    stats: [
      { label: "Turnos confirmados", value: "94%" },
      { label: "Recordatorios enviados", value: "1.2k" },
      { label: "Reagendas automáticas", value: "37" },
    ],
  },
];

const ICON_POSITION_CLASSES = [
  "left-[6px] top-[2px]",
  "right-0 top-[30px]",
  "right-[-6px] bottom-[20px]",
  "left-[16px] bottom-[-6px]",
];

export default function ImpactCarousel() {
  const [selected, setSelected] = useState(0);
  const feature = FEATURES[selected];

  return (
    <div className="flex items-start gap-5 max-[900px]:w-full max-[900px]:flex-wrap">
      <div
        key={feature.id}
        className="w-[280px] flex-none rounded-[22px] bg-white/55 p-5 shadow-[0_20px_40px_rgba(90,50,180,0.12)] backdrop-blur-md animate-[fade-in_0.35s_ease] max-[480px]:w-full"
      >
        <div className="mb-0.5 flex items-center justify-between text-[13px] font-bold">
          <span>Resumen de impacto</span>
          <span className="font-extrabold text-accent">+</span>
        </div>
        <p className="mb-3.5 text-[11px] text-muted-2">{feature.title}</p>

        <div className="mb-3.5 rounded-2xl bg-white p-4">
          <p className="mb-1.5 text-xs text-muted-2">{feature.metricLabel}</p>
          <p className="text-[26px] font-extrabold text-accent">
            {feature.metricValue}
          </p>
          <p className="mb-2 text-[11px] text-muted-3">{feature.metricVs}</p>
          <svg
            width="100%"
            height="34"
            viewBox="0 0 220 34"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d={feature.sparkPath}
              fill="none"
              stroke="#6C3CE0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex gap-2">
          {feature.stats.map((stat) => (
            <div key={stat.label} className="flex-1 rounded-2xl bg-white px-2 py-2.5">
              <p className="text-[10px] leading-tight text-muted-3">
                {stat.label}
              </p>
              <p className="mt-1 text-[15px] font-extrabold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="relative mt-[70px] h-[200px] w-[200px] flex-none max-[900px]:mt-6"
        role="radiogroup"
        aria-label="Elegí una funcionalidad para ver su impacto"
      >
        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-ink/25" />

        <div
          className="absolute left-1/2 top-1/2 h-[86px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-[#8358F0] to-[#5B2FCB] shadow-[0_20px_30px_rgba(90,50,180,0.35)] transition-transform duration-500 ease-out"
          style={{ transform: `translate(-50%, -50%) rotate(${feature.angle * 0.08}deg)` }}
          aria-hidden="true"
        />

        <div
          className="absolute left-1/2 top-1/2 h-0 w-0 transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${feature.angle}deg)` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-[92px] rounded-full bg-accent shadow-[0_0_0_4px_rgba(108,60,224,0.18)]" />
        </div>

        {FEATURES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={index === selected}
            aria-label={item.title}
            onClick={() => setSelected(index)}
            className={`absolute flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm shadow-[0_6px_14px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer ${ICON_POSITION_CLASSES[index]} ${item.iconColorClass} ${
              index === selected
                ? "scale-125 ring-2 ring-accent ring-offset-2 ring-offset-cream"
                : "opacity-80 hover:opacity-100 hover:scale-110"
            }`}
          >
            {item.icon}
          </button>
        ))}

        <div className="absolute right-[-16px] top-[-14px] text-xl text-white" aria-hidden="true">
          ✦
        </div>
      </div>
    </div>
  );
}
