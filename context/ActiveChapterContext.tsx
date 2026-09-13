"use client";

import { createContext, useContext } from "react";

export interface ActiveChapterState {
  activeIndex: number;
  totalChapters: number;
  goToChapter: (index: number) => void;
}

export const ActiveChapterContext = createContext<ActiveChapterState>({
  activeIndex: 0,
  totalChapters: 16,
  goToChapter: () => {},
});

export function useActiveChapter() {
  return useContext(ActiveChapterContext);
}

/** Convenience hook: is a given chapter index currently the active one */
export function useIsChapterActive(index: number) {
  const { activeIndex } = useActiveChapter();
  return activeIndex === index;
}
