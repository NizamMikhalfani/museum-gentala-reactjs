import img2 from "@/images/berita/2.png";
import img3 from "@/images/berita/3.png";
import img4 from "@/images/berita/4.png";
import img5 from "@/images/berita/5.png";
import img6 from "@/images/berita/6.png";
import type { StaticImageData } from 'next/image';

export const beritaImages: Record<string, StaticImageData> = {
  // map berita ids to images here
  // adjust keys to match your berita.json ids (news-01, news-02, ...)
  "news-01": img2,
  "news-02": img3,
  "news-03": img4,
  "news-04": img5,
  "news-05": img6,
};

// Optional default export
export default beritaImages;