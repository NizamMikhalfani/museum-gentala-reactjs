"use client";

'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function CustomNavbar() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement|null>(null);
  const menuRef = useRef<HTMLDivElement|null>(null);
  const ddRef = useRef<HTMLDivElement|null>(null);

  // Align menu to button like the ES6 example (using DOM rects)
  const positionMenu = () => {
    const button = btnRef.current;
    const menu = menuRef.current;
    if (!button || !menu) return;
    const rect = button.getBoundingClientRect();
    // Keep it directly under and right-aligned to the button (adapt as needed)
    menu.style.top = `${button.clientHeight}px`;
    menu.style.right = `0px`;
  };

  useEffect(() => { positionMenu(); }, []);
  useEffect(() => {
    function onResize(){ positionMenu(); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.body.addEventListener('click', onDocClick);
    return () => document.body.removeEventListener('click', onDocClick);
  }, []);

  // Keyboard navigation for dropdown
  const linksRef = useRef<Array<HTMLAnchorElement|null>>([]);
  const onKeyMenu = (e: React.KeyboardEvent) => {
    if (!open) return;
    const idx = linksRef.current.findIndex(el => el === document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); const n = (idx+1) % 2; linksRef.current[n]?.focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); const p = (idx-1+2) % 2; linksRef.current[p]?.focus(); }
    if (e.key === 'Escape')    { setOpen(false); btnRef.current?.focus(); }
  };

  // Toggle on Enter/Space
  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key==='Enter'||e.key===' ') { e.preventDefault(); setOpen(v=>!v); if (!open) setTimeout(()=>linksRef.current[0]?.focus(),0); }
  };

  return (
    <div className="nav-wrap">
      <nav className="nav">
        <div className="header__btnwrapper">
          <Link className="text_btn hover__opacity" href="/">Home</Link>
          <Link className="text_btn hover__opacity" href="/galeri">Galeri</Link>
          <Link className="text_btn hover__opacity" href="/berita">Berita</Link>
        </div>
        <div
          ref={ddRef}
          className={`item dd-dropdown ${open ? 'open' : ''}`}
          tabIndex={0}
          onMouseEnter={() => { setOpen(true); positionMenu(); }}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => { setOpen(true); positionMenu(); }}
          onBlur={() => setOpen(false)}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <span
            className="nav-link"
            onClick={(e) => { e.stopPropagation(); setOpen((v)=>!v); positionMenu(); }}
            onKeyDown={onTriggerKey}
            tabIndex={0}
            role="menuitem"
          >
            Tentang
          </span>
          {open && (
            <div
              id="menu"
              ref={menuRef}
              className="dd-menu"
              role="menu"
              aria-label="Tentang"
              onKeyDown={onKeyMenu}
              style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                padding: '8px 0',
                border: '1px solid #e5e7eb',
                minWidth: '140px',
                position: 'absolute',
                zIndex: 10,
              }}
            >
              <div className="dd-menu-inner" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { href: "/sejarah", label: "Sejarah" },
                  { href: "/profil", label: "Profil" }
                ].map((item, idx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    tabIndex={0}
                    ref={el => { linksRef.current[idx] = el; }}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: '#222',
                      position: 'relative',
                      transition: 'background 0.2s',
                    }}
                    className="dropdown-link"
                    onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {item.label}
                    <span
                      style={{
                        display: 'block',
                        height: '2px',
                        background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
                        borderRadius: '1px',
                        marginTop: '4px',
                        width: '100%',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                      }}
                      className="dropdown-underline"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
