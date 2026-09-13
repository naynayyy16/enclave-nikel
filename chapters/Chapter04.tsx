"use client";

import { Line, Bar } from "react-chartjs-2";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, baseBarOptions, baseLineOptions, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

const YEARS = ["2021", "2022", "2023", "2024", "2025"];
const PDRB = [167.8, 206.1, 266.8, 346.1, 433.0];
const GROWTH = [19.62, 29.9, 25.46, 19.12, 14.12];

export default function Chapter04() {
  const active = useIsChapterActive(4);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const lineData = {
    labels: YEARS,
    datasets: [
      {
        data: PDRB,
        borderColor: COLORS.cyan,
        backgroundColor: "rgba(0,229,255,0.14)",
        pointBackgroundColor: COLORS.cyan,
        pointBorderColor: COLORS.navy,
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const lineOptions = baseLineOptions({
    layout: { padding: { top: 28 } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 11 } },
      },
      y: {
        display: false,
        min: 0,
        max: 480,
      },
    },
  });

  const barData = {
    labels: YEARS,
    datasets: [
      {
        data: GROWTH,
        backgroundColor: COLORS.tealLight,
        borderRadius: 4,
        barThickness: 22,
      },
    ],
  };

  const barOptions = baseBarOptions({
    layout: { padding: { top: 22 } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 10.5 } },
      },
      y: { display: false, min: 0, max: 34 },
    },
  });

  return (
    <ChapterSection index={4} background="/assets/backgrounds/bg-2.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-3">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 04</ChapterKicker>
            <ChapterHeadline>PDRB Naik 68% dalam Lima Tahun</ChapterHeadline>
            <ChapterBody>
              Konsentrasi ekonomi bersifat berlapis: provinsi didominasi satu
              sektor, dan sektor itu didominasi satu subsektor tunggal.
            </ChapterBody>
          </div>

          <GlassCard className="reveal w-full max-w-xs shrink-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              Pangsa Sektor
            </p>
            <p className="mt-1 font-sans text-4xl font-extrabold text-cream">
              <MetricCounter value={80.73} active={active} decimals={2} />%
            </p>
            <p className="mt-1 text-xs leading-snug text-cream/65">
              Pangsa Industri Logam Dasar dalam Industri Pengolahan, 2025
            </p>
            <div className="hairline my-3" />
            <p className="font-sans text-2xl font-extrabold text-cream">
              <MetricCounter value={68} active={active} decimals={0} />%
            </p>
            <p className="mt-1 text-xs text-cream/65">kenaikan PDRB ADHB, 2021 &rarr; 2025</p>
          </GlassCard>
        </div>

        <div className="reveal">
          <p className="text-xs font-bold text-cream md:text-sm">PDRB ADHB 2021&ndash;2025</p>
          <p className="text-[0.65rem] text-cream/55 md:text-xs">(Triliun Rupiah)</p>
          <div className="mt-1 h-[170px] md:h-[200px]">
            {hasEntered && (
              <Line
                data={lineData}
                options={lineOptions}
                plugins={[
                  valueLabelPlugin({
                    formatter: (v) => formatIDTrim(v, 1),
                    offset: 14,
                  }),
                ]}
              />
            )}
          </div>
        </div>

        <div className="reveal">
          <p className="text-xs font-bold text-cream md:text-sm">Growth Industri Pengolahan per tahun</p>
          <p className="text-[0.65rem] text-cream/55 md:text-xs">(Persen, y-on-y)</p>
          <div className="mt-1 h-[100px] md:h-[120px]">
            {hasEntered && (
              <Bar
                data={barData}
                options={barOptions}
                plugins={[
                  valueLabelPlugin({
                    formatter: (v) => `${formatIDTrim(v, 2)}%`,
                    font: "700 10.5px Inter, sans-serif",
                    offset: 6,
                  }),
                ]}
              />
            )}
          </div>
          <div className="mt-1.5 flex justify-between text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-cyan/80 md:text-[0.65rem]">
            <span>&larr; Fase Boom</span>
            <span>Fase Normalisasi &rarr;</span>
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
