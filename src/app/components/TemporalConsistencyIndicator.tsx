import { Clock } from 'lucide-react';

type ConsistencyType = 'persistent' | 'intermittent' | 'sporadic';

interface TemporalConsistencyIndicatorProps {
  type: ConsistencyType;
  duration?: string;
}

export function TemporalConsistencyIndicator({ type, duration }: TemporalConsistencyIndicatorProps) {
  const config = {
    persistent: {
      color: 'var(--status-nominal)',
      label: duration ? `Persistent ${duration}` : 'Persistent'
    },
    intermittent: {
      color: 'var(--status-warning)',
      label: 'Intermittent'
    },
    sporadic: {
      color: 'var(--status-critical)',
      label: 'Sporadic'
    }
  };

  const { color, label } = config[type];

  return (
    <div className="inline-flex items-center gap-1">
      <Clock size={14} style={{ color }} strokeWidth={1.5} />
      <span className="text-[11px]" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
