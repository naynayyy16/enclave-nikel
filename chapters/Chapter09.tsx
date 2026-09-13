"use client";

import { Bar } from "react-chartjs-2";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, baseBarOptions, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

const YEARS = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
const GROWTH = [20.6, 6.27, 4.86, 11.7, 15.22, 11.91, 9.89, 8.47];

// phase color per year index
const PHASE_COLOR = [
  COLORS.cream,
  COLORS.teal,
  COLORS.teal,
  COLORS.tealLight,
  COLORS.tealLight,
  COLORS.cyan,
  COLORS.cyan,
  COLORS.cyan,
];

const METRICS = [
  { value: "20,60%", label: "Lonjakan", sub: "Pertumbuhan tertinggi pada 2018" },
  { value: "4,86%", label: "Guncangan", sub: "Titik terendah pada 2020" },
  { value: "15,22%", label: "Re-akselerasi", sub: "Momentum kuat pada 2022" },
  { value: "8,47%", label: "Normalisasi", sub: "Pertumbuhan lebih terkendali pada 2025" },
];

export default function Chapter09() {
  const active = useIsChapterActive(9);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data = {
    labels: YEARS,
    datasets: [
      {
        data: GROWTH,
        backgroundColor: PHASE_COLOR,
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const options = baseBarOptions({
    layout: { padding: { top: 26 } },
    scales: {
      x: { grid: { display: false }, border: { display: false } },
      y: { display: false, min: 0, max: 24 },
    },
  });

  return (
    <ChapterSection index={9} background="/assets/backgrounds/bg-1.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <ChapterKicker>CHAPTER 09</ChapterKicker>
            <ChapterHeadline>Dari Boom ke Normalisasi</ChapterHeadline>
            <ChapterBody>
              Pertumbuhan Sulawesi Tengah menunjukkan pola khas ekonomi
              berbasis investasi besar: lonjakan awal, koreksi dan guncangan,
              re-akselerasi, lalu normalisasi yang lebih terkendali.
            </ChapterBody>
          </div>

          <div className="grid w-full grid-cols-2 gap-2.5 lg:max-w-lg lg:grid-cols-4">
            {METRICS.map((m) => (
              <GlassCard key={m.label} className="reveal !px-3.5 !py-3.5">
                <p className="font-sans text-xl font-extrabold text-cream md:text-2xl">{m.value}</p>
                <p className="mt-1 text-xs font-semibold text-cream/80">{m.label}</p>
                <p className="mt-1 text-[0.6rem] leading-snug text-cream/55">{m.sub}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="reveal flex-1">
          <p className="text-xs font-bold text-cream md:text-sm">Pertumbuhan Ekonomi Sulawesi Tengah</p>
          <p className="text-[0.65rem] text-cream/55 md:text-xs">(Persen, y-on-y)</p>
          <div className="mt-2 h-[190px] md:h-[230px]">
            {hasEntered && (
              <Bar
                data={data}
                options={options}
                plugins={[valueLabelPlugin({ formatter: (v) => `${formatIDTrim(v, 2)}%` })]}
              />
            )}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[0.58rem] font-semibold uppercase tracking-[0.06em] text-cyan/80 md:text-[0.65rem]">
            <span>Lonjakan Awal</span>
            <span>Koreksi &amp; Guncangan</span>
            <span>Re-akselerasi</span>
            <span>Normalisasi Terkendali</span>
          </div>
        </div>
      </div>
    </ChapterSection>
  );
}
