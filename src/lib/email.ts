// Envío de mails con el estilo de marca de LEVN, vía Resend.
// Server-only: este archivo corre en la API route (src/pages/api/send-email.ts),
// nunca en el cliente, por eso usa RESEND_API_KEY sin prefijo PUBLIC_.
import { Resend } from "resend";

// Colores/tipografía tomados de src/styles/global.css (bloque @theme) —
// mantenerlos alineados si se retocan los tokens del sitio.
const COLORS = {
  cream: "#fbf2e8",
  ink: "#171225",
  panel: "#fbf2e8",
  accent: "#6c3ce0",
  accentSoft: "#efe6fc",
  muted: "#4a4458",
  muted2: "#6a6478",
  ondark: "#b3adc4",
};
const FONT_STACK =
  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Row = { label: string; value: string };

/** Shell común: header oscuro con el nombre de marca + card clara con el contenido. */
function renderShell(opts: { eyebrow: string; title: string; rows: Row[]; note?: string }) {
  const rowsHtml = opts.rows
    .filter((r) => r.value && r.value.trim().length > 0)
    .map(
      (r) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #ece3f7;font:600 12px/1.4 ${FONT_STACK};color:${COLORS.muted2};text-transform:uppercase;letter-spacing:.03em;width:150px;vertical-align:top;">
            ${escapeHtml(r.label)}
          </td>
          <td style="padding:10px 0;border-bottom:1px solid #ece3f7;font:400 14px/1.5 ${FONT_STACK};color:${COLORS.ink};vertical-align:top;">
            ${escapeHtml(r.value).replace(/\n/g, "<br>")}
          </td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(opts.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${COLORS.cream};font:400 14px/1.5 ${FONT_STACK};color:${COLORS.ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="background:${COLORS.panel};border-radius:20px 20px 0 0;padding:22px 28px;">
                <span style="font:800 15px/1 ${FONT_STACK};color:#ffffff;letter-spacing:.02em;">LEVN</span>
                <span style="font:600 11px/1 ${FONT_STACK};color:${COLORS.ondark};text-transform:uppercase;letter-spacing:.06em;margin-left:10px;">${escapeHtml(
                  opts.eyebrow
                )}</span>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;padding:28px;">
                <h1 style="margin:0 0 18px;font:800 20px/1.3 ${FONT_STACK};color:${COLORS.ink};">
                  ${escapeHtml(opts.title)}
                </h1>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
                ${
                  opts.note
                    ? `<p style="margin:20px 0 0;font:500 13px/1.5 ${FONT_STACK};color:${COLORS.accent};background:${COLORS.accentSoft};padding:12px 14px;border-radius:12px;">${escapeHtml(
                        opts.note
                      )}</p>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border-radius:0 0 20px 20px;padding:0 28px 26px;">
                <p style="margin:0;font:400 12px/1.5 ${FONT_STACK};color:${COLORS.muted};">
                  Enviado automáticamente desde el sitio de LEVN.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type ContactEmailInput = {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
};

export function buildContactEmailHtml(input: ContactEmailInput) {
  return renderShell({
    eyebrow: "Formulario de contacto",
    title: `Nueva consulta de ${input.nombre}`,
    rows: [
      { label: "Nombre", value: input.nombre },
      { label: "Email", value: input.email },
      { label: "Teléfono", value: input.telefono ?? "" },
      { label: "Mensaje", value: input.mensaje },
    ],
    note: "Respondé directamente a este mail o desde WhatsApp — el email de contacto queda arriba.",
  });
}

export type BookingEmailInput = {
  nombre: string;
  email: string;
  servicio: string;
  fecha: string;
  hora: string;
  mensaje?: string;
};

export function buildBookingEmailHtml(input: BookingEmailInput) {
  return renderShell({
    eyebrow: "Reunión agendada",
    title: `Nueva reunión — ${input.fecha} ${input.hora} hs`,
    rows: [
      { label: "Nombre", value: input.nombre },
      { label: "Email", value: input.email },
      { label: "Servicio", value: input.servicio },
      { label: "Fecha", value: input.fecha },
      { label: "Horario", value: `${input.hora} hs` },
      { label: "Mensaje", value: input.mensaje ?? "" },
    ],
    note: "Confirmá el horario en tu calendario — el cliente ya recibió la solicitud como agendada.",
  });
}

export type SendResult = { ok: boolean; message: string };

/** Envía un email ya renderizado (HTML) usando Resend. Server-only. */
export async function sendBrandedEmail(opts: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.RESEND_TO_EMAIL || "lucasn.panadero@gmail.com";
  // onboarding@resend.dev funciona sin verificar dominio propio — apenas se
  // verifique levn.com.ar en Resend, cambiar a algo tipo "LEVN <no-reply@levn.com.ar>".
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || "LEVN <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      message: "El envío de mails todavía no está configurado (falta RESEND_API_KEY).",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    });

    if (error) {
      return { ok: false, message: error.message || "No pudimos enviar el mail. Probá de nuevo." };
    }
    return { ok: true, message: "Mail enviado." };
  } catch {
    return { ok: false, message: "Error de conexión al enviar el mail. Probá de nuevo en unos minutos." };
  }
}
