"use client";

import ChapterSection from "@/components/ChapterSection";
import GlassCard from "@/components/GlassCard";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { TrendingUp, MapPin, Users } from "lucide-react";

const COLUMNS = [
  {
    icon: TrendingUp,
    title: "Bukti Transformasi",
    points: [
      "Industri pengolahan naik jadi tulang punggung ekonomi",
      "PDRB dan PDRB per kapita melonjak",
      "Bobot ekonomi Sulteng di kawasan Sulawesi membesar",
    ],
  },
  {
    icon: MapPin,
    title: "Bukti Konsentrasi",
    points: [
      "Morowali menyumbang 45,45% PDRB provinsi",
      "Industri pengolahan didominasi logam dasar",
      "Ketimpangan antarwilayah stabil tinggi",
    ],
  },
  {
    icon: Users,
    title: "Bukti Belum Menyebar ke Kesejahteraan",
    points: [
      "Konsumsi rumah tangga tumbuh lebih lambat",
      "Kemiskinan turun lambat",
      "Nilai tambah besar belum sebanding dengan penyerapan kerja",
    ],
  },
];

export default function Chapter14() {
  const active = useIsChapterActive(14);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={14} background="/assets/backgrounds/bg-3.webp">
      <div ref={containerRef} className="flex h-full flex-col justify-center gap-8">
        <div className="max-w-2xl">
          <ChapterKicker>CHAPTER 14</ChapterKicker>
          <ChapterHeadline>Transformasi yang Terkonsentrasi</ChapterHeadline>
          <ChapterBody>
            Kesimpulannya bukan sekadar transformasi atau konsentrasi,
            melainkan keduanya sekaligus: ekonomi berubah cepat, tetapi
            manfaatnya belum tersebar merata.
          </ChapterBody>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COLUMNS.map((col) => {
            const Icon = col.icon;
            return (
              <GlassCard key={col.title} className="reveal flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan/40 text-cyan">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <p className="mt-3 font-serif text-base font-bold text-cream md:text-lg">
                  {col.title}
                </p>
                <div className="hairline my-3" />
                <ul className="flex flex-col gap-2.5">
                  {col.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs leading-snug text-cream/75 md:text-[0.8rem]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                      {p}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </ChapterSection>
  );
}
