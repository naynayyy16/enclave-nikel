"use client";

import { useEffect, useRef, useState } from "react";

interface MapVisualizationProps {
  active: boolean;
  className?: string;
}

/**
 * Renders the pre-built transparent map asset (public/assets/map/peta.webp)
 * exactly as provided — no re-drawing of borders/labels. A soft cyan glow is
 * placed behind the Morowali landmass (its real centroid within the source
 * image) and animated in last, per the guideline's reveal order.
 */
export default function MapVisualization({ active, className = "" }: MapVisualizationProps) {
  const [entered, setEntered] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setEntered(true), 120);
      return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div
      ref={wrapRef}
      className={`relative aspect-square w-full transition-all duration-[900ms] ease-out ${
        entered ? "scale-100 opacity-100 blur-0" : "scale-95 opacity-0 blur-sm"
      } ${className}`}
    >
      {/* Morowali glow — centroid at ~54.4%, 51.2% of the source image */}
      <div
        className={`pulse-glow absolute h-[34%] w-[34%] rounded-full transition-opacity duration-700 ${
          entered ? "opacity-70" : "opacity-0"
        }`}
        style={{
          left: "54.4%",
          top: "51.2%",
          transform: "translate(-50%,-50%)",
          background:
            "radial-gradient(circle, rgba(0,229,255,0.75) 0%, rgba(0,229,255,0.25) 45%, rgba(0,229,255,0) 72%)",
          filter: "blur(6px)",
        }}
      />
      <img
        src="/assets/map/peta.webp"
        alt="Peta 13 kabupaten/kota Sulawesi Tengah"
        className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_30px_rgba(0,20,30,0.6)]"
      />
    </div>
  );
}
