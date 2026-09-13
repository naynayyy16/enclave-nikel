"use client";

import { Bar } from "react-chartjs-2";
import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { COLORS, baseBarOptions, valueLabelPlugin } from "@/lib/chartSetup";
import { formatIDTrim } from "@/lib/format";

const CATEGORIES = ["Industri Pengolahan", "Pertanian", "Pertambangan", "Konstruksi", "Perdagangan"];
const Y2021 = [33.79, 16.28, 11.06, 6.94, 6.51];
const Y2025 = [41.24, 13.09, 10.31, 7.73, 6.88];

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
                <p className="text-[0.65rem] text-cream/55 md:text-xs">2021 vs 2025 (persen)</p>
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
              Industri Pengolahan +7,45 poin
            </p>
          </GlassCard>

          <GlassCard className="reveal flex flex-col justify-center">
            <span className="text-3xl text-cyan/70 font-serif leading-none">&ldquo;</span>
            <p className="mt-1 font-serif text-base italic leading-snug text-cream md:text-lg">
              &hellip;pesatnya industri logam dasar di Kabupaten Morowali dan
              Morowali Utara.
            </p>
            <div className="hairline my-3" />
            <p className="text-xs text-cream/55">Sumber: BPS, hal. 74</p>
          </GlassCard>
        </div>
      </div>
    </ChapterSection>
  );
}
