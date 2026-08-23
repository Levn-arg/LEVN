-- Esquema para el formulario de contacto y el calendario de reuniones de LEVN.
-- Correr una sola vez en el SQL Editor del proyecto de Supabase.

-- ── leads: envíos del formulario de contacto ──────────────────────────────
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  telefono text,
  mensaje text not null
);

alter table leads enable row level security;

-- Cualquiera puede crear un lead (envío del formulario público).
create policy "public puede insertar leads"
  on leads for insert
  to anon
  with check (true);

-- Nadie puede leer leads con la clave pública: solo vos, desde el dashboard
-- de Supabase (que usa tu service role / tu sesión de owner).

-- ── bookings: reuniones agendadas ──────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  fecha date not null,
  hora time not null,
  nombre text not null,
  email text not null,
  rubro text not null,
  mensaje text,
  unique (fecha, hora)
);

alter table bookings enable row level security;

-- Cualquiera puede agendar (insert). La restricción UNIQUE(fecha, hora)
-- evita que dos personas reserven el mismo horario.
create policy "public puede insertar bookings"
  on bookings for insert
  to anon
  with check (true);

-- Nadie puede leer la tabla bookings directamente con la clave pública
-- (protege nombre/email de quien agendó). La disponibilidad se expone
-- solo a través de la vista de abajo.

-- ── booked_slots: vista pública sin datos personales ──────────────────────
-- Las vistas en Postgres se ejecutan con los permisos de quien las crea
-- (no las de quien consulta), así que esta vista puede exponer fecha/hora
-- igual que bookings no tiene policy de SELECT pública.
create or replace view booked_slots as
  select fecha, hora from bookings;

grant select on booked_slots to anon;

-- ── blocked_dates: días completos no disponibles (feriados, vacaciones, etc.) ──
-- Se administra a mano desde el SQL Editor o el Table Editor de Supabase
-- (con tu sesión de owner) — el público solo puede leerla, nunca escribirla.
create table if not exists blocked_dates (
  fecha date primary key,
  motivo text
);

alter table blocked_dates enable row level security;

-- Cualquiera puede leer qué fechas están bloqueadas (para pintarlas
-- deshabilitadas en el calendario), pero nadie puede insertar/editar/borrar
-- con la clave pública: no se define ninguna policy de insert/update/delete,
-- así que quedan bloqueadas por defecto.
create policy "public puede leer blocked_dates"
  on blocked_dates for select
  to anon
  using (true);

-- Prueba: bloquea el segundo jueves de septiembre de 2026.
insert into blocked_dates (fecha, motivo)
values ('2026-09-10', 'Prueba de bloqueo de fecha')
on conflict (fecha) do nothing;
