import { NextResponse } from 'next/server';
import { compareSync } from 'bcryptjs';
import db from '@/lib/db';
import { signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Nom d\'utilisateur et mot de passe requis' }, { status: 400 });
    }

    const admin = db.prepare('SELECT * FROM admin WHERE username = ?').get(username) as
      | { id: number; username: string; password_hash: string }
      | undefined;

    if (!admin || !compareSync(password, admin.password_hash)) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const token = await signToken({ sub: String(admin.id), username: admin.username });

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
