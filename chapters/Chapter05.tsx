"use client";

import { Bar } from "react-chartjs-2";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, baseBarOptions, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

const PROVINCES = ["Sulteng", "Sultra", "Gorontalo", "Sulut", "Sulsel", "Sulbar"];
const SHARES = [24.33, 17.56, 12.14, 11.98, 11.67, 6.31];

export default function Chapter05() {
  const active = useIsChapterActive(5);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data = {
    labels: PROVINCES.map((p, i) => `${i + 1}. ${p}`),
    datasets: [
      {
        data: SHARES,
        backgroundColor: SHARES.map((_, i) => (i === 0 ? COLORS.cyan : COLORS.teal)),
        borderRadius: 4,
        barThickness: 16,
      },
    ],
  };

  const options = baseBarOptions({
    indexAxis: "y" as const,
    scales: {
      x: { display: false, min: 0, max: 30 },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: COLORS.cream,
          font: (ctx) => ({
            size: 12,
            weight: ctx.index === 0 ? (700 as const) : (500 as const),
          }),
        },
      },
    },
  });

  return (
    <ChapterSection index={5} background="/assets/backgrounds/bg-3.webp">
      <div ref={containerRef} className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 05</ChapterKicker>
            <ChapterHeadline>Pusat Pertumbuhan Ekonomi Baru di Sulawesi</ChapterHeadline>
            <ChapterBody>
              Di tingkat regional, Sulawesi Tengah tidak hanya tumbuh cepat,
              tetapi juga memperbesar bobot ekonominya di kawasan Sulawesi.
            </ChapterBody>
          </div>

          <GlassCard className="reveal w-full max-w-xs shrink-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              Pangsa Ekonomi Sulawesi
            </p>
            <p className="mt-1 font-sans text-4xl font-extrabold text-cream">
              <MetricCounter value={24.33} active={active} decimals={2} />%
            </p>
            <p className="mt-1 text-xs leading-snug text-cream/65">
              Pangsa Sulteng dalam ekonomi Sulawesi, 2025 naik dari{" "}
              <span className="font-bold text-cream">21,16%</span>
            </p>
            <div className="hairline my-3" />
            <p className="font-sans text-2xl font-extrabold text-cream">
              <MetricCounter value={1.62} active={active} decimals={2} />x
            </p>
            <p className="mt-1 text-xs text-cream/65">
              PDRB per kapita Sulteng vs rata-rata kawasan Sulawesi
            </p>
          </GlassCard>
        </div>

        <GlassCard className="reveal">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-cream md:text-sm">
            Pangsa PDRB Provinsi di Sulawesi, 2025
          </p>
          <p className="text-[0.65rem] text-cream/55 md:text-xs">(persen dari total PDRB kawasan)</p>
          <div className="mt-3 h-[240px] md:h-[260px]">
            {hasEntered && (
              <Bar
                data={data}
                options={options}
                plugins={[valueLabelPlugin({ formatter: (v) => `${formatIDTrim(v, 2)}%` })]}
              />
            )}
          </div>
        </GlassCard>
      </div>
    </ChapterSection>
  );
}
