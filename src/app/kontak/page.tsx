"use client";

import { useState } from "react";

export default function KontakPage() {
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data terkirim:", form);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">Kontak</h1>
      {submitted ? (
        <p className="text-green-600">Terima kasih, pesan Anda sudah terkirim!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="pesan"
            placeholder="Pesan"
            value={form.pesan}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Kirim
          </button>
        </form>
      )}
    </div>
  );
}
