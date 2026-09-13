"use client";

import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";

export default function Chapter02() {
  const active = useIsChapterActive(2);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  const cards: {
    label: string;
    node: React.ReactNode;
  }[] = [
    {
      label: "PDRB ADHB 2025",
      node: (
        <>
          Rp<MetricCounter value={415.48} active={active} decimals={2} /> T
        </>
      ),
    },
    {
      label: "PERTUMBUHAN C-TO-C",
      node: (
        <>
          <MetricCounter value={8.47} active={active} decimals={2} />%
        </>
      ),
    },
    {
      label: "PDRB PER KAPITA",
      node: (
        <>
          Rp<MetricCounter value={131.64} active={active} decimals={2} /> juta
        </>
      ),
    },
    {
      label: "RANKING PERTUMBUHAN NASIONAL",
      node: <>Tertinggi ke-2</>,
    },
    {
      label: "KONTRIBUSI INDUSTRI PENGOLAHAN",
      node: (
        <>
          <MetricCounter value={41.2} active={active} decimals={1} />%
        </>
      ),
    },
  ];

  return (
    <ChapterSection index={2} background="/assets/backgrounds/bg-3.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between">
        <div className="max-w-2xl">
          <ChapterKicker>CHAPTER 02</ChapterKicker>
          <ChapterHeadline>Sulawesi Tengah dalam Lima Angka</ChapterHeadline>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {cards.map((c) => (
            <GlassCard key={c.label} className="reveal">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-cream/55 md:text-[0.68rem]">
                {c.label}
              </p>
              <p className="mt-2.5 font-serif text-2xl font-bold text-cream sm:text-3xl md:text-[2.1rem]">
                {c.node}
              </p>
              <div className="hairline mt-3 max-w-[3.5rem]" />
            </GlassCard>
          ))}
        </div>

        <ChapterBody className="reveal max-w-2xl border-l-2 border-cream/25 pl-4">
          Angka-angka ini akan dipecah lebih dalam di layar-layar berikutnya —
          untuk melihat siapa sebenarnya yang menikmati pertumbuhan ini.
        </ChapterBody>
      </div>
    </ChapterSection>
  );
}
