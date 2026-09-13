"use client";

import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";

const TIMELINE = [
  { year: "2013", label: "KIM berdiri", emphasis: false },
  { year: "2015", label: "ekspansi smelter", emphasis: false },
  { year: "2020", label: "larangan ekspor bijih nikel", emphasis: true },
  { year: "2025", label: "industri pengolahan 41,24% PDRB", emphasis: false },
];

export default function Chapter01() {
  const active = useIsChapterActive(1);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={1} background="/assets/backgrounds/bg-2.webp">
      <div ref={containerRef} className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 01</ChapterKicker>
            <ChapterHeadline>
              Dari Kawasan Industri ke Tulang Punggung Ekonomi
            </ChapterHeadline>
            <ChapterBody>
              Sejak Kawasan Industri Morowali berdiri, struktur ekonomi
              Sulawesi Tengah berubah signifikan — industri pengolahan naik
              dari 22,42% (2019) menjadi 41,24% (2025) dari PDRB.
            </ChapterBody>
          </div>

          <GlassCard className="reveal w-full max-w-sm lg:mt-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cream/60">
              Kontribusi Industri Pengolahan
            </p>
            <p className="mt-2 font-sans text-3xl font-extrabold text-cream sm:text-4xl">
              22,42% <span className="text-cyan">&rarr;</span> 41,24%
            </p>
            <p className="mt-1 text-xs text-cream/60">2019 vs 2025</p>
          </GlassCard>
        </div>

        {/* Timeline */}
        <div className="reveal mx-auto mt-8 w-full max-w-4xl lg:mt-4">
          <div className="relative flex items-start justify-between">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-cyan/40" />
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative z-10 flex w-1/4 flex-col items-center text-center px-1">
                <span
                  className={`rounded-full border-2 ${
                    t.emphasis
                      ? "h-5 w-5 border-cyan bg-cyan shadow-[0_0_16px_4px_rgba(0,229,255,0.55)]"
                      : "h-3.5 w-3.5 border-cyan/70 bg-navy"
                  }`}
                />
                <span
                  className={`mt-3 font-sans font-bold ${
                    t.emphasis ? "text-cyan text-lg md:text-xl" : "text-cream text-base md:text-lg"
                  }`}
                >
                  {t.year}
                </span>
                <span className="mt-1 max-w-[9rem] text-[0.65rem] leading-snug text-cream/70 md:text-xs">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal mt-8 flex justify-end lg:mt-4">
          <div className="max-w-sm border-l-2 border-cyan/60 pl-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-cyan">
              Pertanyaan Inti
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-cream/80 md:text-sm">
              Apakah lonjakan PDRB ini menyebar ke seluruh wilayah dan sektor,
              atau terperangkap di kantong spasial tertentu?
            </p>
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
