import { useState, type FormEvent } from "react";
import Modal, { ArrowRight, SuccessMessage, fieldInput, fieldLabel, primaryButton } from "./Modal";
import ContactOption from "./ContactOption";
import { notifyContact } from "../lib/notify";
import { createLead } from "../lib/scheduling";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactFormModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function close() {
    setOpen(false);
    setTimeout(() => setStatus("idle"), 300);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Se guarda en Supabase (para tener registro del lead) y se envía por
    // email en paralelo. El email es el canal principal: si falla Supabase
    // pero el email sale, igual se muestra éxito al usuario.
    const [result] = await Promise.all([
      notifyContact({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || undefined,
        mensaje: data.mensaje,
      }),
      createLead({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || undefined,
        mensaje: data.mensaje,
      }),
    ]);

    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  return (
    <>
      <ContactOption
        onClick={() => setOpen(true)}
        title="Formulario"
        description="Contanos por escrito."
        icon={
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        }
      />

      <Modal open={open} onClose={close} title="Formulario de contacto">
        {status === "success" ? (
          <SuccessMessage title="¡Listo!">Te respondemos en menos de 24 h hábiles.</SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mb-2 flex flex-col gap-2 pr-12">
              <p className="m-0 text-[32px] leading-[1.05] font-extrabold tracking-[-0.03em] max-[480px]:text-[26px]">Contanos qué te está frenando.</p>
              <p className="m-0 text-base text-muted">El diagnóstico es gratis y sin compromiso.</p>
            </div>

            <label className={fieldLabel}>
              Nombre
              <input required name="nombre" type="text" autoComplete="name" className={fieldInput} />
            </label>
            <label className={fieldLabel}>
              Email
              <input required name="email" type="email" autoComplete="email" className={fieldInput} />
            </label>
            <label className={fieldLabel}>
              Teléfono (opcional)
              <input name="telefono" type="tel" autoComplete="tel" className={fieldInput} />
            </label>
            <label className={fieldLabel}>
              ¿Qué te gustaría resolver?
              <textarea required name="mensaje" rows={4} className={`${fieldInput} resize-none py-3.5`} />
            </label>

            {status === "error" && <p className="m-0 text-sm font-semibold text-[#B42318]">{errorMessage}</p>}

            <button type="submit" disabled={status === "sending"} className={`${primaryButton} mt-2`}>
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
              {status !== "sending" && <ArrowRight />}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
