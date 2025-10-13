"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import "../styles/Navbar3.css";

interface MenuItem {
  name: string;
  items?: string[];
}

const items: MenuItem[] = [
  { name: "About" },
  { name: "Skills", items: ["UI/UX", "Development", "Design"] },
  { name: "Projects", items: ["Chatbot", "Calculator", "Weather"] },
  { name: "Work", items: ["Portfolio", "Resume", "GitHub"] },
];

interface LinkProps {
  item: MenuItem;
  activeItem: MenuItem | null;
  onHover: (item: MenuItem, x: string) => void;
}

const Link = ({ item, activeItem, onHover }: LinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleHover = () => {
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      onHover(item, `${rect.x}px`);
    }
  };
  return (
    <a
      className={item.name === activeItem?.name ? "active" : ""}
      ref={linkRef}
      onMouseEnter={handleHover}
    >
      {item.name}
    </a>
  );
};

const Search = () => (
  <div className="navbar-3-search">
    <span className="material-symbols-outlined">search</span>
    <input type="text" placeholder="Search" />
  </div>
);

export const Navbar3 = () => {
  const [translateX, setTranslateX] = useState("0");
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const handleLinkHover = (item: MenuItem, x: string) => {
    setActiveItem(item);
    setTranslateX(x);
  };

  return (
    <section className="page navbar-3-page">
      <nav className="navbar-3">
        <Image
          src="/navbar3/avatar.svg"
          alt="Avatar"
          width={48}
          height={48}
          priority
        />
        <div className="navbar-3-menu">
          {items.map((item) => (
            <Link
              key={item.name}
              item={item}
              activeItem={activeItem}
              onHover={handleLinkHover}
            />
          ))}
          <div
            className={`navbar-3-dropdown ${activeItem ? "visible" : ""}`}
            style={{ translate: `${translateX} 0` }}
          >
            {activeItem?.items?.map((link) => (
              <a key={link}>{link}</a>
            ))}
          </div>
        </div>
        <Search />
      </nav>
    </section>
  );
};
