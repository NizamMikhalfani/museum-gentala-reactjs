export default function SejarahPage() {
  const timeline = [
    { year: "1855", title: "Pendirian Cikal Bakal Koleksi", desc: "Awal mula pengumpulan artefak sejarah daerah." },
    { year: "1961", title: "Ekspansi Koleksi", desc: "Masuknya koleksi seni modern dan karya maestro." },
    { year: "2005", title: "Renovasi Besar", desc: "Pembaruan galeri dan fasilitas edukasi untuk publik." },
    { year: "2020", title: "Digitalisasi Arsip", desc: "Katalog koleksi tersedia secara daring untuk peneliti dan umum." },
  ];

  return (
    <div className="pb-16">
      {/* Hero */}
      <section
        className="relative h-64 md:h-80 w-full bg-center bg-cover"
        style={{ backgroundImage: "url('/images/dummy.jpg')" }}
        aria-label="Hero Sejarah"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Sejarah Museum</h1>
            <p className="text-white/90 mt-2 max-w-2xl">Jejak waktu yang membentuk identitas dan warisan budaya kita.</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 mt-10">
        <p className="text-gray-700 leading-relaxed mb-8">
          Museum Menara Gentala Arasy berawal dari inisiatif pelestarian artefak sejarah setempat, kemudian berkembang menjadi pusat
          edukasi dan riset budaya. Berikut adalah tonggak penting dalam perjalanan kami.
        </p>

        {/* Timeline */}
        <ol className="relative border-l border-gray-300 pl-6 space-y-6">
          {timeline.map((t) => (
            <li key={t.year} className="ml-2">
              <div className="absolute -left-[7px] mt-1 w-3 h-3 rounded-full bg-blue-600" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-gray-900">
                {t.year} — {t.title}
              </h3>
              <p className="text-gray-700">{t.desc}</p>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
