// Cliente: dispara el envío de mail branded (vía /api/send-email → Resend).
// Reemplaza al viejo src/lib/web3forms.ts.
export type NotifyResult = { ok: boolean; message: string };

async function postToSendEmail(payload: Record<string, unknown>): Promise<NotifyResult> {
  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as NotifyResult;
    if (!res.ok || !data.ok) {
      return { ok: false, message: data.message || "No pudimos enviar el mail. Probá de nuevo." };
    }
    return { ok: true, message: "¡Listo! Te contactaremos pronto." };
  } catch {
    return { ok: false, message: "Error de conexión. Probá de nuevo en unos minutos." };
  }
}

export function notifyContact(fields: {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
}) {
  return postToSendEmail({ kind: "contact", ...fields });
}

export function notifyBooking(fields: {
  nombre: string;
  email: string;
  servicio: string;
  fecha: string;
  hora: string;
  mensaje?: string;
}) {
  return postToSendEmail({ kind: "booking", ...fields });
}
