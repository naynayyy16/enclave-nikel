"use client";

import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { Factory, Sprout } from "lucide-react";

function MiniBar({
  label,
  value,
  max,
  active,
  color,
}: {
  label: string;
  value: number;
  max: number;
  active: boolean;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs text-cream/70">{label}</span>
        <span className="font-sans text-base font-bold text-cream">
          <MetricCounter value={value} active={active} decimals={value < 100 && value % 1 !== 0 ? 2 : 1} />%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-cream/10">
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: active ? `${(value / max) * 100}%` : "0%", background: color }}
        />
      </div>
    </div>
  );
}

export default function Chapter11() {
  const active = useIsChapterActive(11);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={11} background="/assets/backgrounds/bg-3.webp" bgStrength="subtle">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-4">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <ChapterKicker>CHAPTER 11</ChapterKicker>
            <ChapterHeadline>Nilai Tambah Besar, Penyerapan Kerja Kecil</ChapterHeadline>
            <ChapterBody>
              Struktur ekonomi Sulawesi Tengah memperlihatkan dualisme yang
              tajam: sektor bernilai tambah paling besar justru menyerap
              tenaga kerja relatif sedikit, sementara sektor padat karya
              memberi kontribusi PDRB yang jauh lebih kecil.
            </ChapterBody>
          </div>

          <div className="flex w-full max-w-sm shrink-0 flex-col gap-3">
            <GlassCard className="reveal">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
                Rasio Produktivitas Relatif
              </p>
              <p className="mt-1 font-sans text-3xl font-extrabold text-cream">
                <MetricCounter value={2.5} active={active} decimals={2} />x{" "}
                <span className="text-cream/50 text-xl">vs</span>{" "}
                <MetricCounter value={0.42} active={active} decimals={2} />x
              </p>
              <p className="mt-1 text-xs text-cream/65">Industri Pengolahan vs Pertanian, 2025</p>
            </GlassCard>
            <GlassCard className="reveal">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
                Elastisitas Kesempatan Kerja
              </p>
              <p className="mt-1 font-sans text-3xl font-extrabold text-cream">
                <MetricCounter value={0.01} active={active} decimals={2} />
              </p>
              <p className="mt-1 text-xs text-cream/65">Industri Pengolahan, 2024 (dari 1,06 di 2022)</p>
            </GlassCard>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          <GlassCard className="reveal flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan/40 text-cyan">
                <Factory className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-sans text-sm font-bold text-cream">Industri Pengolahan</p>
                <p className="text-[0.65rem] text-cream/55">Nilai tambah tinggi, penyerapan kerja rendah</p>
              </div>
            </div>
            <MiniBar label="Pangsa PDRB" value={41.24} max={45} active={active} color="#00E5FF" />
            <MiniBar label="Pangsa Tenaga Kerja" value={16.5} max={45} active={active} color="#00E5FF" />
          </GlassCard>

          <GlassCard className="reveal flex flex-col justify-center gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-light/60 text-teal-light">
                <Sprout className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-sans text-sm font-bold text-cream">Pertanian</p>
                <p className="text-[0.65rem] text-cream/55">Padat karya, nilai tambah lebih kecil</p>
              </div>
            </div>
            <MiniBar label="Pangsa PDRB" value={13.09} max={45} active={active} color="#1f8a99" />
            <MiniBar label="Pangsa Tenaga Kerja" value={31.2} max={45} active={active} color="#1f8a99" />
          </GlassCard>
        </div>
      </div>
    </ChapterSection>
  );
}
