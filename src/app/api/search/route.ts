import path from 'path';
import fs from 'fs';

const cache = new Map<string, { items: unknown[]; ts: number }>();
const TTL = 5 * 1000; // 5 seconds

function loadJson(filename: string): unknown[] {
  const p = path.join(process.cwd(), 'src', 'data', filename);
  try {
    const raw = fs.readFileSync(p, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

const koleksi = loadJson('koleksi.json');
const news = loadJson('news.json');

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = (searchParams.get('q') ?? '').trim();
  const q = raw.replace(/\s+/g, ' ').toLowerCase();
  if (!q || q.length < 2) {
    return new Response(JSON.stringify({ items: [] }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  const now = Date.now();
  const cached = cache.get(q);
  if (cached && now - cached.ts < TTL) {
    return new Response(JSON.stringify({ items: cached.items }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // Simple substring match on relevant fields
  const items: unknown[] = [];
  const term = q;

  function pushIfMatch(obj: Record<string, unknown>, fields: string[]): boolean {
    for (const f of fields) {
      const val = String(obj[f as string] ?? '').toLowerCase();
      if (val.includes(term)) return true;
    }
    return false;
  }

  for (const k of koleksi as Record<string, unknown>[]) {
    if (pushIfMatch(k, ['title', 'artist', 'alt_text'])) {
      items.push({ type: 'koleksi', id: k['id'] as string | undefined, title: k['title'] as string | undefined, image: k['imageUrl'] as string | undefined });
    }
  }
  for (const n of news as Record<string, unknown>[]) {
    if (pushIfMatch(n, ['title', 'excerpt'])) {
      items.push({ type: 'news', id: (n['id'] ?? n['slug']) as string | undefined, title: n['title'] as string | undefined });
    }
  }

  cache.set(q, { items, ts: now });

  return new Response(JSON.stringify({ items }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
