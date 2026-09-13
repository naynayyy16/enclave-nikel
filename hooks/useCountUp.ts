"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface UseCountUpOptions {
  decimals?: number;
  duration?: number;
  delay?: number;
}

/**
 * Animates a number from 0 -> value once `active` is true. Formats using
 * Indonesian locale (comma decimal separator) to match BPS-style figures.
 */
export function useCountUp(
  value: number,
  active: boolean,
  { decimals = 2, duration = 1.4, delay = 0.15 }: UseCountUpOptions = {}
) {
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));
  const played = useRef(false);

  useEffect(() => {
    if (!active || played.current) return;
    played.current = true;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        setDisplay(
          new Intl.NumberFormat("id-ID", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(obj.val)
        );
      },
    });
  }, [active, value, duration, delay, decimals]);

  return display;
}
