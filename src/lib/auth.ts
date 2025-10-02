import { cookies } from "next/headers";

const TOKEN_COOKIE = "admin_token";

function getSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error("ADMIN_SECRET is not set");
  return s;
}

type Payload = {
  sub: string;
  exp: number; // epoch seconds
};

function base64url(input: ArrayBuffer | string): string {
  const buf = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  const str = Buffer.from(buf).toString("base64");
  return str.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function hmacSha256(key: string, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(data));
  return base64url(sig);
}

export async function signToken(sub: string, ttlSeconds = 60 * 60): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const payload: Payload = { sub, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const encHeader = base64url(JSON.stringify(header));
  const encPayload = base64url(JSON.stringify(payload));
  const data = `${encHeader}.${encPayload}`;
  const sig = await hmacSha256(getSecret(), data);
  return `${data}.${sig}`;
}

export async function verifyToken(token: string | undefined | null): Promise<Payload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  const expected = await hmacSha256(getSecret(), `${h}.${p}`);
  if (s !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(p.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString());
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload as Payload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string) {
  const jar = await cookies();
  jar.set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
}

export function clearAuthCookie() {
  return cookies().then((jar) => jar.delete(TOKEN_COOKIE));
}

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(TOKEN_COOKIE)?.value;
  const payload = await verifyToken(token);
  return payload;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  return session;
}

export const AUTH_COOKIE_NAME = TOKEN_COOKIE;