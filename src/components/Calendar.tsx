'use client';

import React, { useMemo, useState } from 'react';
import eventsData from '@/data/events.json';

type EventItem = {
  id: string;
  title: string;
  description?: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function daysInMonth(date: Date) {
  return endOfMonth(date).getDate();
}
function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function Calendar() {
  const [current, setCurrent] = useState(() => startOfMonth(new Date()));
  const events = useMemo(() => eventsData as EventItem[], []);

  const year = current.getFullYear();
  const month = current.getMonth(); // 0-based
  const firstWeekday = startOfMonth(current).getDay(); // 0 Sun - 6 Sat
  const totalDays = daysInMonth(current);

  // map events by YYYY-MM-DD
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const ev of events) {
      if (!ev.startDate) continue;
      const key = ev.startDate;
      const arr = map.get(key) ?? [];
      arr.push(ev);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  const prevMonth = () => setCurrent((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCurrent((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  // selected date state to show events for a day
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthName = current.toLocaleString('default', { month: 'long' });

  const cells: Array<{ day?: number; dateStr?: string }> = [];
  // leading blanks
  for (let i = 0; i < firstWeekday; i++) cells.push({});

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${pad(month + 1)}-${pad(d)}`;
    cells.push({ day: d, dateStr });
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 bg-white rounded shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{monthName} {year}</h3>
          <p className="text-sm text-gray-500">Kalender Acara / Pengingat</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            aria-label="Bulan sebelumnya"
            className="px-3 py-1 border rounded bg-gray-50 hover:bg-gray-100"
          >
            ‹
          </button>
          <button
            onClick={nextMonth}
            aria-label="Bulan berikutnya"
            className="px-3 py-1 border rounded bg-gray-50 hover:bg-gray-100"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map((d) => (
          <div key={d} className="font-medium text-xs text-gray-600">{d}</div>
        ))}

        {cells.map((c, i) => {
          const hasEvents = c.dateStr ? eventsByDate.has(c.dateStr) : false;
          const isSelected = selectedDate === c.dateStr;
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(c.dateStr ?? null)}
              className={`min-h-[56px] p-1 rounded text-left ${
                c.day ? 'bg-white' : 'bg-transparent'
              } ${hasEvents ? 'ring-1 ring-yellow-300' : ''} ${isSelected ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-sm">{c.day ?? ''}</span>
                {hasEvents && <span className="ml-2 inline-block rounded-full bg-yellow-400 w-2 h-2" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Acara pada tanggal</h4>
        {!selectedDate && <p className="text-sm text-gray-600">Pilih hari untuk melihat acara.</p>}
        {selectedDate && (
          <div>
            <div className="text-sm text-gray-700 mb-2 font-medium">{selectedDate}</div>
            <ul className="space-y-2">
              {(eventsByDate.get(selectedDate) ?? []).map((ev) => (
                <li key={ev.id} className="p-2 border rounded">
                  <div className="font-semibold">{ev.title}</div>
                  {ev.description && <div className="text-sm text-gray-600">{ev.description}</div>}
                </li>
              ))}
              {(eventsByDate.get(selectedDate) ?? []).length === 0 && (
                <li className="text-sm text-gray-600">Tidak ada acara pada tanggal ini.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}