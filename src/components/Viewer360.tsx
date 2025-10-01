"use client";
import { useEffect, useRef } from "react";

export default function Viewer360({ imageUrl }: { imageUrl: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      // Import pannellum JS and CSS on client
      const pannellum = await import("pannellum/build/pannellum.js");
      await import("pannellum/build/pannellum.css");

      if (containerRef.current) {
        const viewer = pannellum.viewer(containerRef.current, {
          type: "equirectangular",
          panorama: imageUrl,
          autoLoad: true,
          showZoomCtrl: true,
          compass: true,
          hfov: 110,
          pitch: 10,
          yaw: 180,
        });
        cleanup = () => {
          try {
            if (typeof viewer.destroy === "function") {
              viewer.destroy();
            }
          } catch {
            // ignore
          }
        };
      }
    })();
    return () => {
      if (cleanup) cleanup();
    };
  }, [imageUrl]);

  return (
    <div className="w-full h-[calc(100vh-4rem-var(--footer-height,3rem))]">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
