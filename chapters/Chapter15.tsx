"use client";

import ChapterSection from "@/components/ChapterSection";
import { ChapterKicker, ChapterHeadline, ChapterBody } from "@/components/ChapterChrome";
import { useIsChapterActive } from "@/context/ActiveChapterContext";
import { useChapterReveal } from "@/hooks/useChapterReveal";
import { Factory, Mountain, Users, LineChart } from "lucide-react";

const RECOMMENDATIONS = [
  {
    num: "01",
    icon: Factory,
    text: "Perkuat hilirisasi yang lebih padat kerja dan terhubung ke UMKM lokal",
  },
  {
    num: "02",
    icon: Mountain,
    text: "Dorong pemerataan antarwilayah melalui infrastruktur, layanan dasar, dan konektivitas",
  },
  {
    num: "03",
    icon: Users,
    text: "Bangun transmisi ke rumah tangga melalui upah, peluang kerja, dan rantai pasok lokal",
  },
  {
    num: "04",
    icon: LineChart,
    text: "Pantau kualitas pertumbuhan dengan indikator kesejahteraan, bukan PDRB semata",
  },
];

export default function Chapter15() {
  const active = useIsChapterActive(15);
  const { containerRef } = useChapterReveal<HTMLDivElement>(active);

  return (
    <ChapterSection index={15} background="/assets/backgrounds/bg-4.webp" bgStrength="hero">
      <div ref={containerRef} className="flex h-full flex-col justify-between gap-6">
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          <div className="max-w-lg">
            <ChapterKicker>CHAPTER 15 / FINAL</ChapterKicker>
            <ChapterHeadline>Memperluas Transmisi Pertumbuhan</ChapterHeadline>
            <ChapterBody>
              Tantangan Sulawesi Tengah ke depan bukan menciptakan
              pertumbuhan baru, tetapi memastikan pertumbuhan yang sudah ada
              lebih banyak menetes ke wilayah lain, rumah tangga, dan
              kesempatan kerja.
            </ChapterBody>
          </div>

          <div className="reveal flex flex-col">
            {RECOMMENDATIONS.map((r, i) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.num}
                  className={`flex items-center gap-4 py-3.5 ${
                    i !== RECOMMENDATIONS.length - 1 ? "border-b border-cream/12" : ""
                  }`}
                >
                  <span className="font-serif text-3xl font-bold text-teal-light md:text-4xl">
                    {r.num}
                  </span>
                  <span className="h-9 w-px bg-cream/15" />
                  <Icon className="h-6 w-6 shrink-0 text-cyan" strokeWidth={1.4} />
                  <p className="text-xs leading-snug text-cream/85 md:text-sm">{r.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal max-w-3xl">
          <div className="hairline mb-4" />
          <p className="font-serif text-lg italic leading-relaxed text-cream md:text-2xl">
            &ldquo;Tantangan Sulawesi Tengah bukan menciptakan pertumbuhan
            baru, tetapi <span className="not-italic font-bold">memperluas transmisi
            pertumbuhan</span> yang sudah ada.&rdquo;
          </p>
        </div>
      </div>
    </ChapterSection>
  );
}
