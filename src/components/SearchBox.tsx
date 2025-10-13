"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';

function useDebouncedQuery(delay = 450, minChars = 2) {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSent = useRef<string>('');

  const normalized = useMemo(() => input.trim().replace(/\s+/g, ' '), [input]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (normalized.length < minChars) {
      setQuery(null);
      return;
    }
    timer.current = setTimeout(() => {
      const term = normalized.toLowerCase();
      if (term && term !== lastSent.current) {
        setQuery(term);
        lastSent.current = term;
      }
    }, delay);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [normalized, delay, minChars]);

  return { input, setInput, query, setQuery, lastSent };
}

export default function SearchBox({ submitOnEnter = false }: { submitOnEnter?: boolean }) {
  const { input, setInput, query, setQuery, lastSent } = useDebouncedQuery(450, 2);
  const [results, setResults] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortRef.current) {
      try { abortRef.current.abort(); } catch {}
    }
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal: ac.signal });
        if (!res.ok) return;
        const data = (await res.json()) as { items?: unknown[] } | null;
        setResults(data?.items ?? []);
      } catch (err: unknown) {
        const e = err as { name?: string } | undefined;
        if (e?.name === 'AbortError') return;
        // ignore other errors
      } finally {
        setLoading(false);
      }
    })();
    return () => { try { ac.abort(); } catch {} };
  }, [query]);

  return (
    <div className="relative">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (submitOnEnter && e.key === 'Enter') {
            const term = (e.currentTarget as HTMLInputElement).value.trim().replace(/\s+/g, ' ').toLowerCase();
            if (term && term !== lastSent.current) {
              lastSent.current = term;
              setQuery(term);
            }
          }
        }}
        placeholder="Search collections, e.g. museum"
        className="w-full h-10 rounded-md bg-white/80 backdrop-blur px-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        inputMode="search"
        aria-label="Search"
      />

      <div aria-live="polite" className="absolute right-2 top-2 text-xs text-gray-500">
        {loading ? 'Searching…' : ''}
      </div>

      {results.length > 0 && (
        <ul className="mt-2 bg-white shadow rounded-md divide-y">
          {results.map((r, i) => {
            const obj = r as Record<string, unknown>;
            const text = (obj['title'] as string) ?? (obj['name'] as string) ?? (obj['id'] as string) ?? JSON.stringify(obj);
            return (
              <li key={i} className="p-2 text-sm">{text}</li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
