import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const c = cookies();
  const isAuthed = c.get('admin_session')?.value === '1';
  return NextResponse.json({ authenticated: isAuthed });
}
