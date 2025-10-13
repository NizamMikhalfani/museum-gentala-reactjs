import React from 'react';
import { Card } from '@/components/Card';
import koleksi from '@/data/koleksi.json';

type KoleksiItem = {
  id: string;
  title: string;
  artist?: string;
  year?: number | string;
  imageUrl: string;
  alt_text?: string;
};

export default function GaleriPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Galeri Koleksi</h1>
      <section className="card-grid">
        {(koleksi as KoleksiItem[]).slice(0, 60).map((item) => (
          <Card
            key={item.id}
            name={item.title}
            role={item.artist}
            bio={item.year ? String(item.year) : undefined}
            img={item.imageUrl}
            alt={item.alt_text || item.title}
          />
        ))}
      </section>
    </main>
  );
}
