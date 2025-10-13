"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VisitorsPage() {
  const [visitsData, setVisitsData] = useState<{ count: number; history: Array<{ ts: string }> } | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/visits')
      .then((r) => r.json())
      .then((d) => setVisitsData(d))
      .catch(() => setVisitsData(null));

    // Check admin session to show increment button only to admins
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => setIsAdmin(Boolean(d?.isAdmin)))
      .catch(() => setIsAdmin(false));
  }, []);

  async function increment() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/visits/increment', { method: 'POST' });
      if (res.status === 401) {
        setMessage('Unauthorized: only admins can increment.');
        return;
      }
      const data = await res.json();
      setVisitsData(data);
    } catch {
      setMessage('Error incrementing visits');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Visitor Count</h1>
      <p className="mb-6">This site tracks visits (stored in <code>src/data/visits.json</code>).</p>
      <div className="bg-white p-6 rounded shadow text-center">
        <div className="text-4xl font-semibold mb-2">{visitsData ? visitsData.count : '—'}</div>
        <div className="text-sm text-gray-600 mb-4">Total visitors</div>
        {message && <div className="text-sm text-red-600 mb-3">{message}</div>}
        <div className="flex justify-center gap-4 mb-6">
          {isAdmin && (
            <button onClick={increment} disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
              {loading ? 'Updating…' : 'Increment (admin only)'}
            </button>
          )}
          <Link href="/" className="text-blue-600 underline">Back home</Link>
        </div>

        <div className="text-left">
          <h2 className="font-semibold mb-2">Recent activity</h2>
          <ul className="text-sm text-gray-700">
            {visitsData?.history?.slice(0, 20).map((h) => (
              <li key={h.ts}>{new Date(h.ts).toLocaleString('id-ID')}</li>
            ))}
            {!visitsData?.history?.length && <li>No history yet</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
