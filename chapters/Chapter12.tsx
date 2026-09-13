"use client";

import { Line } from "react-chartjs-2";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, baseLineOptions, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

const YEARS = ["2021", "2022", "2023", "2024", "2025"];
const PDRB_RIIL = [11.7, 15.2, 11.9, 9.9, 8.5];
const PKRT_RIIL = [4.8, 4.4, 4.1, 3.9, 3.6];

export default function Chapter12() {
  const active = useIsChapterActive(12);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data = {
    labels: YEARS,
    datasets: [
      {
        label: "Pertumbuhan PDRB Riil",
        data: PDRB_RIIL,
        borderColor: COLORS.cyan,
        backgroundColor: "transparent",
        pointBackgroundColor: COLORS.cyan,
        pointBorderColor: COLORS.navy,
        pointRadius: 4,
        borderWidth: 2.5,
        tension: 0.35,
      },
      {
        label: "Pertumbuhan PKRT Riil",
        data: PKRT_RIIL,
        borderColor: COLORS.creamDim,
        backgroundColor: "transparent",
        pointBackgroundColor: COLORS.cream,
        pointBorderColor: COLORS.navy,
        pointRadius: 4,
        borderWidth: 2,
        borderDash: [4, 3],
        tension: 0.35,
      },
    ],
  };

  const options = baseLineOptions({
    layout: { padding: { top: 26, right: 90 } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 11 } },
      },
      y: { display: false, min: 0, max: 20 },
    },
  });

  return (
    <ChapterSection index={12} background="/assets/backgrounds/bg-1.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 12</ChapterKicker>
            <ChapterHeadline>
              PDRB Melesat, Konsumsi Rumah Tangga Jalan di Tempat
            </ChapterHeadline>
            <ChapterBody>
              Pertumbuhan agregat yang tinggi tidak sepenuhnya menetes ke
              rumah tangga. Ketika PDRB riil melesat, konsumsi rumah tangga
              justru bergerak jauh lebih datar.
            </ChapterBody>
          </div>

          <GlassCard className="reveal w-full max-w-xs shrink-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              Average Propensity to Consume
            </p>
            <p className="mt-1 font-sans text-4xl font-extrabold text-cream">
              <MetricCounter value={0.2764} active={active} decimals={4} />
            </p>
            <p className="mt-1 text-xs text-cream/65">
              Average Propensity to Consume (APC), 2025
            </p>
            <div className="hairline my-3" />
            <p className="text-xs text-cream/65">
              dari <span className="font-bold text-cream">0,3299</span> di 2021
            </p>
          </GlassCard>
        </div>

        <div className="reveal flex-1">
          <p className="text-xs font-bold text-cream md:text-sm">Pertumbuhan Riil</p>
          <p className="text-[0.65rem] text-cream/55 md:text-xs">(Persen, year-on-year)</p>
          <div className="mt-2 flex items-center gap-6 text-[0.65rem] text-cream/70 md:text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full" style={{ background: COLORS.cyan }} />
              Pertumbuhan PDRB Riil
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded-full border-t border-dashed" style={{ borderColor: COLORS.creamDim }} />
              Pertumbuhan PKRT Riil
            </span>
          </div>
          <div className="mt-2 h-[190px] md:h-[220px]">
            {hasEntered && (
              <Line
                data={data}
                options={options}
                plugins={[
                  valueLabelPlugin({
                    formatter: (v) => `${formatIDTrim(v, 1)}%`,
                    offset: 12,
                  }),
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
