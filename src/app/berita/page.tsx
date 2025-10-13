import Link from "next/link";
import Image from "next/image";
import beritaData from "@/data/news.json";
import beritaImages from "@/lib/beritaImages";

type Artikel = {
  id: string;
  title: string;
  excerpt?: string;
  imageUrl?: string;
  href?: string;
};

function truncate(s: string | undefined, n = 150) {
  if (!s) return "";
  if (s.length <= n) return s;
  return s.slice(0, n).trimEnd() + "…";
}

export default function BeritaPage() {
  const articles = (beritaData as unknown as Artikel[]) || [];
  const list = articles.slice(0, 5); // limit to 5 previews

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Berita & Publikasi</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {list.map((artikel) => {
          const img =
            beritaImages[artikel.id] ??
            artikel.imageUrl ??
            "/images/placeholder.png";
          return (
            <article
              key={artikel.id}
              className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
            >
                  <div className="w-full sm:w-40 h-28 relative flex-shrink-0 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={img as unknown as string}
                      alt={artikel.title}
                      fill
                      className="object-cover"
                    />
                  </div>

              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">{artikel.title}</h2>
                <p className="text-sm text-gray-700 mb-2">
                  {truncate(artikel.excerpt, 120)}
                </p>
                <Link
                  href={`/berita/${artikel.id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          );
        })}
        {list.length === 0 && (
          <p className="text-gray-600">Belum ada berita untuk ditampilkan.</p>
        )}
      </div>
    </div>
  );
}
