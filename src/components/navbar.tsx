"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface NavbarProps {
  enableScrollEffect?: boolean; // kalau true, navbar transparan di awal
}

export default function Navbar({ enableScrollEffect = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enableScrollEffect) return; // kalau tidak butuh efek scroll, langsung solid
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableScrollEffect]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled && enableScrollEffect
          ? "bg-white shadow-md"
          : enableScrollEffect
          ? "bg-transparent"
          : "bg-blue-600 shadow"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏛️</span>
            <span
              className={`font-bold text-lg ${
                scrolled && enableScrollEffect ? "text-gray-900" : "text-white"
              }`}
            >
              Museum Nusantara
            </span>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-8">
            {["Beranda", "Tentang", "Galeri", "Kontak"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative transition-colors duration-300 group ${
                  scrolled && enableScrollEffect ? "text-gray-800" : "text-white"
                }`}
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Tombol Login */}
          <Link
            href="/login"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              scrolled && enableScrollEffect
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-600 hover:bg-gray-100"
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
