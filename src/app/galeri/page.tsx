import React from 'react';
import GalleryCarousel from '@/components/GalleryCarousel';
import Link from 'next/link';
import Image from 'next/image';
import beritaData from '@/data/berita.json'; // reuse structure for demo

// sample free nature images from Unsplash (12 items)
const natureImages = [
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470&w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445820135710-5b0a5e9a6d87?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&q=80&auto=format&fit=crop',
];

type Artikel = { id: string; title: string; excerpt?: string };

export default function GaleriPage() {
  // for demo, also show first few items in a compact grid below carousel
  const previews = (beritaData as unknown as Artikel[]).slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Galeri Koleksi (Demo)</h1>

      <GalleryCarousel images={natureImages} height={480} autoPlay={false} />

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {previews.map((p) => (
          <article key={p.id} className="rounded overflow-hidden bg-white shadow-sm">
            <div className="w-full h-44 relative">
              {/* use external URL from our demo set by index fallback */}
              <Image
                src={natureImages[Math.floor(Math.random() * natureImages.length)]}
                alt={p.title || 'Koleksi'}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg">{p.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{p.excerpt}</p>
              <Link href={`/berita/${p.id}`} className="text-sm text-blue-600 hover:underline inline-block mt-3">
                Lihat
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
