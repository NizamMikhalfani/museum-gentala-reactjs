"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/navbar.module.css";

interface NavbarProps {
  enableScrollEffect?: boolean;
  isLandingPage?: boolean;
}

export default function Navbar({ enableScrollEffect = true, isLandingPage = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/tentang" },
    { name: "Galeri", href: "/galeri" },
    { name: "Kontak", href: "/kontak" },
  ];

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
                className={`relative transition-colors duration-300 group ${textColorClass} ${styles["menu-item"]} ${styles["menu-item-link"]}`}
              >
                {item.name}
                <span
                  className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    atTopLanding ? "bg-black" : "bg-blue-600"
                  }`}
                ></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
