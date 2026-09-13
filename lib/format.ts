/**
 * Formats a number using Indonesian conventions (comma as decimal separator,
 * dot as thousands separator) to match the source reference (BPS style).
 */
export function formatID(value: number, decimals = 2): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format without forcing trailing zero decimals (e.g. 8.47 -> "8,47") */
export function formatIDTrim(value: number, maxDecimals = 2): string {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(value);
}
