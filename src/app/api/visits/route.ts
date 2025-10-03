import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const visitsFilePath = path.join(process.cwd(), 'src', 'data', 'visits.json');

async function getVisits(): Promise<{ count: number }> {
  try {
    const data = await fs.readFile(visitsFilePath, 'utf-8');
    return JSON.parse(data) as { count: number };
  } catch (err) {
    // If the file doesn't exist, initialize it
    const e = err as { code?: string };
    if (e.code === 'ENOENT') {
      await fs.writeFile(visitsFilePath, JSON.stringify({ count: 0 }), 'utf-8');
      return { count: 0 };
    }
    throw err;
  }
}

async function updateVisits(visits: { count: number }) {
  await fs.writeFile(visitsFilePath, JSON.stringify(visits, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const visits = await getVisits();
    return NextResponse.json(visits);
  } catch (err) {
    console.error('visits GET error', err);
    return NextResponse.json({ message: 'Error reading visit count' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const visits = await getVisits();
    visits.count += 1;
    await updateVisits(visits);
    return NextResponse.json(visits);
  } catch (err) {
    console.error('visits POST error', err);
    return NextResponse.json({ message: 'Error updating visit count' }, { status: 500 });
  }
}
