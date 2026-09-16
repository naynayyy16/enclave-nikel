"use client";

import { useState } from "react";
import { useActiveChapter } from "@/context/ActiveChapterContext";
import { Hexagon, X } from "lucide-react";

const STORY_LABEL = "TRANSFORMASI DI BALIK DEMAM NIKEL SULAWESI TENGAH";

const CHAPTER_TITLES = [
  "Intro", "Sejarah KIM", "Sulteng 5 Angka", "Transformasi Sektor", "PDRB Naik 68%",
  "Pusat Ekonomi", "Konsentrasi", "Ketimpangan", "Paradoks Kemiskinan", "Siklus Boom",
  "Deselerasi", "Nilai Tambah & Kerja", "Konsumsi RT", "Inflasi vs Kemiskinan",
  "Kesimpulan", "Rekomendasi"
];

export default function TopBar() {
  const { activeIndex, totalChapters, goToChapter } = useActiveChapter();
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = totalChapters <= 1 ? 0 : (activeIndex / (totalChapters - 1)) * 100;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 flex items-center gap-4 px-[3.5vw] py-[2.2vh] md:py-[2.6vh]">
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Hexagon className="h-3.5 w-3.5 text-cyan" />
          <p className="whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/70 md:text-[0.68rem]">
            {STORY_LABEL}
          </p>
        </div>
        <div className="relative h-px flex-1 bg-cream/15 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#15616D] via-[#00E5FF] to-[#10b981] transition-all duration-500 ease-out shimmer"
            style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(0,229,255,0.7)" }}
          />
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          className="shrink-0 group flex items-center gap-2 hover:text-cyan transition-colors"
          aria-label="Open Chapter Menu"
        >
          <p className="whitespace-nowrap text-[0.68rem] font-semibold tracking-[0.1em] text-cream/80 group-hover:text-cyan transition-colors">
            {String(activeIndex).padStart(2, "0")} / {String(totalChapters).padStart(2, "0")}
          </p>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-navy/95 backdrop-blur-md flex flex-col justify-center items-center overflow-y-auto py-10">
          <button 
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-cream/70 hover:text-cyan transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          
          <h2 className="text-cyan font-serif text-2xl mb-8 tracking-widest uppercase">Pilih Chapter</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-6">
            {CHAPTER_TITLES.map((title, i) => (
              <button
                key={i}
                onClick={() => {
                  goToChapter(i);
                  setMenuOpen(false);
                }}
                className={`text-left p-4 rounded-lg border transition-all duration-300 ${
                  i === activeIndex 
                    ? "bg-cyan/10 border-cyan text-cyan" 
                    : "border-cream/10 hover:border-cyan/50 hover:bg-cream/5 text-cream/80"
                }`}
              >
                <div className="text-[0.65rem] uppercase tracking-wider mb-1 opacity-60">Chapter {String(i).padStart(2, "0")}</div>
                <div className="font-semibold text-sm md:text-base">{title}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
