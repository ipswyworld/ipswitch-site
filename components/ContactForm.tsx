"use client";

import { useState } from "react";

// Sends through Web3Forms (https://web3forms.com): a third-party service that emails each message
// to the address the access key was created with. The key is meant to be public.
// Inert until NEXT_PUBLIC_WEB3FORMS_KEY is set at build time: with no key the form is not shown.
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Phase = "idle" | "sending" | "sent" | "failed";

export function ContactForm() {
  const [phase, setPhase] = useState<Phase>("idle");
  if (!KEY) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setPhase("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject: "Message from ipswitch.co.ke",
          from_name: "Ipswitch contact form",
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          botcheck: form.get("botcheck") ?? "",
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      setPhase(res.ok && data.success ? "sent" : "failed");
    } catch {
      setPhase("failed");
    }
  }

  if (phase === "sent") {
    return (
      <div className="cform sent" role="status">
        <h3>Message sent.</h3>
        <p>Thank you. I will reply to the address you gave.</p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <h3>Or write here</h3>
      <div className="cform-grid">
        <label>
          Your name
          <input name="name" type="text" required autoComplete="name" maxLength={120} />
        </label>
        <label>
          Your email
          <input name="email" type="email" required autoComplete="email" maxLength={200} />
        </label>
      </div>
      <label>
        The problem and the constraint
        <textarea name="message" required rows={5} maxLength={4000} />
      </label>
      {/* Honeypot: real people never see or fill this. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="cform-foot">
        <button type="submit" disabled={phase === "sending"}>
          {phase === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="cform-note">
          Sent through Web3Forms, a third-party service, straight to my inbox.
        </p>
      </div>
      {phase === "failed" && (
        <p className="cform-err" role="alert">
          That did not send. Please email njorojoe19@gmail.com directly.
        </p>
      )}
    </form>
  );
}
