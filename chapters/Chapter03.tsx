"use client";

import { Bar, Doughnut } from "react-chartjs-2";
import { ArcElement, Chart as ChartJS, DoughnutController } from "chart.js";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, baseBarOptions, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

ChartJS.register(ArcElement, DoughnutController);

const CATEGORIES = ["Industri Pengolahan", "Pertanian", "Pertambangan", "Konstruksi", "Perdagangan"];
const Y2021 = [33.79, 16.28, 11.06, 6.94, 6.51];
const Y2025 = [41.24, 16.36, 10.31, 7.73, 6.88];
const SUBSECTOR_LABELS = ["Industri Logam Dasar", "Batubara & Pengilangan Minyak", "Makanan & Minuman", "Industri Lainnya"];
const SUBSECTOR_VALUES = [80.7, 11.6, 4.2, 3.5];
const SUBSECTOR_COLORS = [COLORS.teal, COLORS.tealLight, COLORS.cyan, COLORS.cream];

export default function Chapter03() {
  const active = useIsChapterActive(3);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data = {
    labels: CATEGORIES,
    datasets: [
      {
        label: "2021",
        data: Y2021,
        backgroundColor: COLORS.teal,
        borderRadius: 3,
        barThickness: 10,
      },
      {
        label: "2025",
        data: Y2025,
        backgroundColor: COLORS.cyan,
        borderRadius: 3,
        barThickness: 10,
      },
    ],
  };

  const options = baseBarOptions({
    indexAxis: "y" as const,
    scales: {
      x: { display: false, min: 0, max: 52 },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.cream, font: { size: 12, weight: 600 } },
      },
    },
  });

  const donutData = {
    labels: SUBSECTOR_LABELS,
    datasets: [
      {
        data: SUBSECTOR_VALUES,
        backgroundColor: SUBSECTOR_COLORS,
        borderColor: COLORS.navy,
        borderWidth: 3,
        hoverOffset: 5,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "55%",
    animation: { duration: 1100, easing: "easeOutQuart" as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 21, 36, 0.92)",
        titleColor: COLORS.cream,
        bodyColor: COLORS.cream,
        borderColor: "rgba(0, 229, 255, 0.35)",
        borderWidth: 1,
        callbacks: { label: (context: { label?: string; parsed: number }) => ` ${context.label}: ${formatIDTrim(context.parsed, 1)}%` },
      },
    },
  };

  return (
    <ChapterSection index={3} background="/assets/backgrounds/bg-1.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between">
        <div className="max-w-xl">
          <ChapterKicker>CHAPTER 03</ChapterKicker>
          <ChapterHeadline>Dari Pertanian ke Industri Pengolahan</ChapterHeadline>
          <ChapterBody>
            BPS secara eksplisit menegaskan bahwa pergeseran struktur ekonomi
            Sulawesi Tengah terutama ditopang pesatnya industri logam dasar di
            Morowali dan Morowali Utara.
          </ChapterBody>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-stretch">
          <GlassCard className="reveal">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="font-sans text-sm font-bold text-cream md:text-base">
                  Kontribusi Sektor terhadap PDRB Sulawesi Tengah
                </p>
                <p className="text-[0.65rem] text-cream/55 md:text-xs">2021 vs 2025 (persen, ADHB)</p>
              </div>
              <div className="flex items-center gap-3 text-[0.65rem] text-cream/70 md:text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS.teal }} />
                  2021
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: COLORS.cyan }} />
                  2025
                </span>
              </div>
            </div>
            <div className="mt-3 h-[220px] md:h-[240px]">
              {hasEntered && (
                <Bar
                  data={data}
                  options={options}
                  plugins={[
                    valueLabelPlugin({
                      formatter: (v) => formatIDTrim(v, 2),
                      font: "700 11px Inter, sans-serif",
                    }),
                  ]}
                />
              )}
            </div>
            <p className="mt-2 text-right text-xs font-semibold text-cyan">
              Industri Pengolahan +7,45 poin | Pertanian: 16,28% &rarr; 16,36% (ADHB)
            </p>
          </GlassCard>

          <GlassCard className="reveal flex h-full flex-col justify-center gap-3">
            <p className="text-center text-xs font-bold uppercase tracking-wide text-cream md:text-sm">
              Persentase Subsektor Industri Pengolahan
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <div className="relative h-44 w-44 shrink-0 md:h-52 md:w-52">
                {hasEntered && <Doughnut data={donutData} options={donutOptions} />}
              </div>
              <div className="flex w-full max-w-[230px] flex-col gap-2 text-[0.65rem] md:text-xs">
                {SUBSECTOR_LABELS.map((label, index) => (
                  <div key={label} className="flex items-start gap-2 text-cream/80">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: SUBSECTOR_COLORS[index] }} />
                    <span className="min-w-0 flex-1">{label}</span>
                    <span className="font-bold text-cream">{formatIDTrim(SUBSECTOR_VALUES[index], 1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-[0.6rem] text-cream/40">Sumber: BPS Sulteng, PDRB Seri 2010 ADHB 2025, Tabel 3</p>
          </GlassCard>
        </div>
      </div>
    </ChapterSection>
  );
}
