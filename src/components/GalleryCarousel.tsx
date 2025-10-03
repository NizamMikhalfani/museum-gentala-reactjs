'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import NextImage, { type StaticImageData } from 'next/image';

interface GalleryCarouselProps {
  images: (StaticImageData | string)[];
  height?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function GalleryCarousel({
  images,
  height = 480,
  autoPlay = false,
  autoPlayInterval = 5000,
}: GalleryCarouselProps) {
  const [index, setIndex] = useState(0);
  const pointer = useRef({ x: 0, y: 0 }); // normalized -0.5 .. 0.5
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  // autoplay
  useEffect(() => {
    if (!autoPlay) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => next(), autoPlayInterval);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [index, autoPlay, autoPlayInterval, next]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // pointer / mouse parallax
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) - 0.5; // -0.5 .. 0.5
      const ny = ((e.clientY - r.top) / r.height) - 0.5;
      pointer.current.x = nx;
      pointer.current.y = ny;
      setPx(nx);
      setPy(ny);
    };

    const onLeave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      setPx(0);
      setPy(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointercancel', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointercancel', onLeave);
    };
  }, []);

  // touch swipe (simple)
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    if (Math.abs(deltaX.current) > 50) {
      if (deltaX.current > 0) prev();
      else next();
    }
    startX.current = null;
    deltaX.current = 0;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="relative overflow-hidden rounded-lg bg-gray-100"
        style={{ height }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* slides */}
        <div
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((src, i) => {
            // parallax offset factor: larger for active slide, small for neighbors
            const offsetFactor = i === index ? 1 : 0.25;
            const translateX = (px * 20 * offsetFactor); // px movement
            const translateY = (py * 12 * offsetFactor); // py movement
            const scale = i === index ? 1.04 : 1.0;

            return (
              <div key={i} className="relative flex-shrink-0 w-full h-full">
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                  }}
                >
                  <NextImage
                    src={src as unknown as string}
                    alt={`Gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* controls */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white"
        >
          <svg className="w-5 h-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z" />
          </svg>
        </button>

        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 hover:bg-white"
        >
          <svg className="w-5 h-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" />
          </svg>
        </button>

        {/* dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}