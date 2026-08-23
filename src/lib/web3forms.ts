export type SubmitResult = { ok: boolean; message: string };

export async function sendToWeb3Forms(fields: Record<string, string>): Promise<SubmitResult> {
  const accessKey = import.meta.env.PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    return {
      ok: false,
      message: "El formulario todavía no está configurado. Escribinos por WhatsApp mientras tanto.",
    };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: accessKey, ...fields }),
    });
    const result = await response.json();

    if (result.success) {
      return { ok: true, message: "¡Listo! Te contactaremos pronto." };
    }
    return { ok: false, message: result.message || "No pudimos enviar tu mensaje. Probá de nuevo." };
  } catch {
    return { ok: false, message: "Error de conexión. Probá de nuevo en unos minutos." };
  }
}
