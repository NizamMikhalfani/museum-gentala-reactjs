// src/lib/data.ts

// 1) Define Interfaces
export interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

export interface MuseumEvent {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO 8601 YYYY-MM-DD
  endDate: string;   // ISO 8601 YYYY-MM-DD
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

// 2) Create and Export Data Arrays
export const carouselImages: CarouselImage[] = [
  { id: 1, src: "/images/dummy.jpg", alt: "Museum hero - dummy" },
  { id: 2, src: "/logo/Menara.png", alt: "Menara Gentala Arasy" },
];

export const museumEvents: MuseumEvent[] = [
  {
    id: "event-01",
    title: "Pameran: The Sea is Barely Wrinkled",
    description: "Pameran tunggal oleh Kei Imazu.",
    startDate: "2025-05-24",
    endDate: "2025-10-05",
  },
  {
    id: "event-02",
    title: "Pameran: Your curious journey",
    description: "Sebuah perjalanan kuriositas oleh Olafur Eliasson.",
    startDate: "2025-11-29",
    endDate: "2026-04-12",
  },
];

export const galeriItems: GalleryItem[] = [
  {
    id: 1,
    title: "Patung Sejarah",
    image: "/gallery1.jpg",
    description: "Artefak patung dari abad ke-18.",
  },
  {
    id: 2,
    title: "Keramik Antik",
    image: "/gallery2.jpg",
    description: "Koleksi keramik antik dari Asia Tenggara.",
  },
  {
    id: 3,
    title: "Naskah Kuno",
    image: "/gallery3.jpg",
    description: "Naskah bersejarah yang berusia ratusan tahun.",
  },
  {
    id: 4,
    title: "Lukisan Tradisional",
    image: "/gallery4.jpg",
    description: "Lukisan yang menggambarkan budaya lokal.",
  },
];
