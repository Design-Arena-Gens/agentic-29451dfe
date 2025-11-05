import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_TO_EMAIL;

    if (RESEND_API_KEY && TO_EMAIL) {
      // Lazy import to avoid bundling if not used
      const { Resend } = await import('resend');
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: 'Portfolio <portfolio@resend.dev>',
        to: [TO_EMAIL],
        subject: `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`
      });
    } else {
      // Fallback: pretend success (no server persistence on Vercel FS)
      console.log('[contact:fallback]', { name, email, message });
    }

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
