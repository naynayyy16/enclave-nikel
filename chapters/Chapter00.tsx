"use client";

import ChapterSection from "@/components/ChapterSection";
import { ChapterKicker } from "@/components/ChapterChrome";
import MetricCounter from "@/components/MetricCounter";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";

export default function Chapter00() {
  const active = useIsChapterActive(0);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={0} background="/assets/backgrounds/bg-1.webp" bgStrength="hero">
      <div ref={containerRef} className="flex h-full flex-col justify-between">
        <div className="max-w-3xl">
          <ChapterKicker>CHAPTER 00</ChapterKicker>
          <h1 className="reveal font-serif font-bold text-cream text-balance mt-3 mb-5 text-[2.3rem] leading-[1.08] sm:text-[2.8rem] md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
            Ketika Satu Kabupaten Menopang Ekonomi Provinsi, Tapi Bukan Kesejahteraannya
          </h1>
          <p className="reveal max-w-xl text-cream/80 text-sm md:text-base leading-relaxed">
            Sulawesi Tengah tumbuh 8,47% pada 2025 — tertinggi ke-2 nasional.
            Tapi siapa sebenarnya yang menikmati pertumbuhan ini?
          </p>
        </div>

        <div className="reveal mt-10 max-w-xl">
          <div className="font-sans font-extrabold text-cream leading-none text-[3.2rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.2rem]">
            <span className="align-top text-[0.4em] font-bold mr-1">Rp</span>
            <MetricCounter value={415.48} active={active} decimals={2} />
            <span className="text-[0.4em] font-bold ml-2">T</span>
          </div>
          <div className="hairline mt-4 mb-3 max-w-[280px]" />
          <p className="text-xs md:text-sm uppercase tracking-[0.15em] text-cream/60">
            PDRB Sulawesi Tengah, 2025
          </p>
        </div>
      </div>
    </ChapterSection>
  );
}
