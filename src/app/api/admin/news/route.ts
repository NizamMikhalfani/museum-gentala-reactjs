import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "public", "uploads");
const newsJsonPath = path.join(process.cwd(), "src", "data", "news.json");

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const title = form.get("title");
  const body = form.get("body");
  const file = form.get("image") as File | null;

  if (typeof title !== "string" || typeof body !== "string") {
    return NextResponse.json({ ok: false, error: "Data tidak lengkap" }, { status: 400 });
  }

  await fs.mkdir(uploadsDir, { recursive: true });

  let imagePath: string | null = null;
  if (file && typeof file.arrayBuffer === "function") {
    const bytes = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const out = path.join(uploadsDir, filename);
    await fs.writeFile(out, bytes);
    imagePath = `/uploads/${filename}`;
  }

  // Read existing news
  type NewsItem = { id: string; title: string; body: string; image?: string | null };
  let news: NewsItem[] = [];
  try {
    const raw = await fs.readFile(newsJsonPath, "utf8");
    news = JSON.parse(raw);
    if (!Array.isArray(news)) news = [];
  } catch {
    news = [];
  }

  const id = `news-${String(news.length + 1).padStart(2, "0")}`;
  const item: NewsItem = { id, title, body, image: imagePath };
  news.push(item);
  await fs.mkdir(path.dirname(newsJsonPath), { recursive: true });
  await fs.writeFile(newsJsonPath, JSON.stringify(news, null, 2), "utf8");

  return NextResponse.json({ ok: true, item });
}
