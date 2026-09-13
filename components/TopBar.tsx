"use client";

import { useActiveChapter } from "@/context/ActiveChapterContext";

const STORY_LABEL = "TRANSFORMASI DI BALIK DEMAM NIKEL SULAWESI TENGAH";

export default function TopBar() {
  const { activeIndex, totalChapters } = useActiveChapter();
  const progress = totalChapters <= 1 ? 0 : (activeIndex / (totalChapters - 1)) * 100;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center gap-4 px-[3.5vw] py-[2.2vh] md:py-[2.6vh]">
      <p className="hidden shrink-0 whitespace-nowrap text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-cream/70 sm:block md:text-[0.68rem]">
        {STORY_LABEL}
      </p>
      <div className="relative h-px flex-1 bg-cream/15">
        <div
          className="absolute left-0 top-0 h-px bg-cyan transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 8px rgba(0,229,255,0.7)" }}
        />
      </div>
      <p className="shrink-0 whitespace-nowrap text-[0.68rem] font-semibold tracking-[0.1em] text-cream/80">
        {String(activeIndex).padStart(2, "0")} / {totalChapters}
      </p>
    </div>
  );
}
