"use client";

import { useState } from "react";

export default function NewsForm() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 mb-4"
            >
                {isOpen ? "Tutup Form Tambah Berita" : "Buka Form Tambah Berita"}
            </button>
            {isOpen && (
                <div className="p-4 border rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Tambah Berita Baru</h2>
                    <form action="/api/admin/news" method="post" encType="multipart/form-data" className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Judul</label>
                            <input name="title" className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-800" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Isi Berita</label>
                            <textarea name="body" className="w-full border rounded px-3 py-2 min-h-[160px] bg-gray-100 dark:bg-gray-800" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Gambar</label>
                            <input type="file" name="image" accept="image/*" className="w-full" />
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2">Simpan Berita</button>
                    </form>
                </div>
            )}
        </div>
    );
}