"use client";
import { museumEvents, type MuseumEvent } from "@/lib/data";

function formatRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "2-digit" };
  return `${s.toLocaleDateString(undefined, opts)} – ${e.toLocaleDateString(undefined, opts)}`;
}

export default function UpcomingEvents() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming: MuseumEvent[] = museumEvents
    .filter((ev) => new Date(ev.startDate) >= today)
    .sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate))
    .slice(0, 2);

  if (upcoming.length === 0) {
    return <p className="text-gray-500">Tidak ada acara mendatang saat ini.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {upcoming.map((ev) => (
        <div key={ev.id} className="rounded-lg border bg-white shadow-sm p-5">
          <h3 className="text-lg font-semibold mb-1">{ev.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{formatRange(ev.startDate, ev.endDate)}</p>
          <p className="text-gray-700 text-sm line-clamp-3">{ev.description}</p>
        </div>
      ))}
    </div>
  );
}
