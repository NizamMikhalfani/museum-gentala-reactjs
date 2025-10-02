import { NextRequest, NextResponse } from "next/server";
import { setAuthCookie, signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email dan password wajib diisi" }, { status: 400 });
    }

    // Dummy credential check: replace with DB check as needed
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";
    const valid = email === adminEmail && password === adminPass;

    if (!valid) {
      return NextResponse.json({ ok: false, error: "Kredensial salah" }, { status: 401 });
    }

    const token = await signToken(email);
    await setAuthCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Kesalahan server" }, { status: 500 });
  }
}
