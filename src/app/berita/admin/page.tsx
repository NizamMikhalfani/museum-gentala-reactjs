import Image from "next/image";
import news from "@/data/news.json";

type NewsItem = { id: string; title: string; body: string; image?: string | null };

export default function AdminNewsList() {
  const items = news as unknown as NewsItem[];
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Berita (Admin)</h1>
      <div className="space-y-8">
        {items.length === 0 && <p className="text-gray-600">Belum ada berita.</p>}
        {items.map((n) => (
          <article key={n.id} className="border rounded-lg bg-white shadow-sm overflow-hidden">
            {n.image && (
              <div className="relative w-full h-64">
                {/* using next/image for /public/uploads path */}
                <Image src={n.image} alt={n.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{n.title}</h2>
              <p className="whitespace-pre-wrap text-gray-800">{n.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
