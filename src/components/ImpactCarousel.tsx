import { useEffect, useState, type ReactNode } from "react";

type PanelId = "whatsapp" | "chart" | "cal" | "db";

const PANELS: { id: PanelId; icon: string; color: string }[] = [
  { id: "whatsapp", icon: "📱", color: "#25D366" },
  { id: "chart", icon: "📈", color: "#6C3CE0" },
  { id: "cal", icon: "📅", color: "#6C3CE0" },
  { id: "db", icon: "🗄", color: "#6C3CE0" },
];

const ORBIT_CENTERS: [number, number][] = [
  [80, 8],
  [150, 80],
  [80, 152],
  [10, 80],
];

const ROTATE_MS = 45000;

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 rounded-[10px] bg-[#F7F5FC] px-2.5 py-2">
      <p className="text-[9px] text-muted-2">{label}</p>
      <p className="text-[13px] font-extrabold">{value}</p>
    </div>
  );
}

function SidebarNav({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="flex flex-none flex-col gap-3">
      <div>
        <p className="text-[13px] font-extrabold">{title}</p>
        <p className="text-[9.5px] text-muted-3">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-1.5 text-[10px] font-semibold">
        {items.map((item, i) => (
          <div
            key={item}
            className={
              i === 0
                ? "rounded-lg bg-accent-soft px-2 py-1.5 text-accent"
                : "px-2 py-1.5 text-muted-2"
            }
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsappPanel() {
  return (
    <div className="flex flex-col items-stretch gap-4 min-[560px]:flex-row">
      <div className="flex w-full flex-none flex-col gap-3 min-[560px]:w-30">
        <SidebarNav
          title="Chatbot IA"
          subtitle="Abril 2026"
          items={["💬 Conversaciones", "👤 Contactos", "⚡ Automatizaciones", "⚙ Configuración"]}
        />
        <div className="mt-auto rounded-[10px] bg-[#F7F5FC] p-2 text-[9px] text-muted-2">
          <p className="mb-1 font-bold text-ink">Actividad en vivo</p>
          Nuevo mensaje de Sofía T.
          <br />
          Derivado a vendedor
          <br />
          Calificación positiva
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex-1 rounded-[14px] border border-[#EFEDF5] p-3">
          <div className="mb-2.5 flex items-center gap-1.5 text-[10.5px] font-bold">
            <span className="text-whatsapp">📱</span> WhatsApp{" "}
            <span className="text-[9px] font-medium text-muted-3">Conectado</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="ml-auto max-w-[75%] rounded-[10px_10px_2px_10px] bg-[#F1EEF9] px-2.5 py-1.5 text-[10px]">
              ¿Tienen turno para mañana?
            </p>
            <p className="max-w-[80%] rounded-[10px_10px_10px_2px] bg-accent-soft px-2.5 py-1.5 text-[10px] text-[#3d3750]">
              <b>Bot IA</b> — Escribiendo…
            </p>
            <p className="max-w-[85%] rounded-[10px_10px_10px_2px] bg-accent-soft px-2.5 py-1.5 text-[10px] text-[#3d3750]">
              ¡Sí! Tenemos disponibilidad mañana. ¿Preferís por la mañana o por la tarde?
            </p>
            <p className="ml-auto max-w-[75%] rounded-[10px_10px_2px_10px] bg-[#F1EEF9] px-2.5 py-1.5 text-[10px]">
              Por la tarde, después de las 17hs
            </p>
            <p className="max-w-[85%] rounded-[10px_10px_10px_2px] bg-accent-soft px-2.5 py-1.5 text-[10px] text-[#3d3750]">
              Perfecto, te paso los horarios disponibles: <b>17:00 · 18:00 · 19:00</b>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <MiniStat label="Conversaciones automatizadas" value="+38%" />
          <MiniStat label="Calificación de leads" value="+62%" />
          <MiniStat label="Derivados al vendedor" value="+41%" />
        </div>
      </div>
    </div>
  );
}

function ChartPanel() {
  return (
    <div className="flex flex-col items-stretch gap-4 min-[560px]:flex-row">
      <div className="flex w-full flex-none flex-col gap-3 min-[560px]:w-30">
        <SidebarNav
          title="Dashboard analítico"
          subtitle="Abril 2026"
          items={["📈 Resumen", "📣 Campañas", "👥 Audiencias", "🎯 Conversiones"]}
        />
        <div className="mt-auto rounded-[10px] bg-[#F7F5FC] p-2 text-[9px] text-muted-2">
          <p className="mb-1 font-bold text-ink">Actividad reciente</p>
          Nueva campaña lanzada
          <br />
          Leads calificados
          <br />
          Reporte semanal generado
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex gap-2">
          <MiniStat label="Ingresos del mes" value="$128.000" />
          <MiniStat label="Clientes nuevos" value="47" />
          <MiniStat label="Tasa conversión" value="68%" />
        </div>
        <div className="flex-1 rounded-[14px] border border-[#EFEDF5] p-3">
          <p className="mb-2 text-[10.5px] font-bold">Ingresos anuales · 2026</p>
          <svg width="100%" height="60" viewBox="0 0 260 60" aria-hidden="true">
            <path
              d="M2 52 L 40 44 L 78 40 L 116 30 L 154 24 L 192 14 L 230 6 L 258 4"
              fill="none"
              stroke="#6C3CE0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex gap-2 text-[9px] text-muted-2">
          <MiniStat label="Directo" value="42%" />
          <MiniStat label="Orgánico" value="28%" />
          <MiniStat label="Referidos" value="18%" />
        </div>
      </div>
    </div>
  );
}

function CalPanel() {
  const appointments: { time: string; label: string; status: "Confirmado" | "Pendiente" }[] = [
    { time: "10:30", label: "Sofía R. — Limpieza dental", status: "Confirmado" },
    { time: "11:15", label: "Juan P. — Control general", status: "Confirmado" },
    { time: "12:00", label: "Ana G. — Blanqueamiento", status: "Pendiente" },
    { time: "15:30", label: "Lucas M. — Ortodoncia", status: "Confirmado" },
  ];

  return (
    <div className="flex flex-col items-stretch gap-4 min-[560px]:flex-row">
      <div className="flex w-full flex-none flex-col gap-3 min-[560px]:w-27.5">
        <SidebarNav
          title="Panel de control"
          subtitle="Clínica Bienestar"
          items={["🏠 Resumen", "📅 Turnos", "👥 Clientes", "💳 Pagos"]}
        />
        <div className="mt-auto rounded-[10px] bg-accent p-2.5 text-[9px] text-white">
          <p className="mb-1.5 font-bold">Llevá tu negocio al siguiente nivel</p>
          <p className="rounded-md bg-white px-2 py-1 text-center font-bold text-accent">Ver planes</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex gap-2">
          <MiniStat label="Turnos hoy" value="12" />
          <MiniStat label="Clientes activos" value="230" />
          <MiniStat label="Turnos completados" value="85%" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#EFEDF5] p-3">
          <p className="mb-0.5 text-[10.5px] font-bold">Próximos turnos</p>
          {appointments.map((a) => (
            <div key={a.time} className="flex justify-between text-[9.5px] text-[#3d3750]">
              <span>
                {a.time} {a.label}
              </span>
              <span
                className={`font-bold ${a.status === "Confirmado" ? "text-[#1fae5f]" : "text-[#d99a2b]"}`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DbPanel() {
  const alerts: { label: string; status: "Crítico" | "Bajo" }[] = [
    { label: "Cable HDMI 2m — 3 unidades", status: "Crítico" },
    { label: "Detergente Líquido — 6 unidades", status: "Bajo" },
    { label: "Resma A4 — 8 unidades", status: "Bajo" },
    { label: "Auriculares USB — 5 unidades", status: "Crítico" },
  ];

  return (
    <div className="flex flex-col items-stretch gap-4 min-[560px]:flex-row">
      <div className="flex w-full flex-none flex-col gap-3 min-[560px]:w-27.5">
        <SidebarNav
          title="Gestión de inventario"
          subtitle="Base de datos"
          items={["🗄 Resumen", "📦 Productos", "📥 Entradas", "🔔 Alertas"]}
        />
        <div className="mt-auto rounded-[10px] bg-[#F7F5FC] p-2 text-[9px] text-muted-2">
          <p className="mb-1 font-bold text-ink">
            Sincronización activa <span className="text-[#1fae5f]">● En línea</span>
          </p>
          Excel - Stock
          <br />
          Base de datos central
          <br />
          Ventas (Sistema)
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex gap-2">
          <MiniStat label="Productos totales" value="1.245" />
          <MiniStat label="Stock total" value="8.430" />
          <MiniStat label="Productos bajos" value="23" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 rounded-[14px] border border-[#EFEDF5] p-3">
          <p className="mb-0.5 text-[10.5px] font-bold">Alertas de stock</p>
          {alerts.map((a) => (
            <div key={a.label} className="flex justify-between text-[9.5px] text-[#3d3750]">
              <span>{a.label}</span>
              <span
                className={`font-bold ${a.status === "Crítico" ? "text-[#d1453b]" : "text-[#d99a2b]"}`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PANEL_CONTENT: Record<PanelId, ReactNode> = {
  whatsapp: <WhatsappPanel />,
  chart: <ChartPanel />,
  cal: <CalPanel />,
  db: <DbPanel />,
};

function orbitIconStyle(index: number, active: number, color: string): React.CSSProperties {
  const isActive = active === index;
  const slot = (index - active + 4) % 4;
  const [cx, cy] = ORBIT_CENTERS[slot];
  const size = isActive ? 42 : 32;

  return {
    left: cx - size / 2,
    top: cy - size / 2,
    width: size,
    height: size,
    fontSize: isActive ? 17 : 13,
    color,
    border: isActive ? "2px solid #6C3CE0" : "none",
    boxShadow: isActive
      ? "0 0 0 5px rgba(108,60,224,.22), 0 8px 16px rgba(60,30,140,.2)"
      : "0 6px 14px rgba(60,30,140,.15)",
  };
}

export default function ImpactCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % PANELS.length), ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <div className="flex min-w-0 w-full flex-nowrap items-start gap-6 max-[900px]:justify-start min-[901px]:w-auto">
      <div className="w-full min-w-0 rounded-[20px] bg-white p-5 shadow-[0_20px_45px_rgba(60,30,140,0.12)] min-[901px]:flex-[2_1_480px]">
        {PANEL_CONTENT[PANELS[active].id]}
      </div>

      <div
        className="relative hidden h-[198px] w-[174px] flex-none items-center justify-center min-[901px]:flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        role="radiogroup"
        aria-label="Elegí una vista para ver el mockup"
      >
        <svg width="182" height="182" viewBox="0 0 160 160" className="absolute right-0 bottom-0" aria-hidden="true">
          <ellipse cx="80" cy="80" rx="76" ry="42" transform="rotate(-24 80 80)" fill="none" stroke="rgba(23,18,37,.35)" strokeWidth="1.2" strokeDasharray="3 4" />
          <ellipse cx="80" cy="80" rx="76" ry="42" transform="rotate(24 80 80)" fill="none" stroke="rgba(23,18,37,.35)" strokeWidth="1.2" strokeDasharray="3 4" />
          <ellipse cx="80" cy="80" rx="50" ry="70" transform="rotate(4 80 80)" fill="none" stroke="rgba(23,18,37,.25)" strokeWidth="1.2" strokeDasharray="3 4" />
        </svg>

        <div
          className="absolute flex items-center justify-center drop-shadow-[0_10px_16px_rgba(60,30,140,0.3)]"
          style={{ left: 48, top: 49, width: 62, height: 54 }}
        >
          <img src="/images/logo-mark.png" alt="LEVN" className="h-[89px] w-[65px] object-contain" />
        </div>

        {PANELS.map((panel, index) => (
          <button
            key={panel.id}
            type="button"
            role="radio"
            aria-checked={index === active}
            aria-label={panel.id}
            onClick={() => setActive(index)}
            className="absolute z-[2] flex items-center justify-center rounded-full bg-white transition-[left,top,width,height] duration-400 ease-out cursor-pointer"
            style={orbitIconStyle(index, active, panel.color)}
          >
            {panel.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
