interface MiniSparklineProps {
  data: number[];
  inFaultState?: boolean;
  recovered?: boolean;
}

export function MiniSparkline({ data, inFaultState, recovered }: MiniSparklineProps) {
  const width = 60;
  const height = 20;
  const padding = 2;

  if (data.length === 0) {
    return <svg width={width} height={height} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
      const y = height - padding - ((value - min) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(' ');

  let lineColor = 'var(--text-muted)';
  if (inFaultState) lineColor = 'var(--status-critical)';
  if (recovered) lineColor = 'var(--status-nominal)';

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
      />
    </svg>
  );
}
