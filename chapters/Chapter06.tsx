"use client";

import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import MetricCounter from "@/components/MetricCounter";
import MapVisualization from "@/components/MapVisualization";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";

const LEGEND = [
  { label: "> 30%", opacity: 1 },
  { label: "10% – 30%", opacity: 0.78 },
  { label: "5% – 10%", opacity: 0.58 },
  { label: "1% – 5%", opacity: 0.4 },
  { label: "< 1%", opacity: 0.24 },
];

const TOP3 = [
  { name: "Morowali", value: 45.45 },
  { name: "Banggai", value: 10.72 },
  { name: "Morowali Utara", value: 9.11 },
];

const TOP5_EXTRA = [
  { name: "Palu", value: 8.45 },
  { name: "Parigi Moutong", value: 6.14 },
];

export default function Chapter06() {
  const active = useIsChapterActive(6);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={6} background="/assets/backgrounds/bg-1.webp" bgStrength="subtle">
      <div ref={containerRef} className="grid h-full grid-cols-1 lg:grid-cols-[1.05fr_1.3fr_0.85fr] lg:gap-4">
        {/* Left column: headline + body + legend */}
        <div className="flex flex-col justify-between">
          <div>
            <ChapterKicker>CHAPTER 06</ChapterKicker>
            <ChapterHeadline size="md">Konsentrasi di Balik Angka Provinsi</ChapterHeadline>
            <ChapterBody>
              Sebagian besar nilai ekonomi Sulawesi Tengah terkonsentrasi di
              Kabupaten Morowali, seiring berkembangnya industri nikel dan
              rantai pasoknya. Sementara itu, 12 kabupaten/kota lainnya
              memberikan kontribusi yang jauh lebih kecil terhadap
              perekonomian provinsi.
            </ChapterBody>
          </div>

          <GlassCard className="reveal hidden max-w-xs lg:block">
            <p className="text-xs font-bold text-cream">
              Kontribusi PDRB terhadap Sulawesi Tengah
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {LEGEND.map((l) => (
                <div key={l.label} className="flex items-center gap-2.5">
                  <span
                    className="h-3 w-3 rounded-sm"
                    style={{ background: `rgba(0,229,255,${l.opacity})` }}
                  />
                  <span className="text-xs text-cream/75">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-cream/10">
              <p className="text-[0.65rem] font-semibold text-cream/55 uppercase tracking-wide mb-2">Data Pendukung (2025)</p>
              {TOP5_EXTRA.map((t) => (
                 <div key={t.name} className="flex justify-between text-xs text-cream/70 mb-1">
                   <span>{t.name}</span>
                   <span className="font-semibold">{t.value}%</span>
                 </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Center: dominant map visual */}
        <div className="reveal flex items-center justify-center py-2">
          <MapVisualization active={active} className="max-w-[420px] lg:max-w-[480px]" />
        </div>

        {/* Right column: metric + top3 */}
        <div className="flex flex-col justify-between gap-4">
          <GlassCard className="reveal" glow>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream/55">
              Kontribusi PDRB
            </p>
            <p className="mt-1 font-sans text-5xl font-extrabold text-cream">
              <MetricCounter value={45.45} active={active} decimals={2} />%
            </p>
            <p className="mt-1 text-xs leading-snug text-cream/65">
              Morowali terhadap Sulawesi Tengah, 2025
            </p>
            <div className="hairline my-3" />
            <p className="text-xs text-cream/65">Median pertumbuhan 13 kab/kota:</p>
            <p className="mt-1 font-sans text-2xl font-extrabold text-cream">
              <MetricCounter value={4.18} active={active} decimals={2} />%
            </p>
            <p className="mt-3 text-[0.6rem] text-cream/40">Sumber: BPS Sulteng, Tabel PDRB Kabupaten/Kota 2025 (ADHB)</p>
          </GlassCard>

          <GlassCard className="reveal">
            <p className="text-xs font-bold text-cream">Top 3 Kabupaten berdasarkan PDRB</p>
            <div className="mt-3 flex flex-col gap-3">
              {TOP3.map((t, i) => (
                <div key={t.name}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-cream/80">
                      {i + 1}. {t.name}
                    </span>
                    <span className="font-semibold text-cream">
                      <MetricCounter value={t.value} active={active} decimals={2} />%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-cream/10">
                    <div
                      className="h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: active ? `${(t.value / 45.45) * 100}%` : "0%",
                        background: i === 0 ? "#00E5FF" : "#15616D",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Mobile-only legend */}
        <GlassCard className="reveal mt-4 max-w-xs lg:hidden">
          <p className="text-xs font-bold text-cream">Kontribusi PDRB terhadap Sulawesi Tengah</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {LEGEND.map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ background: `rgba(0,229,255,${l.opacity})` }}
                />
                <span className="text-xs text-cream/75">{l.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </ChapterSection>
  );
}
