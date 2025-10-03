import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

/**
 * Clear the auth cookie and redirect to /login.
 * Supports GET and POST (some forms submit POST).
 */

function makeLogoutResponse() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = new URL("/login", base);
  const res = NextResponse.redirect(url, 303);
  // Expire the cookie (works even if cookie is already missing)
  res.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}

export async function GET() {
  try {
    return makeLogoutResponse();
  } catch (error) {
    console.error('logout GET failed', error);
    return NextResponse.json({ ok: false, error: "Logout failed" }, { status: 500 });
  }
}

export async function POST() {
  try {
    return makeLogoutResponse();
  } catch (error) {
    console.error('logout POST failed', error);
    return NextResponse.json({ ok: false, error: "Logout failed" }, { status: 500 });
  }
}
