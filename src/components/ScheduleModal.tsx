import { useEffect, useMemo, useState, type FormEvent } from "react";
import Modal from "./Modal";
import { notifyBooking } from "../lib/notify";
import {
  createBooking,
  fetchBlockedDates,
  fetchBookedSlots,
  SERVICES,
  TIME_SLOTS,
  type BookedSlots,
} from "../lib/scheduling";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

type Status = "idle" | "sending" | "success" | "error";

function toISODate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function startOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function capitalizeFirst(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function buildMonthCells(year: number, month: number) {
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array.from({ length: startWeekday }, () => null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(day);
  return cells;
}

export default function ScheduleModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState<"datetime" | "lead">("datetime");

  const today = useMemo(() => startOfToday(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [bookedSlots, setBookedSlots] = useState<BookedSlots>({});
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoadingSlots(true);
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    const start = toISODate(viewYear, viewMonth, 1);
    const end = toISODate(viewYear, viewMonth, lastDay);
    Promise.all([fetchBookedSlots(start, end), fetchBlockedDates(start, end)])
      .then(([slots, blocked]) => {
        setBookedSlots(slots);
        setBlockedDates(blocked);
      })
      .finally(() => setLoadingSlots(false));
  }, [open, viewYear, viewMonth]);

  function close() {
    setOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setSelectedDate(null);
      setSelectedTime(null);
      setStep("datetime");
    }, 300);
  }

  function changeMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function isPastDate(year: number, month: number, day: number) {
    return new Date(year, month, day) < today;
  }

  function isWeekend(year: number, month: number, day: number) {
    const weekday = new Date(year, month, day).getDay();
    return weekday === 0 || weekday === 6;
  }

  function selectDay(day: number) {
    const iso = toISODate(viewYear, viewMonth, day);
    setSelectedDate(iso);
    setSelectedTime(null);
  }

  const cells = useMemo(() => buildMonthCells(viewYear, viewMonth), [viewYear, viewMonth]);
  const occupiedForSelected = selectedDate ? bookedSlots[selectedDate] ?? [] : [];

  const selectedDateLabel = selectedDate
    ? capitalizeFirst(
        new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(
          new Date(`${selectedDate}T00:00:00`)
        )
      )
    : "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const [bookingResult] = await Promise.all([
      createBooking({
        fecha: selectedDate,
        hora: selectedTime,
        nombre: data.nombre,
        email: data.email,
        servicio: data.servicio,
        mensaje: data.mensaje || undefined,
      }),
      notifyBooking({
        nombre: data.nombre,
        email: data.email,
        servicio: data.servicio,
        fecha: selectedDate,
        hora: selectedTime,
        mensaje: data.mensaje || undefined,
      }),
    ]);

    if (bookingResult.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(bookingResult.message);
      // El horario pudo haber sido tomado justo ahora: refrescamos disponibilidad.
      if (selectedDate) {
        fetchBookedSlots(selectedDate, selectedDate).then((fresh) =>
          setBookedSlots((prev) => ({ ...prev, ...fresh }))
        );
      }
      setSelectedTime(null);
      setStep("datetime");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-pointer rounded-[20px] bg-white px-5.5 py-6.5 text-left text-ink hover:text-ink"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-soft text-lg text-accent">
          📅
        </div>
        <p className="mb-2 text-[15px] font-bold">Agenda una reunión</p>
        <p className="mb-4 text-[12.5px] text-muted-2">Si preferís, coordinamos una llamada.</p>
        <span className="text-[13px] font-bold text-accent">Agendar llamada →</span>
      </button>

      <Modal open={open} onClose={close} title="Agendar una reunión" size="lg" tone="dark">
        {status === "success" ? (
          <div className="px-7 py-14 text-center">
            <p className="mb-3 text-3xl">✓</p>
            <p className="mb-1.5 text-lg font-extrabold">¡Reunión agendada!</p>
            <p className="text-[13.5px] text-white/60">
              {selectedDateLabel} a las {selectedTime} hs. Te confirmamos por email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Paso 1: fecha y horario */}
            <div className={step === "datetime" ? "contents" : "hidden"}>
              <div className="grid grid-cols-[1fr_220px] max-[720px]:grid-cols-1">
              {/* Calendario */}
              <div className="p-7 max-[480px]:p-5.5">
                <div className="mb-5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    aria-label="Mes anterior"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    ‹
                  </button>
                  <p className="text-[15px] font-bold">
                    {MONTHS[viewMonth]} {viewYear}
                  </p>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label="Mes siguiente"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                  >
                    ›
                  </button>
                </div>

                <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-semibold text-white/40">
                  {WEEKDAYS.map((w) => (
                    <div key={w}>{w}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1">
                  {cells.map((day, i) => {
                    if (day === null) return <div key={`pad-${i}`} />;
                    const iso = toISODate(viewYear, viewMonth, day);
                    const past = isPastDate(viewYear, viewMonth, day);
                    const weekend = isWeekend(viewYear, viewMonth, day);
                    const occupied = bookedSlots[iso]?.length ?? 0;
                    const fullyBooked = occupied >= TIME_SLOTS.length;
                    const blocked = blockedDates.has(iso);
                    const disabled = past || weekend || fullyBooked || blocked;
                    const isSelected = selectedDate === iso;

                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDay(day)}
                        title={blocked ? "No disponible" : undefined}
                        className={`relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold ${
                          isSelected
                            ? "bg-accent text-white"
                            : disabled
                              ? "cursor-not-allowed text-white/25 line-through"
                              : "cursor-pointer text-white hover:bg-white/10"
                        }`}
                      >
                        {day}
                        {!disabled && occupied > 0 && !isSelected && (
                          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Horarios */}
              <div className="border-t border-white/10 p-7 max-[720px]:p-5.5 min-[721px]:border-l min-[721px]:border-t-0">
                {!selectedDate ? (
                  <p className="text-[13px] text-white/50">Elegí un día para ver los horarios.</p>
                ) : loadingSlots ? (
                  <p className="text-[13px] text-white/50">Cargando disponibilidad…</p>
                ) : (
                  <div className="flex max-h-70 flex-col gap-2 overflow-y-auto pr-1">
                    {TIME_SLOTS.map((slot) => {
                      const taken = occupiedForSelected.includes(slot);
                      const isSelected = selectedTime === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={taken}
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-xl border py-2.5 text-[13px] font-semibold ${
                            isSelected
                              ? "border-accent bg-accent text-white"
                              : taken
                                ? "cursor-not-allowed border-white/10 text-white/25 line-through"
                                : "cursor-pointer border-white/15 text-white hover:border-accent"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Resumen + continuar */}
            <div className="border-t border-white/10 p-7 max-[480px]:p-5.5">
              <p className="mb-4 text-[13.5px] text-white/70">
                {selectedDate && selectedTime ? (
                  <>
                    Tu reunión sería el <strong className="text-white">{selectedDateLabel}</strong> a las{" "}
                    <strong className="text-white">{selectedTime} hs</strong>.
                  </>
                ) : (
                  "Elegí día y horario arriba para continuar."
                )}
              </p>

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep("lead")}
                className="w-full cursor-pointer rounded-full bg-accent py-3 text-sm font-bold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continuar →
              </button>
            </div>
            </div>

            {/* Paso 2: datos del lead */}
            <div className={step === "lead" ? "border-t border-white/10 p-7 max-[480px]:p-5.5" : "hidden"}>
              <button
                type="button"
                onClick={() => setStep("datetime")}
                className="mb-4 flex cursor-pointer items-center gap-1 text-[12.5px] font-semibold text-white/60 hover:text-white"
              >
                ‹ Cambiar fecha y horario
              </button>

              <p className="mb-4 text-[13.5px] text-white/70">
                Tu reunión sería el{" "}
                <strong className="text-white">{selectedDateLabel}</strong> a las{" "}
                <strong className="text-white">{selectedTime} hs</strong>.
              </p>

              <div className="grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
                <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
                  Nombre
                  <input
                    required
                    name="nombre"
                    type="text"
                    className="rounded-xl border border-white/15 bg-transparent px-3.5 py-2.5 text-sm font-normal text-white focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
                  Email
                  <input
                    required
                    name="email"
                    type="email"
                    className="rounded-xl border border-white/15 bg-transparent px-3.5 py-2.5 text-sm font-normal text-white focus:border-accent focus:outline-none"
                  />
                </label>
              </div>

              <label className="mt-3 flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
                ¿Qué servicio necesitás?
                <select
                  required
                  name="servicio"
                  defaultValue=""
                  className="rounded-xl border border-white/15 bg-panel px-3.5 py-2.5 text-sm font-normal text-white focus:border-accent focus:outline-none"
                >
                  <option value="" disabled>
                    Elegí una opción
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>

              <label className="mt-3 flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
                Contanos brevemente qué necesitás (opcional)
                <textarea
                  name="mensaje"
                  rows={2}
                  className="resize-none rounded-xl border border-white/15 bg-transparent px-3.5 py-2.5 text-sm font-normal text-white focus:border-accent focus:outline-none"
                />
              </label>

              {status === "error" && (
                <p className="mt-3 text-[12.5px] font-semibold text-red-400">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "sending" || !selectedDate || !selectedTime}
                className="mt-4 w-full cursor-pointer rounded-full bg-accent py-3 text-sm font-bold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "sending" ? "Enviando…" : "Confirmar solicitud"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
