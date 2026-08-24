import type { APIRoute } from "astro";
import {
  buildBookingEmailHtml,
  buildContactEmailHtml,
  sendBrandedEmail,
  type BookingEmailInput,
  type ContactEmailInput,
} from "../../lib/email";

// Ruta dinámica: necesita correr en el servidor (Resend usa una API key
// secreta), por eso se excluye del prerender estático del resto del sitio.
export const prerender = false;

type Payload =
  | ({ kind: "contact" } & ContactEmailInput)
  | ({ kind: "booking" } & BookingEmailInput);

export const POST: APIRoute = async ({ request }) => {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, message: "Solicitud inválida." }), {
      status: 400,
    });
  }

  if (body.kind === "contact") {
    if (!body.nombre || !body.email || !body.mensaje) {
      return new Response(JSON.stringify({ ok: false, message: "Faltan datos del formulario." }), {
        status: 400,
      });
    }
    const result = await sendBrandedEmail({
      subject: `Nueva consulta de ${body.nombre} — LEVN`,
      html: buildContactEmailHtml(body),
      replyTo: body.email,
    });
    return new Response(JSON.stringify(result), { status: result.ok ? 200 : 502 });
  }

  if (body.kind === "booking") {
    if (!body.nombre || !body.email || !body.servicio || !body.fecha || !body.hora) {
      return new Response(JSON.stringify({ ok: false, message: "Faltan datos de la reunión." }), {
        status: 400,
      });
    }
    const result = await sendBrandedEmail({
      subject: `Nueva reunión agendada — ${body.fecha} ${body.hora} — LEVN`,
      html: buildBookingEmailHtml(body),
      replyTo: body.email,
    });
    return new Response(JSON.stringify(result), { status: result.ok ? 200 : 502 });
  }

  return new Response(JSON.stringify({ ok: false, message: "Tipo de mail desconocido." }), {
    status: 400,
  });
};
