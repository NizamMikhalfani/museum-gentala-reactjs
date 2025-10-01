import Link from "next/link";

interface Artikel {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  href?: string;
}

export default function BeritaCard({ artikel }: { artikel: Artikel }) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Image */}
      <div className="md:col-span-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={artikel.imageUrl}
          alt={artikel.title}
          className="w-full h-48 md:h-full object-cover"
        />
      </div>
      {/* Content */}
      <div className="md:col-span-2 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{artikel.title}</h3>
          <p className="text-gray-700 mb-4">{artikel.excerpt}</p>
        </div>
        <div>
          <Link href={artikel.href || `/berita/${artikel.id}`} className="text-blue-600 hover:underline">
            Baca Selengkapnya
          </Link>
        </div>
      </div>
    </article>
  );
}
