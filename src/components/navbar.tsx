"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/navbar.module.css";
import Dropdown from "./Dropdown";

interface NavbarProps {
  enableScrollEffect?: boolean;
  isLandingPage?: boolean;
}

export default function Navbar({ enableScrollEffect = true, isLandingPage = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!enableScrollEffect) {
      setIsScrolled(false);
      return;
    }
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [enableScrollEffect]);

  const atTopLanding = isLandingPage && !isScrolled;
  const textColorClass = atTopLanding ? "text-black" : "text-gray-800";

  // no-op: Headless UI handles dropdown state; mobile uses <details>

  return (
    <nav
      className={[
        styles["navbar-base"],
        atTopLanding ? styles["navbar-frosted"] : styles["navbar-solid"],
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Beranda */}
            <Link
              href="/"
              className={`relative transition-colors duration-300 group ${textColorClass} ${styles["menu-item"]} ${styles["menu-item-link"]}`}
            >
              Beranda
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${atTopLanding ? "bg-black" : "bg-blue-600"}`}></span>
            </Link>

            {/* Tentang with Headless UI Dropdown */}
            <Dropdown
              buttonLabel="Tentang"
              items={[
                { href: "/sejarah", label: "Sejarah" },
                { href: "/profil", label: "Profil" },
              ]}
              className={`${styles["menu-item-link"]}`}
              buttonClassName={`${textColorClass}`}
            />

            {/* Galeri */}
            <Link
              href="/galeri"
              className={`relative transition-colors duration-300 group ${textColorClass} ${styles["menu-item"]} ${styles["menu-item-link"]}`}
            >
              Galeri
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${atTopLanding ? "bg-black" : "bg-blue-600"}`}></span>
            </Link>

            {/* Berita */}
            <Link
              href="/berita"
              className={`relative transition-colors duration-300 group ${textColorClass} ${styles["menu-item"]} ${styles["menu-item-link"]}`}
            >
              Berita
              <span className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${atTopLanding ? "bg-black" : "bg-blue-600"}`}></span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle main menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-6 py-3 space-y-1">
            <Link href="/" className="block py-2 text-gray-800">Beranda</Link>
            <details>
              <summary className="cursor-pointer py-2 text-gray-800">Tentang</summary>
              <div className="ml-4 py-1">
                <Link href="/sejarah" className="block py-1 text-gray-700">Sejarah</Link>
                <Link href="/profil" className="block py-1 text-gray-700">Profil</Link>
              </div>
            </details>
            <Link href="/galeri" className="block py-2 text-gray-800">Galeri</Link>
            <Link href="/berita" className="block py-2 text-gray-800">Berita</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
