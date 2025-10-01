import BeritaCard from "@/components/BeritaCard";
import beritaData from "@/data/berita.json";

interface Artikel {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  href?: string;
}

export default function BeritaPage() {
  const articles: Artikel[] = beritaData as unknown as Artikel[];
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Berita & Publikasi</h1>
      <div className="space-y-6">
        {articles.map((artikel) => (
          <BeritaCard key={artikel.id} artikel={artikel} />
        ))}
      </div>
    </div>
  );
}
