import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
  type Chart,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

// Design tokens (kept in sync with globals.css @theme)
export const COLORS = {
  navy: "#001524",
  navyDeep: "#000a11",
  teal: "#15616D",
  tealLight: "#1f8a99",
  cyan: "#00E5FF",
  cream: "#FFECD1",
  creamDim: "rgba(255,236,209,0.65)",
  gridline: "rgba(255,236,209,0.08)",
};

ChartJS.defaults.font.family =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
ChartJS.defaults.color = COLORS.creamDim;

const tooltipBase = {
  backgroundColor: "rgba(0, 21, 36, 0.92)",
  titleColor: COLORS.cream,
  bodyColor: COLORS.cream,
  borderColor: "rgba(0, 229, 255, 0.35)",
  borderWidth: 1,
  padding: 10,
  cornerRadius: 8,
  titleFont: { weight: 600 as const, size: 12 },
  bodyFont: { size: 12 },
  displayColors: false,
};

export function baseBarOptions(overrides: ChartOptions<"bar"> = {}): ChartOptions<"bar"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1100, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 11 } },
      },
      y: {
        grid: { color: COLORS.gridline },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 11 } },
      },
    },
    ...overrides,
  };
}

export function baseLineOptions(overrides: ChartOptions<"line"> = {}): ChartOptions<"line"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1200, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: { ...tooltipBase },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 11 } },
      },
      y: {
        grid: { color: COLORS.gridline },
        border: { display: false },
        ticks: { color: COLORS.creamDim, font: { size: 11 } },
      },
    },
    ...overrides,
  };
}

/**
 * Factory for a lightweight "direct labeling" plugin: draws each data point's
 * value next to the bar/point, matching the guideline's preference for
 * direct labels over legends/gridlines. Scoped per-chart (passed via the
 * `plugins` prop), so multiple charts can each use their own formatter
 * without colliding.
 */
type LabelCtx = { datasetIndex: number; dataIndex: number };
type BarOrLineChart = Chart<"bar" | "line">;

export function valueLabelPlugin(opts: {
  formatter?: (value: number, ctx: LabelCtx) => string;
  color?: string | ((ctx: LabelCtx) => string);
  font?: string | ((ctx: LabelCtx) => string);
  offset?: number | ((ctx: LabelCtx) => number);
  align?: "bottom" | "top" | "center" | ((ctx: LabelCtx) => "bottom" | "top" | "center");
  id?: string;
}): Plugin<"bar" | "line"> {
  const {
    formatter = (v: number) => String(v),
    color = COLORS.cream,
    font = "700 11px Inter, sans-serif",
    offset = 8,
    align = "bottom",
    id = `valueLabel-${Math.random().toString(36).slice(2)}`,
  } = opts;

  return {
    id,
    afterDatasetsDraw(chart: BarOrLineChart) {
      const ctx = chart.ctx;
      const isHorizontal = chart.options.indexAxis === "y";
      chart.data.datasets.forEach((dataset, dsIndex) => {
        const meta = chart.getDatasetMeta(dsIndex);
        if (meta.hidden) return;
        meta.data.forEach((el, index) => {
          const raw = dataset.data[index];
          if (raw === null || raw === undefined) return;
          const value = typeof raw === "number" ? raw : Number(raw);
          const labelCtx = { datasetIndex: dsIndex, dataIndex: index };
          const label = formatter(value, labelCtx);
          
          const cColor = typeof color === "function" ? color(labelCtx) : color;
          const cFont = typeof font === "function" ? font(labelCtx) : font;
          const cOffset = typeof offset === "function" ? offset(labelCtx) : offset;
          const cAlign = typeof align === "function" ? align(labelCtx) : align;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const anyEl = el as any;
          const x = anyEl.x as number;
          const y = anyEl.y as number;
          ctx.save();
          ctx.fillStyle = cColor;
          ctx.font = cFont;
          if (isHorizontal) {
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(label, x + cOffset, y);
          } else {
            ctx.textAlign = "center";
            if (cAlign === "bottom") {
               ctx.textBaseline = "bottom";
               ctx.fillText(label, x, y - cOffset);
            } else if (cAlign === "top") {
               ctx.textBaseline = "top";
               ctx.fillText(label, x, y + cOffset);
            } else {
               ctx.textBaseline = "middle";
               ctx.fillText(label, x, y);
            }
          }
          ctx.restore();
        });
      });
    },
  };
}

export default ChartJS;
