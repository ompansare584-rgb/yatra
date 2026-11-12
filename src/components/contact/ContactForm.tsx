"use client";

import { useState, type FormEvent } from "react";
import s from "./ContactForm.module.scss";

interface Props {
  /** A validated https://formspree.io/f/... URL, resolved on the server. */
  action: string;
}

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL.test(email.trim())) errors.email = "Please enter a valid email address so I can reply.";
  if (message.trim().length < 10) errors.message = "Please write at least a few words (10 characters or more).";
  return errors;
}

export default function ContactForm({ action }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const found = validate(name, email, message);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(action, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _gotcha: String(data.get("_gotcha") ?? ""),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.field}>
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className={s.error}>
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={s.field}>
        <label htmlFor="contact-email">Your email (only used to reply)</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={200}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" className={s.error}>
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={s.field}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className={s.error}>
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className={s.trap} aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary" disabled={sending}>
        {sending ? "Sending…" : "Send message"}
      </button>

      <p role="status" aria-live="polite" className={status === "error" ? s.error : s.success}>
        {status === "success" ? "Thank you — your message was sent." : null}
        {status === "error" ? "Something went wrong and the message was not sent. Please try again, or use LinkedIn." : null}
      </p>
    </form>
  );
}
