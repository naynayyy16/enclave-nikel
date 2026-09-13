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

const QUARTERS = ["2024-Q1", "2024-Q2", "2025-Q1", "2025-Q2", "2026-Q1", "2026-Q2"];
const YOY = [10.24, 9.68, 8.94, 8.71, 8.32, 5.06];

const REASONS = [
  "Konvergensi ke laju nasional",
  "Pola musiman tidak menjelaskan semuanya",
  "Konsisten dengan sinyal ketenagakerjaan",
];

export default function Chapter10() {
  const active = useIsChapterActive(10);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data = {
    labels: QUARTERS,
    datasets: [
      {
        data: YOY,
        borderColor: COLORS.cyan,
        backgroundColor: "rgba(0,229,255,0.12)",
        pointBackgroundColor: (ctx: { dataIndex: number }) =>
          ctx.dataIndex === YOY.length - 1 ? COLORS.cyan : COLORS.teal,
        pointBorderColor: COLORS.navy,
        pointRadius: (ctx: { dataIndex: number }) => (ctx.dataIndex === YOY.length - 1 ? 7 : 4),
        pointHoverRadius: 8,
        borderWidth: 2.5,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = baseLineOptions({
    layout: { padding: { top: 30 } },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 10.5 } },
      },
      y: { display: false, min: 0, max: 14 },
    },
  });

  return (
    <ChapterSection index={10} background="/assets/backgrounds/bg-2.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 10</ChapterKicker>
            <ChapterHeadline>Deselerasi yang Tiba-Tiba Mempercepat</ChapterHeadline>
            <ChapterBody>
              Perlambatan pada 2026 bukan kejutan yang benar-benar mendadak.
              Ia merupakan kelanjutan logis dari momentum yang telah
              mendingin dan sinyal ketenagakerjaan yang lebih dulu melemah.
            </ChapterBody>
          </div>

          <div className="flex w-full max-w-sm shrink-0 flex-col gap-3">
            <GlassCard className="reveal">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
                Deselerasi Y-o-Y
              </p>
              <p className="mt-1 font-sans text-4xl font-extrabold text-cream">
                -<MetricCounter value={3.26} active={active} decimals={2} /> poin
              </p>
              <p className="mt-1 text-xs text-cream/65">
                Deselerasi Y-o-Y, Q1 &rarr; Q2 2026 (8,32% &rarr; 5,06%)
              </p>
            </GlassCard>

            <GlassCard className="reveal">
              <ol className="flex flex-col gap-2.5">
                {REASONS.map((r, i) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan/50 text-[0.6rem] font-bold text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs leading-snug text-cream/80">{r}</span>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </div>
        </div>

        <div className="reveal flex-1">
          <p className="text-xs font-bold text-cream md:text-sm">Pertumbuhan Ekonomi Sulawesi Tengah</p>
          <p className="text-[0.65rem] text-cream/55 md:text-xs">(y-o-y, persen)</p>
          <div className="mt-2 h-[190px] md:h-[230px]">
            {hasEntered && (
              <Line
                data={data}
                options={options}
                plugins={[
                  valueLabelPlugin({
                    formatter: (v) => `${formatIDTrim(v, 2)}%`,
                    offset: 14,
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
