"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface MetricCounterProps {
  value: number;
  active: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function MetricCounter({
  value,
  active,
  decimals = 2,
  prefix = "",
  suffix = "",
  className = "",
  duration,
  delay,
}: MetricCounterProps) {
  const display = useCountUp(value, active, { decimals, duration, delay });
  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
