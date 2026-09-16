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

const YEARS = ["2021", "2022", "2023", "2024", "2025"];
const WILLIAMSON = [1.36, 1.53, 1.52, 1.53, 1.51];

export default function Chapter07() {
  const active = useIsChapterActive(7);
  const { containerRef, hasEntered } = useChapterReveal<HTMLDivElement>(active);

  const data = {
    labels: YEARS,
    datasets: [
      {
        data: WILLIAMSON,
        backgroundColor: COLORS.tealLight,
        borderRadius: 4,
        barThickness: 26,
      },
    ],
  };

  const options = baseBarOptions({
    layout: { padding: { top: 24 } },
    scales: {
      x: { grid: { display: false }, border: { display: false } },
      y: { min: 0, max: 2, ticks: { color: COLORS.creamDim, font: { size: 10.5 } } },
    },
  });

  return (
    <ChapterSection index={7} background="/assets/backgrounds/bg-2.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 07</ChapterKicker>
            <ChapterHeadline>Ketimpangan Antarwilayah Tetap Tinggi</ChapterHeadline>
            <ChapterBody>
              Dua indikator independen menunjukkan hal yang sama: ketimpangan
              antarwilayah di Sulawesi Tengah bukan sekadar sementara, tetapi
              struktural.
            </ChapterBody>
          </div>

          <GlassCard className="reveal w-full max-w-xs shrink-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              Indeks Williamson 2025
            </p>
            <p className="mt-1 font-sans text-4xl font-extrabold text-cream">
              <MetricCounter value={1.51} active={active} decimals={2} />
            </p>
            <p className="mt-1 text-xs text-cream/65">dari 1,36 di 2021</p>
          </GlassCard>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          <GlassCard className="reveal flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-cream">
              Indeks Williamson Sulawesi Tengah
            </p>
            <p className="mt-1 text-[0.65rem] font-semibold text-cyan">
              Tren 2021&rarr;2025: naik. Pergerakan 2024&rarr;2025: turun tipis (1,53&rarr;1,51)
            </p>
            <div className="mt-2 min-h-[160px] flex-1">
              {hasEntered && (
                <Bar
                  data={data}
                  options={options}
                  plugins={[valueLabelPlugin({ formatter: (v) => formatIDTrim(v, 2) })]}
                />
              )}
            </div>
            <p className="mt-2 text-[0.6rem] text-cream/40">
              *Tren jangka panjang (2021&rarr;2025) meningkat; pergerakan terakhir (2024&rarr;2025) turun tipis.
              Sumber: BPS Sulteng, Indeks Williamson antar-kabupaten.
            </p>
          </GlassCard>

          <GlassCard className="reveal flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-cream">
              Tipologi Klassen Kabupaten di Sulawesi Tengah
            </p>
            <div className="relative mt-3 grid flex-1 min-h-[190px] grid-cols-2 grid-rows-2 gap-1.5 text-[0.62rem] md:text-[0.7rem]">
              {/* Quadrant II: Maju tapi Tertekan */}
              <div className="rounded-md border border-cream/10 bg-cream/[0.02] p-2.5">
                <p className="font-semibold text-cream/70">Maju tapi Tertekan</p>
              </div>
              {/* Quadrant I: Maju & Cepat */}
              <div className="relative rounded-md border border-cyan/20 bg-cyan/[0.04] p-2.5">
                <p className="font-semibold text-cream/70">Maju &amp; Cepat</p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-cyan/50 bg-navy/70 px-2 py-0.5 font-semibold text-cyan">
                  Morowali Utara
                </span>
                <p className="mt-1 text-cyan/80">&#8599; naik ke Kuadran I</p>
              </div>
              {/* Quadrant III: Tertinggal */}
              <div className="relative rounded-md border border-orange-400/20 bg-orange-400/[0.04] p-2.5">
                <p className="font-semibold text-cream/70">Tertinggal</p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-orange-400/50 bg-navy/70 px-2 py-0.5 font-semibold text-orange-300">
                  Banggai
                </span>
                <p className="mt-1 text-orange-300/80">&#8600; turun ke Kuadran III</p>
              </div>
              {/* Quadrant IV: Berkembang Cepat */}
              <div className="rounded-md border border-cream/10 bg-cream/[0.02] p-2.5">
                <p className="font-semibold text-cream/70">Berkembang Cepat</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between text-[0.6rem] text-cream/45">
              <span>&larr; Pendapatan per kapita rendah</span>
              <span>Pendapatan per kapita tinggi &rarr;</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </ChapterSection>
  );
}
