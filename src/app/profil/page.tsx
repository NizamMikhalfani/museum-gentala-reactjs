export default function ProfilPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section
        className="relative h-56 md:h-72 w-full bg-center bg-cover"
        style={{ backgroundImage: "url('/images/dummy.jpg')" }}
        aria-label="Hero Profil"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Profil Museum</h1>
            <p className="text-white/90 mt-2 max-w-2xl">Mengenal visi, misi, dan layanan kami untuk pengunjung.</p>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 mt-10 space-y-10">
        {/* Visi & Misi */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Visi & Misi</h2>
          <p className="text-gray-700 mb-2">Visi: Menjadi pusat pelestarian dan pembelajaran budaya yang inklusif dan inspiratif.</p>
          <ul className="list-disc ml-5 text-gray-700">
            <li>Melestarikan warisan budaya melalui konservasi dan riset.</li>
            <li>Menyajikan pameran edukatif dan interaktif untuk semua kalangan.</li>
            <li>Mendorong kolaborasi dengan komunitas dan lembaga pendidikan.</li>
          </ul>
        </section>

        {/* Jam Kunjungan */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Jam Kunjungan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p>Senin - Jumat</p>
              <p className="font-medium">09.00 - 17.00</p>
            </div>
            <div>
              <p>Sabtu - Minggu</p>
              <p className="font-medium">10.00 - 18.00</p>
            </div>
          </div>
        </section>

        {/* Lokasi */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Lokasi</h2>
          <p className="text-gray-700">Jl. Museum Nusantara No. 123, Kota Jambi, Indonesia</p>
        </section>
      </main>
    </div>
  );
}
