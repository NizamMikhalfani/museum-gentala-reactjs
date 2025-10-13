
"use client";
import Link from 'next/link';

export function Dropdown() {
  return (
    <div className="dropdown">
      <a tabIndex={0}>
        <span>Menu</span>
        <span className="material-symbols-outlined">expand_more</span>
      </a>
      <div className="menu">
            <Link href="/galeri">Galeri</Link>
            <Link href="/berita">Berita</Link>
            <Link href="/tentang">Tentang</Link>
      </div>
    </div>
  );
}

