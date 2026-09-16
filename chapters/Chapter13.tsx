"use client";

import { Chart } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

const YEARS = ["2021", "2022", "2023", "2024", "2025"];
const INFLASI = [2.1, 4.35, 6.55, 3.21, 2.98];
const KEMISKINAN = [12.18, 11.95, 12.41, 11.4, 10.92];

export default function Chapter13() {
  const active = useIsChapterActive(13);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data: ChartData<"bar" | "line"> = {
    labels: YEARS,
    datasets: [
      {
        type: "bar" as const,
        label: "Inflasi IHK Makanan (persen, y-on-y)",
        data: INFLASI,
        backgroundColor: COLORS.tealLight,
        borderRadius: 4,
        barThickness: 26,
        yAxisID: "y",
        order: 2,
      },
      {
        type: "line" as const,
        label: "Tingkat Kemiskinan (P0) (persen)",
        data: KEMISKINAN,
        borderColor: COLORS.cyan,
        backgroundColor: "transparent",
        pointBackgroundColor: COLORS.cyan,
        pointBorderColor: COLORS.navy,
        pointRadius: 4,
        borderWidth: 2.5,
        tension: 0.3,
        yAxisID: "y1",
        order: 1,
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1100, easing: "easeOutQuart" },
    layout: { padding: { top: 40 } },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 21, 36, 0.92)",
        titleColor: COLORS.cream,
        bodyColor: COLORS.cream,
        borderColor: "rgba(0, 229, 255, 0.35)",
        borderWidth: 1,
      },
    },
    scales: {
      x: { grid: { display: false }, border: { display: false }, ticks: { color: COLORS.creamDim } },
      y: {
        min: 0,
        max: 10,
        grid: { color: COLORS.gridline },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 10.5 } },
      },
      y1: {
        min: 8,
        max: 18,
        position: "right",
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 10.5 } },
      },
    },
  };

  return (
    <ChapterSection index={13} background="/assets/backgrounds/bg-2.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 13</ChapterKicker>
            <ChapterHeadline>Lambat Turun di Tengah Boom</ChapterHeadline>
            <ChapterBody>
              Meski pertumbuhan ekonomi sangat tinggi, penurunan kemiskinan
              berlangsung lambat. Bahkan saat inflasi pangan melonjak,
              tingkat kemiskinan sempat memburuk.
            </ChapterBody>
          </div>

          <GlassCard className="reveal w-full max-w-xs shrink-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              Tingkat Kemiskinan (P0)
            </p>
            <p className="mt-1 font-sans text-4xl font-extrabold text-cream">
              <MetricCounter value={10.92} active={active} decimals={2} />%
            </p>
            <p className="mt-1 text-xs text-cream/65">
              dari 12,18% di 2021, sempat memburuk ke 12,41% di 2023
            </p>
          </GlassCard>
        </div>

        <div className="reveal flex-1">
          <p className="text-xs font-bold text-cream md:text-sm">
            Inflasi IHK Makanan dan Tingkat Kemiskinan (P0)
          </p>
          <div className="mt-2 flex items-center gap-6 text-[0.65rem] text-cream/70 md:text-xs">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS.tealLight }} />
              Inflasi IHK Makanan
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1 w-4 rounded-full" style={{ background: COLORS.cyan }} />
              Tingkat Kemiskinan (P0)
            </span>
          </div>
          <div className="mt-2 h-[200px] md:h-[240px]">
            {hasEntered && (
              <Chart
                type="bar"
                data={data}
                options={options}
                plugins={[
                  valueLabelPlugin({
                    formatter: (v, ctx) => `${formatIDTrim(v, 2)}%`,
                    color: (ctx) => ctx.datasetIndex === 0 ? COLORS.cream : COLORS.cyan,
                    offset: (ctx) => (ctx.datasetIndex === 0 && ctx.dataIndex === 2) ? 8 : 12,
                    align: (ctx) => {
                      if (ctx.datasetIndex === 0) {
                        return ctx.dataIndex === 2 ? "bottom" : "top";
                      }
                      return "bottom";
                    },
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
