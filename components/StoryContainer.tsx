"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ActiveChapterContext } from "@/context/ActiveChapterContext";
import TopBar from "./TopBar";
import PaginationDots from "./PaginationDots";
import FooterBar from "./FooterBar";

interface StoryContainerProps {
  children: ReactNode;
  totalChapters: number;
}

export default function StoryContainer({ children, totalChapters }: StoryContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("[data-chapter-index]")
    );
    if (!sections.length) return;

    // Initial check for deep linking / refresh
    const center = window.innerHeight / 2;
    let bestIdx = 0, bestDist = Infinity;
    sections.forEach((s) => {
      const rect = s.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - center);
      if (dist < bestDist) { 
        bestDist = dist; 
        bestIdx = Number(s.getAttribute("data-chapter-index")); 
      }
    });
    setActiveIndex(bestIdx);


    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-chapter-index"));
          ratios.set(idx, entry.intersectionRatio);
        });
        let bestIdx = activeIndex;
        let bestRatio = 0;
        ratios.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        if (bestRatio > 0.4) {
          setActiveIndex(bestIdx);
        }
      },
      {
        root,
        threshold: [0, 0.25, 0.5, 0.55, 0.6, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToChapter = useCallback((index: number) => {
    const root = containerRef.current;
    if (!root) return;
    const target = root.querySelector<HTMLElement>(`[data-chapter-index="${index}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <ActiveChapterContext.Provider value={{ activeIndex, totalChapters, goToChapter }}>
      <TopBar />
      <PaginationDots />
      <FooterBar />
      <div ref={containerRef} className="story-scroll relative">
        {children}
      </div>
    </ActiveChapterContext.Provider>
  );
}
