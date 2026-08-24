import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

// En SSR (Node < 22) no hay WebSocket nativo, y @supabase/supabase-js crea un
// RealtimeClient igual aunque no usemos canales realtime — le pasamos "ws"
// como transporte para que no explote al renderizar. En el browser no hace
// falta: el WebSocket nativo ya existe.
const wsTransport = import.meta.env.SSR ? (await import("ws")).default : undefined;

export const supabase = supabaseConfigured
  ? createClient(url, anonKey, wsTransport ? { realtime: { transport: wsTransport as never } } : undefined)
  : null;
