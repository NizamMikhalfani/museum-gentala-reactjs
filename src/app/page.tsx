"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import Calendar from '@/components/Calendar';
import UpcomingEvents from "@/components/UpcomingEvents";
import VisitorBadge from "@/components/VisitorBadge";
import Link from "next/link";
import Image from "next/image";
import { useState as useSidebarState } from "react";

const navItems = ["Home", "Galeri", "Berita", "Tentang", "Kontak"];

export default function Home() {
  // Simple carousel state
  const images = useMemo(() => [
    "/images/1_1280x720.jpg",
    "/images/2_1920x1080.jpg",
    "/images/3_1680x1050.jpg",
    "/images/4_1920x1080.jpg",
    "/images/5_1920x1200.jpg",
  ], []);
  const [idx, setIdx] = useState(0);

  // Advance image every 6s
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 6000);
    return () => clearInterval(t);
  }, [images.length]);

  // Analyze brightness of current image and toggle body class for navbar contrast
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const analyze = () => {
      try {
        const off = new window.Image();
        off.crossOrigin = "anonymous";
        off.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const w = (canvas.width = 50);
          const h = (canvas.height = 50);
          ctx.drawImage(off, 0, 0, w, h);
          const { data } = ctx.getImageData(0, 0, w, h);
          let totalL = 0;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            totalL += l;
          }
          const avg = totalL / (data.length / 4);
          const isLight = avg > 160;
          document.body.classList.remove("nav-contrast-dark", "nav-contrast-light");
          document.body.classList.add(isLight ? "nav-contrast-light" : "nav-contrast-dark");
        };
        off.src = img.src;
      } catch {}
    };

    if (img.complete) analyze();
    else img.onload = analyze;

    return () => {
      if (img) img.onload = null;
    };
  }, [idx]);

  // Cleanup body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("nav-contrast-dark", "nav-contrast-light");
    };
  }, []);

  // Sidebar state
  const [isOpen, setIsOpen] = useSidebarState(false);

  return (
    <div className="font-sans">
  {/* Navbar is rendered from layout via NavShell */}

      {/* Hero Section with full-screen carousel background */}
      <section id="beranda" className="relative h-screen w-full">
        {/* Background images stacked, cross-fading */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="Background hero"
              fill
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === idx ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Optional dark overlay to improve contrast slightly */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          {/* Visitor Badge - Top Right */}
          <div className="absolute top-6 right-6 z-20">
            <VisitorBadge />
          </div>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow">
              Selamat Datang di Museum Menara Gentala Arasy
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/95">
              Menjelajahi sejarah dan budaya bangsa
            </p>
            <Link
              href="/jelajah"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg text-white"
            >
              Jelajah
            </Link>
          </div>
        </div>
      </section>

      {/* calendar section */}
      <div className="container mx-auto px-4">
        <Calendar />
      </div>

      {/* Upcoming events section */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mt-6 mb-4">Akan Datang</h2>
        <UpcomingEvents />
      </div>

      {/* Tentang Section */}
      <section id="tentang" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Tentang</h2>
          <p className="text-gray-600 leading-relaxed">
            Museum Nusantara menyimpan ribuan koleksi bersejarah yang mencerminkan
            kekayaan budaya Indonesia. Dengan pameran interaktif dan program
            edukatif, museum ini menjadi pusat pembelajaran sejarah dan budaya.
          </p>
        </div>
      </section>

      {/* Galeri Section */}
      <section id="galeri" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
            Galeri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1580137189272-c9379f8864fd",
              "https://images.unsplash.com/photo-1549887534-3db1bd59dcca",
              "https://images.unsplash.com/photo-1580136579312-94651dfd596d",
            ].map((src, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-lg group relative h-64">
                <Image src={src} alt="Galeri" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak Section */}
      <section id="kontak" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Kontak</h2>
          <p className="text-gray-600 mb-4">
            Hubungi kami untuk informasi lebih lanjut mengenai kunjungan dan
            pameran terbaru.
          </p>
          <a
            href="mailto:nizammikhalfani2@upi.edu"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          >
            Email Kami
          </a>
        </div>
      </section>

      {/* Sidebar Component */}
      <aside className={`sidebar${isOpen ? " open" : ""}`}>
        <div className="inner">
          <header>
            <button
              type="button"
              className="sidebar-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="icon">{isOpen ? "close" : "menu"}</span>
            </button>
          </header>
          <nav>
            {navItems.map((item) => (
              <button key={item} type="button">
                <span className="icon">{item}</span>
                <p>{item}</p>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
