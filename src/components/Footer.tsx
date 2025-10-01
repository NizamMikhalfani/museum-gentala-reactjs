export default function Footer() {
  return (
    <footer className="border-t bg-white text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-8 grid gap-6 md:grid-cols-3 items-center">
        {/* Logos */}
        <div className="flex items-center gap-4">
          <img src="/logo/Menara.png" alt="Kementerian Kebudayaan" className="h-10 w-10 object-contain" />
          <img src="/logo/Menara.png" alt="Museum Nasional" className="h-10 w-10 object-contain" />
        </div>

        {/* Address */}
        <div>
          <p className="text-sm">Jl. Museum Nusantara No. 123</p>
          <p className="text-sm">Kota Jambi, Indonesia</p>
        </div>

        {/* Socials */}
        <nav aria-label="Media sosial" className="flex gap-4 md:justify-end">
          <a href="#" className="hover:text-blue-600" aria-label="Facebook">Facebook</a>
          <a href="#" className="hover:text-pink-600" aria-label="Instagram">Instagram</a>
          <a href="#" className="hover:text-red-600" aria-label="YouTube">YouTube</a>
          <a href="#" className="hover:text-gray-900" aria-label="X/Twitter">X</a>
          <a href="#" className="hover:text-black" aria-label="TikTok">TikTok</a>
        </nav>
      </div>
    </footer>
  );
}
