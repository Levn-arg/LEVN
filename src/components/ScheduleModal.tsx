import { useEffect, useMemo, useState, type FormEvent } from "react";
import Modal, { ArrowRight, ModalHeader, SuccessMessage, fieldInput, fieldLabel, primaryButton } from "./Modal";
import ContactOption from "./ContactOption";
import { notifyBooking } from "../lib/notify";
import {
  createBooking,
  fetchBlockedDates,
  fetchBookedSlots,
  SERVICES,
  TIME_SLOTS,
  type BookedSlots,
} from "../lib/scheduling";
import { SERVICE_LABELS_EN, useTranslations } from "../i18n/ui";
import { useLang } from "../i18n/useLang";
import { MESSAGES_EN } from "../i18n/en/pages";

type Status = "idle" | "sending" | "success" | "error";

const CALENDAR_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </svg>
);

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
  const lang = useLang();
  const m = useTranslations(lang).modal;
  const t = m.schedule;
  const monthLabel = (year: number, month: number) =>
    capitalizeFirst(new Intl.DateTimeFormat(t.locale, { month: "long", year: "numeric" }).format(new Date(year, month, 1)));
  const serviceLabel = (service: string) => (lang === "en" ? SERVICE_LABELS_EN[service] ?? service : service);
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
        new Intl.DateTimeFormat(t.locale, { weekday: "long", day: "numeric", month: "long" }).format(
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
      <ContactOption
        onClick={() => setOpen(true)}
        title={t.option}
        description={t.optionText}
        icon={<span className="[&>svg]:h-6.5 [&>svg]:w-6.5">{CALENDAR_ICON}</span>}
      />

      <Modal open={open} onClose={close} title={t.dialog} size="lg" closeLabel={m.close}>
        {status === "success" ? (
          <div className="p-8 max-[480px]:p-5">
            <SuccessMessage title={t.successTitle}>
              {selectedDateLabel} {t.summaryAt} {selectedTime} {t.hours}. {t.successText}
            </SuccessMessage>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="px-9 pt-9 max-[480px]:px-5 max-[480px]:pt-5">
              <ModalHeader
                icon={CALENDAR_ICON}
                eyebrow={step === "datetime" ? t.step1 : t.step2}
                title={step === "datetime" ? t.title1 : t.title2}
                highlight={step === "datetime" ? t.highlight1 : t.highlight2}
                subtitle={t.subtitle}
              />
            </div>

            {/* Paso 1: fecha y horario */}
            <div className={step === "datetime" ? "contents" : "hidden"}>
              <div className="m-9 mb-0 grid grid-cols-[1fr_220px] overflow-hidden rounded-3xl border border-ink/7 bg-surface shadow-[0_24px_48px_-32px_rgba(108,60,224,0.5)] max-[720px]:grid-cols-1 max-[480px]:m-5 max-[480px]:mb-0">
              {/* Calendario */}
              <div className="p-6 max-[480px]:p-4">
                <div className="mb-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    aria-label={t.prevMonth}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-accent-soft text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
                  </button>
                  <p className="m-0 text-lg font-extrabold">
                    {monthLabel(viewYear, viewMonth)}
                  </p>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label={t.nextMonth}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-accent-soft text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                  </button>
                </div>

                <div className="mb-1.5 grid grid-cols-7 text-center text-xs font-bold text-muted-2">
                  {t.weekdays.map((w) => (
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
                        title={blocked ? t.unavailable : undefined}
                        className={`relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border-0 text-sm font-bold transition-colors ${
                          isSelected
                            ? "bg-accent text-white shadow-[0_8px_18px_-8px_rgba(108,60,224,0.8)]"
                            : disabled
                              ? "cursor-not-allowed bg-transparent text-muted-3/50 line-through"
                              : "cursor-pointer bg-transparent text-ink hover:bg-accent-soft hover:text-accent-hover"
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
              <div className="border-t border-ink/7 bg-accent-soft/40 p-6 max-[720px]:p-4 min-[721px]:border-t-0 min-[721px]:border-l">
                <p className="m-0 mb-3 text-sm font-bold text-ink">{t.times}</p>
                {!selectedDate ? (
                  <p className="m-0 text-[15px] text-muted-2">{t.pickDay}</p>
                ) : loadingSlots ? (
                  <p className="m-0 text-[15px] text-muted-2">{t.loading}</p>
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
                          className={`min-h-11 rounded-[14px] border text-[15px] font-bold transition-colors ${
                            isSelected
                              ? "border-accent bg-accent text-white"
                              : taken
                                ? "cursor-not-allowed border-ink/7 bg-transparent text-muted-3/50 line-through"
                                : "cursor-pointer border-ink/12 bg-surface text-ink hover:border-accent hover:text-accent-hover"
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
            <div className="flex flex-col gap-4 p-9 max-[480px]:p-5">
              <p className="m-0 text-base text-muted">
                {selectedDate && selectedTime ? (
                  <>
                    {t.summaryPrefix} <strong className="text-ink">{selectedDateLabel}</strong> {t.summaryAt}{" "}
                    <strong className="text-ink">{selectedTime} {t.hours}</strong>.
                  </>
                ) : (
                  t.pickToContinue
                )}
              </p>

              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep("lead")}
                className={primaryButton}
              >
                {t.continue}
                <ArrowRight />
              </button>
            </div>
            </div>

            {/* Paso 2: datos del lead */}
            <div className={step === "lead" ? "flex flex-col gap-4 p-9 pt-6 max-[480px]:p-5" : "hidden"}>
              <button
                type="button"
                onClick={() => setStep("datetime")}
                className="flex min-h-11 cursor-pointer items-center gap-1.5 self-start border-0 bg-transparent p-0 text-[15px] font-bold text-accent hover:text-accent-hover"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
                {t.change}
              </button>

              <p className="m-0 rounded-2xl border border-accent/15 bg-surface px-4.5 py-3.5 text-base text-accent-hover">
                {t.summaryPrefix} <strong>{selectedDateLabel}</strong> {t.summaryAt} <strong>{selectedTime} {t.hours}</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
                <label className={fieldLabel}>
                  {m.name}
                  <input required name="nombre" type="text" autoComplete="name" className={fieldInput} />
                </label>
                <label className={fieldLabel}>
                  {m.email}
                  <input required name="email" type="email" autoComplete="email" className={fieldInput} />
                </label>
              </div>

              <label className={fieldLabel}>
                {t.service}
                <select
                  required
                  name="servicio"
                  defaultValue=""
                  className={fieldInput}
                >
                  <option value="" disabled>
                    {t.servicePlaceholder}
                  </option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {serviceLabel(service)}
                    </option>
                  ))}
                </select>
              </label>

              <label className={fieldLabel}>
                {t.message}
                <textarea name="mensaje" rows={2} className={`${fieldInput} resize-none py-3.5`} />
              </label>

              {status === "error" && <p className="m-0 text-sm font-semibold text-[#B42318] dark:text-[#FF9C94]">{lang === "en" ? MESSAGES_EN[errorMessage] ?? errorMessage : errorMessage}</p>}

              <button
                type="submit"
                disabled={status === "sending" || !selectedDate || !selectedTime}
                className={`${primaryButton} mt-2`}
              >
                {status === "sending" ? m.sending : t.submit}
                {status !== "sending" && <ArrowRight />}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
