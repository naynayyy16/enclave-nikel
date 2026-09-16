"use client";

import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";

export default function Chapter08() {
  const active = useIsChapterActive(8);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={8} background="/assets/backgrounds/bg-3.webp">
      <div ref={containerRef} className="flex h-full flex-col justify-center gap-8">
        <div className="max-w-2xl">
          <ChapterKicker>CHAPTER 08</ChapterKicker>
          <ChapterHeadline>PDRB per Kapita Tertinggi &ne; Kemiskinan Terendah</ChapterHeadline>
          <ChapterBody>
            PDRB per kapita yang sangat tinggi tidak otomatis mencerminkan
            kesejahteraan yang merata. Di ekonomi ekstraktif, kekayaan wilayah
            bisa terkonsentrasi tanpa sepenuhnya menurunkan kemiskinan.
          </ChapterBody>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,3fr)_minmax(240px,1.15fr)] lg:max-w-5xl">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <GlassCard className="reveal border-cyan/30" glow>
              <p className="text-sm font-semibold text-cream/70">Morowali</p>
              <p className="mt-2 font-serif text-3xl font-bold text-cream sm:text-4xl">
                Rp<MetricCounter value={927.23} active={active} decimals={2} /> juta
              </p>
              <p className="mt-1 text-xs text-cream/60">PDRB per kapita</p>
              <div className="hairline my-4" />
              <p className="font-serif text-3xl font-bold text-cream sm:text-4xl">
                <MetricCounter value={10.38} active={active} decimals={2} />%
              </p>
              <p className="mt-1 text-xs text-cream/60">Kemiskinan</p>
            </GlassCard>

            <GlassCard className="reveal border border-cream/15 bg-transparent backdrop-blur-sm">
              <p className="text-sm font-semibold text-cream/70">Kota Palu</p>
              <p className="mt-2 font-serif text-3xl font-bold text-cream sm:text-4xl">
                Rp<MetricCounter value={79.45} active={active} decimals={2} /> juta
              </p>
              <p className="mt-1 text-xs text-cream/60">PDRB per kapita</p>
              <div className="hairline my-4" />
              <p className="font-serif text-3xl font-bold text-cream sm:text-4xl">
                <MetricCounter value={5.26} active={active} decimals={2} />%
              </p>
              <p className="mt-1 text-xs text-cream/60">Kemiskinan</p>
            </GlassCard>
          </div>

          <div className="reveal flex flex-col justify-center gap-1 border-l border-cyan/20 pl-0 lg:pl-6">
            <p className="font-sans text-lg font-bold text-cream md:text-xl">
              11,7&times; rasio <span className="text-cyan">PDRB per kapita</span>
            </p>
            <p className="mt-1 text-xs text-cream/60 md:text-sm">
              Morowali vs Kota Palu &mdash; bukan rasio kemiskinan
            </p>
            <p className="mt-0.5 text-[0.65rem] text-cream/45">
              (Rasio kemiskinan Morowali/Palu &approx; 1,97&times; &mdash; berbeda metrik)
            </p>
            <p className="mt-4 text-[0.6rem] text-cream/40">
              Sumber: BPS, Kemiskinan Kabupaten/Kota Sulawesi Tengah 2025
            </p>
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
