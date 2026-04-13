type StatusType = 'CRITICAL' | 'WARNING' | 'NOMINAL' | 'UNKNOWN';

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    CRITICAL: {
      bg: 'var(--status-critical-bg)',
      color: 'var(--status-critical)'
    },
    WARNING: {
      bg: 'var(--status-warning-bg)',
      color: 'var(--status-warning)'
    },
    NOMINAL: {
      bg: 'var(--status-nominal-bg)',
      color: 'var(--status-nominal)'
    },
    UNKNOWN: {
      bg: 'var(--status-unknown-bg)',
      color: 'var(--status-unknown)'
    }
  };

  const style = styles[status];

  return (
    <span
      className="inline-block font-semibold text-[11px] px-[8px] py-[3px] rounded-[var(--radius-sm)] uppercase"
      style={{
        backgroundColor: style.bg,
        color: style.color
      }}
    >
      {status}
    </span>
  );
}
