import koleksiData from "@/data/koleksi.json";
import Image from "next/image";

interface KoleksiItem {
  id: string;
  title: string;
  artist: string;
  year: number;
  imageUrl: string;
}

export default function GaleriPage() {
  const collections: KoleksiItem[] = koleksiData as unknown as KoleksiItem[];
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">Galeri Koleksi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="relative w-full h-64">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600 text-sm">
                {item.artist} ({item.year})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
