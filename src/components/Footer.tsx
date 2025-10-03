import VisitCounter from "./VisitCounter";

export default function Footer() {
  return (
    <footer className="bg-white border-t text-sm text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Address / basic info */}
        <div className="text-center md:text-left">
          <div className="font-semibold">Museum Nusantara</div>
          <div className="text-gray-600">Jl. Contoh No.1, Jakarta, Indonesia</div>
          <div className="text-sm mt-2">
            <VisitCounter />
          </div>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-4">
          {/* Facebook */}
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-blue-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2V12h2.2V9.7c0-2.2 1.3-3.4 3.3-3.4.96 0 1.96.17 1.96.17v2.2h-1.13c-1.11 0-1.45.69-1.45 1.4V12h2.47l-.4 2.9h-2.07v7A10 10 0 0022 12z" />
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-pink-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" />
              <circle cx="12" cy="12" r="3.2" stroke="currentColor" />
              <path d="M17.5 6.5h.01" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </a>

          {/* YouTube */}
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-gray-600 hover:text-red-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23 7s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C16.9 3 12 3 12 3s-4.9 0-8 0C3.9 2.7 3 2.7 2.2 3.6 1.6 4.3 1 6 1 6S0 9 0 12s1 6 1 6 .6 1.7 1.2 2.4c.8.9 1.7.9 2.1 1 3.1.3 8 .3 8 .3s4.9 0 8 0c.4 0 1.3 0 2.1-1 .6-.7 1.2-2.4 1.2-2.4S24 15 24 12s-1-5-1-5zM9.8 15.5v-7l6.3 3.5-6.3 3.5z" />
            </svg>
          </a>

          {/* X / Twitter */}
          <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="text-gray-600 hover:text-sky-600">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.2 4.2 0 001.85-2.31 8.48 8.48 0 01-2.68 1.03 4.24 4.24 0 00-7.22 3.86A12.05 12.05 0 013 4.89a4.24 4.24 0 001.31 5.66c-.62-.02-1.2-.19-1.71-.47v.05c0 2.02 1.44 3.7 3.35 4.08a4.27 4.27 0 01-1.9.07 4.25 4.25 0 003.96 2.95A8.5 8.5 0 012 19.54 12 12 0 008.29 21c7.54 0 11.67-6.25 11.67-11.67l-.01-.53A8.18 8.18 0 0022.46 6z" />
            </svg>
          </a>

          {/* TikTok */}
          <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok" className="text-gray-600 hover:text-black">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M16 6h2.5a4.5 4.5 0 01-4.5-4.5V6h2zM9 7.5a6 6 0 006 6V9.5a4.5 4.5 0 01-4.5-4.5H9v2.5zM12 23a11 11 0 110-22 11 11 0 010 22z" />
            </svg>
          </a>
        </div>

        {/* Right: small copyright / credits */}
        <div className="text-center md:text-right text-xs text-gray-500">
          <div>© {new Date().getFullYear()} Museum Nusantara</div>
          <div>Dessigned by Tim Museum</div>
        </div>
      </div>
    </footer>
  );
}
