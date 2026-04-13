interface ReliabilityBadgeProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
}

export function ReliabilityBadge({ score, size = 'medium' }: ReliabilityBadgeProps) {
  // Color gradient based on spec:
  // 0-49%: --status-critical (#E84040)
  // 50-69%: --status-warning (#F5A623)
  // 70-84%: #EDD35A
  // 85-100%: --status-nominal (#3DD68C)

  const getColor = (score: number): string => {
    if (score < 50) return '#E84040';
    if (score < 70) return '#F5A623';
    if (score < 85) return '#EDD35A';
    return '#3DD68C';
  };

  const sizeClasses = {
    small: 'text-[11px] px-[10px] py-[4px]',
    medium: 'text-[11px] px-[10px] py-[4px]',
    large: 'text-[24px] px-[16px] py-[8px]'
  };

  const radiusClasses = {
    small: 'rounded-[var(--radius-sm)]',
    medium: 'rounded-[var(--radius-sm)]',
    large: 'rounded-[var(--radius-md)]'
  };

  return (
    <span
      className={`inline-block font-mono font-semibold ${sizeClasses[size]} ${radiusClasses[size]}`}
      style={{
        backgroundColor: getColor(score),
        color: '#FFFFFF'
      }}
    >
      {score}%
    </span>
  );
}
