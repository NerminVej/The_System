'use client';

import { PlayerStats } from '@/types';
import { Card } from '@/components/ui/card';

interface StatsRadarChartProps {
  stats: PlayerStats;
}

export function StatsRadarChart({ stats }: StatsRadarChartProps) {
  const size = 400;
  const center = size / 2;
  const maxRadius = size * 0.35;
  const numLevels = 5;

  // Order of stats for the hexagon (clockwise from top)
  const statOrder: Array<keyof PlayerStats> = [
    'strength',
    'agility',
    'stamina',
    'willpower',
    'discipline',
    'intelligence',
  ];

  const statLabels = {
    strength: 'Strength',
    stamina: 'Stamina',
    intelligence: 'Intelligence',
    agility: 'Agility',
    discipline: 'Discipline',
    willpower: 'Willpower',
  };

  // Calculate angle for each stat (hexagon has 6 points)
  const angleStep = (Math.PI * 2) / 6;
  const startAngle = -Math.PI / 2; // Start at top

  // Function to calculate point position on hexagon
  const getPoint = (index: number, radius: number) => {
    const angle = startAngle + angleStep * index;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate hexagon ring paths for background grid
  const generateHexagonPath = (radius: number) => {
    const points = Array.from({ length: 6 }, (_, i) => getPoint(i, radius));
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
    <Card className="stat-card w-full">
      <div className="p-6">
        <div className="flex justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="overflow-visible"
          >
            <defs>
              {/* Purple/pink gradient for the stat fill */}
              <linearGradient id="statGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
              </linearGradient>

              {/* Gradient for the border */}
              <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background hexagon rings */}
            {Array.from({ length: numLevels }, (_, i) => {
              const radius = ((i + 1) / numLevels) * maxRadius;
              return (
                <path
                  key={i}
                  d={generateHexagonPath(radius)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-muted-foreground/20"
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
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-muted-foreground/20"
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
                    r="6"
                    fill="url(#borderGradient)"
                    opacity="0.5"
                    filter="url(#glow)"
                  />
                  {/* Inner point */}
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="url(#borderGradient)"
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
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground font-bold text-sm"
                  >
                    {statLabels[stat]}
                  </text>
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 16}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted-foreground text-xs"
                  >
                    Lv. {level}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Stand Stats Distribution
          </p>
        </div>
      </div>
    </Card>
  );
}
