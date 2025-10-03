import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from 'next/link';
import NewsForm from "@/components/NewsForm";
import fs from "fs/promises";
import path from "path";

interface News {
  title: string;
  body: string;
  image: string;
  createdAt: string;
}

async function getNewsStats() {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "news.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const news = JSON.parse(fileContent) as News[];
    return {
      total: news.length,
      latest: news.length > 0 ? new Date(news[news.length - 1].createdAt) : null,
    };
  } catch (_error) {
    // If the file doesn't exist or is empty, return default stats
    return {
      total: 0,
      latest: null,
    };
  }
}

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const stats = await getNewsStats();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Selamat datang kembali, {session.email}.
          </p>
        </div>
        <form method="post" action="/api/auth/logout">
          <button className="text-sm bg-red-600 hover:bg-red-700 text-white rounded px-4 py-2">
            Logout
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Statistik Berita</h2>
          <p>Total berita: {stats.total}</p>
          <p>
            Update terakhir:{" "}
            {stats.latest
              ? stats.latest.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Belum ada berita"}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Aksi Cepat</h2>
          <div className="flex space-x-4">
            <Link href="/berita/admin" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Lihat Semua Berita</Link>
          </div>
        </div>
      </div>

      <NewsForm />
    </div>
  );
}
