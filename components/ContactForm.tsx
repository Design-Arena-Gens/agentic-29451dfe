"use client";
import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message')
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setStatus('Message sent! I will get back to you.');
      form.reset();
    } catch (err: any) {
      setStatus(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 max-w-xl">
      <input required name="name" placeholder="Your name" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
      <input required type="email" name="email" placeholder="Email" className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
      <textarea required name="message" placeholder="Message" rows={5} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10" />
      <button disabled={submitting} className="px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:opacity-50 w-fit">{submitting ? 'Sending?' : 'Send message'}</button>
      {status && <p className="text-sm text-white/70">{status}</p>}
    </form>
  );
}
