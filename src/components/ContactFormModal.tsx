import { useState, type FormEvent } from "react";
import Modal from "./Modal";
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-pointer rounded-[20px] bg-white px-5.5 py-6.5 text-left text-ink hover:text-ink"
      >
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[12px] bg-accent-soft text-lg text-accent">
          ▤
        </div>
        <p className="mb-2 text-[15px] font-bold">Formulario corto</p>
        <p className="mb-4 text-[12.5px] text-muted-2">2 minutos y ya estamos en contacto.</p>
        <span className="text-[13px] font-bold text-accent">Completar ahora →</span>
      </button>

      <Modal open={open} onClose={close} title="Formulario de contacto" tone="dark">
        {status === "success" ? (
          <div className="py-5 text-center">
            <p className="mb-3 text-3xl">✓</p>
            <p className="mb-1.5 text-lg font-extrabold">¡Listo!</p>
            <p className="text-[13.5px] text-white/60">Te respondemos en menos de 24h hábiles.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <p className="mb-1 pr-6 text-[19px] font-extrabold">Contanos de tu negocio</p>

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
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
              Teléfono (opcional)
              <input
                name="telefono"
                type="tel"
                className="rounded-xl border border-white/15 bg-transparent px-3.5 py-2.5 text-sm font-normal text-white focus:border-accent focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-white/80">
              Mensaje
              <textarea
                required
                name="mensaje"
                rows={4}
                className="resize-none rounded-xl border border-white/15 bg-transparent px-3.5 py-2.5 text-sm font-normal text-white focus:border-accent focus:outline-none"
              />
            </label>

            {status === "error" && (
              <p className="text-[12.5px] font-semibold text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1.5 cursor-pointer rounded-full bg-accent py-3 text-sm font-bold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Enviar mensaje"}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
