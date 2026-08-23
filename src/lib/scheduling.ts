import { supabase, supabaseConfigured } from "./supabase";

export const TIME_SLOTS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export const INDUSTRIES = [
  "Comercio con clientela",
  "Servicios profesionales",
  "Inmobiliaria o concesionaria",
  "Distribuidora",
  "Rubro de turno (estética, salud, peluquería)",
  "Otro",
];

export type BookedSlots = Record<string, string[]>;

/** Trae los horarios ya ocupados entre dos fechas (YYYY-MM-DD), sin exponer datos del lead. */
export async function fetchBookedSlots(startDate: string, endDate: string): Promise<BookedSlots> {
  if (!supabase) return {};

  const { data, error } = await supabase
    .from("booked_slots")
    .select("fecha, hora")
    .gte("fecha", startDate)
    .lte("fecha", endDate);

  if (error || !data) return {};

  const byDate: BookedSlots = {};
  for (const row of data as { fecha: string; hora: string }[]) {
    const hora = row.hora.slice(0, 5);
    (byDate[row.fecha] ??= []).push(hora);
  }
  return byDate;
}

/** Trae las fechas (YYYY-MM-DD) bloqueadas por completo entre dos fechas (feriados, vacaciones, etc.). */
export async function fetchBlockedDates(startDate: string, endDate: string): Promise<Set<string>> {
  if (!supabase) return new Set();

  const { data, error } = await supabase
    .from("blocked_dates")
    .select("fecha")
    .gte("fecha", startDate)
    .lte("fecha", endDate);

  if (error || !data) return new Set();

  return new Set((data as { fecha: string }[]).map((row) => row.fecha));
}

export type BookingInput = {
  fecha: string;
  hora: string;
  nombre: string;
  email: string;
  rubro: string;
  mensaje?: string;
};

export type MutationResult = { ok: boolean; message: string };

export async function createBooking(input: BookingInput): Promise<MutationResult> {
  if (!supabaseConfigured || !supabase) {
    return {
      ok: false,
      message: "El calendario todavía no está configurado. Escribinos por WhatsApp mientras tanto.",
    };
  }

  const { error } = await supabase.from("bookings").insert(input);

  if (!error) return { ok: true, message: "¡Reunión agendada!" };

  // Violación del UNIQUE(fecha, hora): alguien más tomó ese horario recién.
  if (error.code === "23505") {
    return { ok: false, message: "Ese horario ya fue reservado. Elegí otro, por favor." };
  }
  return { ok: false, message: "No pudimos agendar la reunión. Probá de nuevo." };
}

export type LeadInput = {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
};

export async function createLead(input: LeadInput): Promise<MutationResult> {
  if (!supabaseConfigured || !supabase) {
    return { ok: true, message: "" }; // no bloquea el envío por email si Supabase no está configurado
  }

  const { error } = await supabase.from("leads").insert(input);
  if (error) return { ok: false, message: "No pudimos guardar tu consulta, pero seguimos con el envío." };
  return { ok: true, message: "" };
}
