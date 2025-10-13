import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ isAdmin: false });
    return NextResponse.json({ isAdmin: true, email: admin.email });
  } catch (err) {
    console.error('session route error', err);
    return NextResponse.json({ isAdmin: false });
  }
}
