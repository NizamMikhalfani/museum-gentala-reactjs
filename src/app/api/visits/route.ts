import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

const visitsFilePath = path.join(process.cwd(), 'src', 'data', 'visits.json');

type VisitRecord = { ts: string; ip?: string };
type VisitsFile = { count: number; history: VisitRecord[] };

async function readVisitsFile(): Promise<VisitsFile> {
  try {
    const data = await fs.readFile(visitsFilePath, 'utf-8');
    const parsed = JSON.parse(data) as VisitsFile;
    if (typeof parsed.count !== 'number' || !Array.isArray(parsed.history)) {
      throw new Error('Invalid format');
    }
    return parsed;
  } catch (err) {
    const e = err as { code?: string };
    if (e.code === 'ENOENT') {
      const initial: VisitsFile = { count: 0, history: [] };
      await fs.mkdir(path.dirname(visitsFilePath), { recursive: true });
      await fs.writeFile(visitsFilePath, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    throw err;
  }
}

async function writeVisitsFile(v: VisitsFile) {
  await fs.writeFile(visitsFilePath, JSON.stringify(v, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const visits = await readVisitsFile();
    return NextResponse.json(visits);
  } catch (err) {
    console.error('visits GET error', err);
    return NextResponse.json({ message: 'Error reading visit count' }, { status: 500 });
  }
}

// POST on this route is protected; we prefer an admin-only increment route separately.
export async function POST() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const visits = await readVisitsFile();
    visits.count += 1;
    visits.history.unshift({ ts: new Date().toISOString() });
    // Keep history short
    if (visits.history.length > 200) visits.history.length = 200;
    await writeVisitsFile(visits);
    return NextResponse.json(visits);
  } catch (err) {
    console.error('visits POST error', err);
    return NextResponse.json({ message: 'Error updating visit count' }, { status: 500 });
  }
}
