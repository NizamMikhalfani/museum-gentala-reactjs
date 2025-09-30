"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  enableScrollEffect?: boolean; // bisa true/false
}

export default function Navbar({ enableScrollEffect = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!enableScrollEffect) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableScrollEffect]);

  // warna teks
  const textColorClass =
    scrolled && enableScrollEffect ? "text-gray-800" : "text-white";

      const menuItems = [
    { name: "Beranda", href: "http://localhost:3000/" },
    { name: "Tentang", href: "http://localhost:3000/tentang" },
    { name: "Galeri", href: "http://localhost:3000/galeri" },
    { name: "Kontak", href: "http://localhost:3000/kontak" },
  ];


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
          <Link href="http://localhost:3000/" className="flex items-center space-x-2">
            <Image
              src="/logo/Menara.png"
              alt="Logo Museum Nusantara"
              width={32}
              height={32}
              className="rounded"
            />
            <span className={`font-bold text-lg ${textColorClass}`}>
              Museum Nusantara
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Tentang", href: "/tentang" },
              { name: "Galeri", href: "/galeri" },
              { name: "Berita", href: "/berita" },
              { name: "Kontak", href: "/kontak" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-colors duration-300 group ${textColorClass}`}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
