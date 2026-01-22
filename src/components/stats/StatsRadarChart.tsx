'use client';

import { PlayerStats } from '@/types';
import { SystemWindow } from '@/components/ui/system-window';
import { BarChart3 } from 'lucide-react';

interface StatsRadarChartProps {
  stats: PlayerStats;
}

export function StatsRadarChart({ stats }: StatsRadarChartProps) {
  const size = 400;
  const center = size / 2;
  const maxRadius = size * 0.35;
  const numLevels = 5;

  // Order of stats for the pentagon (clockwise from top)
  const statOrder: Array<keyof PlayerStats> = [
    'strength',
    'agility',
    'stamina',
    'willpower',
    'intelligence',
  ];

  const statLabels = {
    strength: 'STR',
    stamina: 'STA',
    intelligence: 'INT',
    agility: 'AGI',
    willpower: 'WIL',
  };

  // Calculate angle for each stat (pentagon has 5 points)
  const angleStep = (Math.PI * 2) / 5;
  const startAngle = -Math.PI / 2; // Start at top

  // Function to calculate point position on pentagon
  const getPoint = (index: number, radius: number) => {
    const angle = startAngle + angleStep * index;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate pentagon ring paths for background grid
  const generatePentagonPath = (radius: number) => {
    const points = Array.from({ length: 5 }, (_, i) => getPoint(i, radius));
    return `M ${points[0].x} ${points[0].y} ${points
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(' ')} Z`;
  };

  // Find max stat level for scaling
  const maxStatLevel = Math.max(
    ...statOrder.map((stat) => Math.max(stats[stat].level, 1)),
    10 // Minimum scale of 10
  );

  // Generate stat polygon path
  const generateStatPath = () => {
    const points = statOrder.map((stat, index) => {
      const level = stats[stat].level;
      const normalizedLevel = Math.max(0, level); // Handle negative willpower
      const radius = (normalizedLevel / maxStatLevel) * maxRadius;
      return getPoint(index, radius);
    });

    return `M ${points[0].x} ${points[0].y} ${points
      .slice(1)
      .map((p) => `L ${p.x} ${p.y}`)
      .join(' ')} Z`;
  };

  // Generate label positions (further out from the hexagon)
  const getLabelPosition = (index: number) => {
    const labelRadius = maxRadius + 40;
    return getPoint(index, labelRadius);
  };

  return (
    <SystemWindow
      title="PLAYER ATTRIBUTES ANALYSIS"
      icon={<BarChart3 className="w-4 h-4" />}
      className="w-full hex-pattern"
    >
      <div className="flex justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
            <defs>
              {/* Cyan/blue gradient for the stat fill */}
              <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#0099ff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.3" />
              </linearGradient>

              {/* Gradient for the border */}
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#4de3ff" />
                <stop offset="100%" stopColor="#00d4ff" />
              </linearGradient>

              {/* Cyan glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Stronger glow for points */}
              <filter id="strongGlow">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background pentagon rings */}
            {Array.from({ length: numLevels }, (_, i) => {
              const radius = ((i + 1) / numLevels) * maxRadius;
              return (
                <path
                  key={i}
                  d={generatePentagonPath(radius)}
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1"
                  opacity={0.1 + (i * 0.05)}
                />
              );
            })}

            {/* Axis lines from center to each point */}
            {statOrder.map((_, index) => {
              const point = getPoint(index, maxRadius);
              return (
                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={point.x}
                  y2={point.y}
                  stroke="#00d4ff"
                  strokeWidth="1"
                  opacity="0.2"
                />
              );
            })}

            {/* Stat polygon fill */}
            <path
              d={generateStatPath()}
              fill="url(#statGradient)"
              className="transition-all duration-300"
            />

            {/* Stat polygon border with glow */}
            <path
              d={generateStatPath()}
              fill="none"
              stroke="url(#borderGradient)"
              strokeWidth="2"
              filter="url(#glow)"
              className="transition-all duration-300"
            />

            {/* Stat points */}
            {statOrder.map((stat, index) => {
              const level = stats[stat].level;
              const normalizedLevel = Math.max(0, level);
              const radius = (normalizedLevel / maxStatLevel) * maxRadius;
              const point = getPoint(index, radius);

              return (
                <g key={stat}>
                  {/* Outer glow circle */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="8"
                    fill="#00d4ff"
                    opacity="0.3"
                    filter="url(#strongGlow)"
                  />
                  {/* Middle glow */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill="#00d4ff"
                    opacity="0.6"
                  />
                  {/* Inner point */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#4de3ff"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Labels */}
            {statOrder.map((stat, index) => {
              const labelPos = getLabelPosition(index);
              const level = stats[stat].level;

              return (
                <g key={`label-${stat}`}>
                  {/* Stat abbreviation */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y - 4}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-sl-cyan font-bold text-sm uppercase tracking-wider"
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.8))',
                      fontFamily: 'var(--font-roboto-mono)',
                    }}
                  >
                    {statLabels[stat]}
                  </text>
                  {/* Level value */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-sl-grey text-xs"
                    style={{
                      fontFamily: 'var(--font-roboto-mono)',
                    }}
                  >
                    [{level}]
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Stats legend */}
      <div className="mt-6 pt-4 border-t border-sl-cyan/20">
        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {statOrder.map((stat) => {
            const level = stats[stat].level;
            return (
              <div key={stat} className="space-y-1">
                <div className="text-sl-cyan font-mono uppercase tracking-wider">
                  {statLabels[stat]}
                </div>
                <div className="text-sl-grey font-mono">[{level}]</div>
              </div>
            );
          })}
        </div>
      </div>
    </SystemWindow>
  );
}
