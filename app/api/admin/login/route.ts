import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  if (expected && password !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', `admin_session=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`);
  return res;
}
