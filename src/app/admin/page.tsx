import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Admin: Tambah Berita</h1>
      <form action="/api/admin/news" method="post" encType="multipart/form-data" className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input name="title" className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Isi Berita</label>
          <textarea name="body" className="w-full border rounded px-3 py-2 min-h-[160px]" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gambar</label>
          <input type="file" name="image" accept="image/*" className="w-full" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">Simpan</button>
      </form>
      <form method="post" action="/api/auth/logout" className="mt-8">
        <button className="text-sm text-gray-600 underline">Logout</button>
      </form>
    </div>
  );
}
