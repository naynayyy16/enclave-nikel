"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Plays a staggered fade + translate + blur-removal entrance animation on all
 * descendants marked with the `.reveal` class, the first time `active`
 * becomes true. Subsequent re-entries do not replay (keeps the story feeling
 * calm rather than gimmicky), matching the "400-900ms, no bounce" guidance.
 */
export function useChapterReveal<T extends HTMLElement>(active: boolean) {
  const containerRef = useRef<T | null>(null);
  const hasPlayed = useRef(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (!hasEntered) setHasEntered(true);
    if (hasPlayed.current) return;
    if (!containerRef.current) return;

    hasPlayed.current = true;
    const els = containerRef.current.querySelectorAll(".reveal");
    if (!els.length) return;

    gsap.fromTo(
      els,
      { opacity: 0, y: 26, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        overwrite: true,
      }
    );
  }, [active, hasEntered]);

  return { containerRef, hasEntered };
}
