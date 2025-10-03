'use client';

import { useEffect, useState } from 'react';

export default function VisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/visits', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setVisits(data.count));
  }, []);

  return (
    <div>
      {visits !== null ? `Total Visitors: ${visits}` : 'Loading...'}
    </div>
  );
}
