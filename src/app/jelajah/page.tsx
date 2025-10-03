'use client';

import { useState } from 'react';
import Viewer360 from '@/components/Viewer360';
import { panoramaImages } from '@/lib/jelajah-data';

export default function JelajahPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % panoramaImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? panoramaImages.length - 1 : prevIndex - 1
    );
  };

  const currentImage = panoramaImages[currentIndex];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <Viewer360 imageUrl={currentImage.url} />
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={handlePrev}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          aria-label="Previous image"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          aria-label="Next image"
        >
          &#10095;
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <h2 className="text-lg font-bold">{currentImage.title}</h2>
      </div>
    </div>
  );
}
