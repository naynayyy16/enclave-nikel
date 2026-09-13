"use client";

import { useActiveChapter } from "@/context/ActiveChapterContext";

export default function PaginationDots() {
  const { activeIndex, totalChapters, goToChapter } = useActiveChapter();

  return (
    <div className="fixed right-[1.6vw] top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-[7px] md:flex">
      {Array.from({ length: totalChapters }).map((_, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={i}
            type="button"
            aria-label={`Ke chapter ${i}`}
            onClick={() => goToChapter(i)}
            className="group relative flex h-3 w-3 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-[7px] w-[7px] bg-cyan shadow-[0_0_10px_2px_rgba(0,229,255,0.75)]"
                  : "h-[5px] w-[5px] bg-cream/30 group-hover:bg-cream/60"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
