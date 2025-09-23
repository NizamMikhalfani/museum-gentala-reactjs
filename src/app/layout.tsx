import "./globals.css";

export const metadata = {
  title: "Museum Menara Gentala Arasy",
  description: "Website museum sederhana dengan Next.js + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans">
        {/* Navbar */}
        <nav className="fixed w-full top-0 z-50 bg-blue-600 text-white shadow">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏛️</span>
                <a className="font-bold text-lg" href="/" >Museum Nusantara</a>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="/tentang">
                  Tentang
                </a>
                <a href="/galeri">
                  Galeri
                </a>
                <a href="/kontak">
                  Kontak
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        

        {/* Konten Halaman */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <footer className="py-6 bg-gray-900 text-gray-400 text-center mt-20">
          <p>© 2025 Museum Nusantara. Semua Hak Dilindungi.</p>
        </footer>
      </body>
    </html>
  );
}
