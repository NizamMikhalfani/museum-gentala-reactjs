"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section
        id="beranda"
        className="h-screen bg-cover bg-center flex items-center justify-center text-center relative"
        style={{
          backgroundImage: "url('/images/dummy.jpg')", // path gambar dari public/images
        }}
          >
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Selamat Datang di Museum Menara Gentala Arasy
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Menjelajahi sejarah dan budaya bangsa
          </p>
          <Link
            href="/jelajah"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg"
          >
            Jelajah
          </Link>
        </div>
      </section>

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
              <div
                key={idx}
                className="rounded-lg overflow-hidden shadow-lg group"
              >
                <img
                  src={src}
                  alt="Galeri"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
    </div>
  );
}
