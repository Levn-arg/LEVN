import { useState, type FormEvent } from "react";
import Modal, { ArrowRight, ModalHeader, SuccessMessage, fieldInput, fieldLabel, primaryButton } from "./Modal";
import { WHATSAPP_URL } from "../data/site";
import ContactOption from "./ContactOption";
import { notifyContact } from "../lib/notify";
import { createLead } from "../lib/scheduling";
import { useTranslations } from "../i18n/ui";
import { useLang } from "../i18n/useLang";
import { MESSAGES_EN } from "../i18n/en/pages";

type Status = "idle" | "sending" | "success" | "error";

const FORM_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

export default function ContactFormModal() {
  const lang = useLang();
  const m = useTranslations(lang).modal;
  const t = m.form;
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
        title={t.option}
        description={t.optionText}
        icon={<span className="[&>svg]:h-6.5 [&>svg]:w-6.5">{FORM_ICON}</span>}
      />

      <Modal open={open} onClose={close} title={t.dialog} closeLabel={m.close}>
        {status === "success" ? (
          <SuccessMessage title={t.successTitle}>{t.successText}</SuccessMessage>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mb-3">
              <ModalHeader
                icon={FORM_ICON}
                eyebrow={t.eyebrow}
                title={t.title}
                highlight={t.highlight}
                subtitle={t.subtitle}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
              <label className={fieldLabel}>
                {m.name}
                <input required name="nombre" type="text" autoComplete="name" className={fieldInput} />
              </label>
              <label className={fieldLabel}>
                {t.phone}
                <input name="telefono" type="tel" autoComplete="tel" className={fieldInput} />
              </label>
            </div>
            <label className={fieldLabel}>
              {m.email}
              <input required name="email" type="email" autoComplete="email" className={fieldInput} />
            </label>
            <label className={fieldLabel}>
              {t.message}
              <textarea required name="mensaje" rows={4} className={`${fieldInput} resize-none py-3.5`} />
            </label>

            {status === "error" && <p className="m-0 text-sm font-semibold text-[#B42318] dark:text-[#FF9C94]">{lang === "en" ? MESSAGES_EN[errorMessage] ?? errorMessage : errorMessage}</p>}

            <button type="submit" disabled={status === "sending"} className={`${primaryButton} mt-2`}>
              {status === "sending" ? m.sending : t.submit}
              {status !== "sending" && <ArrowRight />}
            </button>
            <p className="m-0 text-center text-[15px] text-muted-2">
              {t.preferTalk}{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-accent hover:text-accent-hover">
                {t.whatsapp}
              </a>
            </p>
          </form>
        )}
      </Modal>
    </>
  );
}
