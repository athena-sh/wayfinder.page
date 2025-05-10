import React, { useMemo } from "react";

export interface ChartSegment {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  title?: string;
  segments: ChartSegment[];
}

const COLORS = [
  "#91B4D7",
  "#FFD700",
  "#FF6347",
  "#32CD32",
  "#8A2BE2",
  "#FF69B4",
  "#FFA500",
  "#40E0D0",
  "#9370DB",
  "#DC143C",
];

const RADIUS = 150;
const INNER_R = 100;

function toXY(r: number, angle: number) {
  return [Math.cos(angle) * r, Math.sin(angle) * r];
}

function arc(start: number, end: number) {
  const [sx, sy] = toXY(RADIUS, start);
  const [ex, ey] = toXY(RADIUS, end);
  const [isx, isy] = toXY(INNER_R, start);
  const [iex, iey] = toXY(INNER_R, end);
  const large = end - start <= Math.PI ? 0 : 1;

  return `M ${sx} ${sy}
          A ${RADIUS} ${RADIUS} 0 ${large} 1 ${ex} ${ey}
          L ${iex} ${iey}
          A ${INNER_R} ${INNER_R} 0 ${large} 0 ${isx} ${isy} Z`;
}

export default function DonutChart({ title = "Chart", segments }: Props) {
  const total = segments.reduce((s, x) => s + x.value, 0);

  const paths = useMemo(() => {
    let a = -Math.PI / 2;
    return segments.map((seg, i) => {
      const next = a + (2 * Math.PI * seg.value) / total;
      const d = arc(a, next);
      a = next;
      return { ...seg, d, color: seg.color || COLORS[i % COLORS.length] };
    });
  }, [segments, total]);

  return (
    <div style={{ overflowX: "auto" }}>
      <svg viewBox="0 0 700 400" width="100%" style={{ maxWidth: 800 }}>
        <rect x={0} y={0} width={700} height={400} className="chart-bg" />
        <g transform="translate(250 180)">
          {paths.map(({ d, color }, i) => (
            <path key={i} d={d} fill={color} className="donut-segment" />
          ))}
        </g>
        <g transform="translate(500 120)">
          {paths.map(({ label, color }, i) => (
            <g key={i} transform={`translate(0 ${i * 28})`}>
              <rect width={16} height={16} fill={color} />
              <text x={24} y={12} dominantBaseline="middle" className="label">
                {label}
              </text>
            </g>
          ))}
        </g>
        <text x={350} y={360} textAnchor="middle" className="title">
          {title}
        </text>
      </svg>

      {/* Inline styles (no `jsx` prop) */}
      <style>
        {`
          .chart-bg { fill: #374151; }
          .donut-segment { stroke: #374151; stroke-width: 2; transition: transform .3s; transform-origin: center; }
          .donut-segment:hover { transform: scale(1.05); cursor: pointer; }
          .label, .title { font-family: sans-serif; fill: #f3f4f6; }
          .label { font-size: 14px; }
          .title { font-weight: 700; font-size: 16px; }
          @media (prefers-color-scheme: light) {
            .chart-bg { fill: #f3f4f6; }
            .donut-segment { stroke: #f3f4f6; }
            .label, .title { fill: #1f2937; }
          }
        `}
      </style>
    </div>
  );
}
