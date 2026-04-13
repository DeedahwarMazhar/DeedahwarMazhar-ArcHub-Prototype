import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { ReliabilityBadge } from '../components/ReliabilityBadge';
import { TemporalConsistencyIndicator } from '../components/TemporalConsistencyIndicator';
import { MiniSparkline } from '../components/MiniSparkline';
import { PulsingDot } from '../components/PulsingDot';
import { Link2, ChevronDown, Zap, Thermometer, Radio, Cpu, X, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const alerts = [
  {
    id: 'ALT-20260413-0047',
    title: 'Power bus undervoltage — Subsystem group: EPS',
    reliability: 68,
    severity: 'WARNING' as const,
    temporal: 'persistent' as const,
    duration: '14m',
    correlation: '4/4 correlated',
    timestamp: '14:32:07 UTC',
    unacknowledged: true
  },
  {
    id: 'ALT-20260413-0043',
    title: 'Thermal anomaly detected — Solar array thermal zone 2',
    reliability: 84,
    severity: 'CRITICAL' as const,
    temporal: 'persistent' as const,
    duration: '22m',
    correlation: '3/3 correlated',
    timestamp: '14:18:31 UTC',
    unacknowledged: true
  },
  {
    id: 'ALT-20260413-0039',
    title: 'Intermittent signal loss — Comm subsystem A',
    reliability: 52,
    severity: 'WARNING' as const,
    temporal: 'intermittent' as const,
    duration: '8m',
    correlation: '2/4 correlated',
    timestamp: '14:41:15 UTC',
    unacknowledged: false
  }
];

type StatusType = 'CRITICAL' | 'WARNING' | 'NOMINAL';

interface Component {
  name: string;
  status: StatusType;
  value: number;
  unit: string;
  sparkline: number[];
  history: number[];
  historyLabels: string[];
}

interface SubsystemGroup {
  name: string;
  icon: React.ReactNode;
  components: Component[];
}

const subsystemGroups: SubsystemGroup[] = [
  {
    name: 'Power',
    icon: <Zap size={12} />,
    components: [
      {
        name: 'Battery A', status: 'WARNING', value: 24.1, unit: 'V',
        sparkline: [26, 25.8, 25.5, 25, 24.5, 24.1],
        history: [26.2, 26.1, 26.0, 25.8, 25.5, 25.2, 25.0, 24.8, 24.5, 24.3, 24.1, 24.0],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Battery B', status: 'WARNING', value: 23.8, unit: 'V',
        sparkline: [26, 25.9, 25.7, 25.2, 24.8, 23.8],
        history: [26.1, 26.0, 25.9, 25.7, 25.5, 25.3, 25.0, 24.8, 24.5, 24.2, 24.0, 23.8],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Solar 1', status: 'NOMINAL', value: 28.4, unit: 'V',
        sparkline: [28, 28.2, 28.3, 28.4, 28.3, 28.4],
        history: [28.0, 28.1, 28.2, 28.3, 28.4, 28.4, 28.3, 28.4, 28.4, 28.3, 28.4, 28.4],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Solar 2', status: 'NOMINAL', value: 28.6, unit: 'V',
        sparkline: [28.1, 28.3, 28.5, 28.5, 28.5, 28.6],
        history: [28.1, 28.2, 28.3, 28.4, 28.5, 28.5, 28.5, 28.5, 28.6, 28.6, 28.6, 28.6],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      }
    ]
  },
  {
    name: 'Thermal',
    icon: <Thermometer size={12} />,
    components: [
      {
        name: 'Zone 1', status: 'NOMINAL', value: 22, unit: '°C',
        sparkline: [21, 21.5, 22, 22, 22, 22],
        history: [21, 21, 21.2, 21.5, 21.8, 22, 22, 22, 22, 22, 22, 22],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Zone 2', status: 'CRITICAL', value: 68, unit: '°C',
        sparkline: [45, 52, 58, 62, 66, 68],
        history: [38, 40, 43, 47, 52, 56, 58, 60, 62, 64, 66, 68],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Zone 3', status: 'NOMINAL', value: 24, unit: '°C',
        sparkline: [24, 24, 24, 24, 24, 24],
        history: [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      }
    ]
  },
  {
    name: 'Communications',
    icon: <Radio size={12} />,
    components: [
      {
        name: 'Antenna A', status: 'WARNING', value: 78, unit: '%',
        sparkline: [95, 90, 85, 82, 80, 78],
        history: [96, 95, 93, 91, 90, 87, 85, 84, 82, 81, 80, 78],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Antenna B', status: 'NOMINAL', value: 98, unit: '%',
        sparkline: [97, 98, 98, 98, 97, 98],
        history: [97, 97, 98, 98, 98, 98, 97, 98, 98, 98, 97, 98],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Transponder', status: 'NOMINAL', value: 100, unit: '%',
        sparkline: [100, 100, 100, 100, 100, 100],
        history: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      }
    ]
  },
  {
    name: 'Onboard Computer',
    icon: <Cpu size={12} />,
    components: [
      {
        name: 'CPU Core 1', status: 'NOMINAL', value: 42, unit: '%',
        sparkline: [40, 41, 42, 42, 42, 42],
        history: [38, 39, 40, 41, 42, 42, 42, 42, 42, 42, 42, 42],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'CPU Core 2', status: 'NOMINAL', value: 38, unit: '%',
        sparkline: [39, 38, 38, 38, 38, 38],
        history: [40, 39, 39, 38, 38, 38, 38, 38, 38, 38, 38, 38],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      },
      {
        name: 'Memory', status: 'NOMINAL', value: 64, unit: '%',
        sparkline: [62, 63, 64, 64, 64, 64],
        history: [60, 61, 62, 63, 64, 64, 64, 64, 64, 64, 64, 64],
        historyLabels: ['14:20', '14:22', '14:24', '14:26', '14:28', '14:30', '14:32', '14:34', '14:36', '14:38', '14:40', '14:42']
      }
    ]
  }
];

// Inline SVG detail chart — no library needed
function DetailChart({ data, labels, status, unit }: {
  data: number[];
  labels: string[];
  status: StatusType;
  unit: string;
}) {
  const width = 520;
  const height = 180;
  const paddingLeft = 44;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = 32;

  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const minVal = Math.min(...data) * 0.97;
  const maxVal = Math.max(...data) * 1.03;
  const range = maxVal - minVal || 1;

  const toX = (i: number) => paddingLeft + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => paddingTop + chartH - ((v - minVal) / range) * chartH;

  const linePath = data
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${toX(data.length - 1).toFixed(1)} ${(paddingTop + chartH).toFixed(1)} L ${paddingLeft} ${(paddingTop + chartH).toFixed(1)} Z`;

  const lineColor =
    status === 'CRITICAL' ? '#E84040' :
    status === 'WARNING' ? '#F5A623' :
    '#3DD68C';

  // Threshold line (warning zone) — only shown for non-nominal
  const thresholdY = status === 'CRITICAL'
    ? toY(minVal + range * 0.55)
    : status === 'WARNING'
    ? toY(minVal + range * 0.85)
    : null;

  // Y axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    y: paddingTop + chartH - t * chartH,
    label: (minVal + t * range).toFixed(1)
  }));

  // X axis labels — show every 3rd to avoid crowding
  const xLabels = labels.filter((_, i) => i % 3 === 0 || i === labels.length - 1);
  const xLabelIndices = labels.reduce<number[]>((acc, _, i) => {
    if (i % 3 === 0 || i === labels.length - 1) acc.push(i);
    return acc;
  }, []);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
        </linearGradient>
        <clipPath id="chartClip">
          <rect x={paddingLeft} y={paddingTop} width={chartW} height={chartH} />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {yTicks.map((tick, i) => (
        <line
          key={i}
          x1={paddingLeft} y1={tick.y}
          x2={paddingLeft + chartW} y2={tick.y}
          stroke="rgba(255,255,255,0.06)" strokeWidth="1"
        />
      ))}

      {/* Y axis labels */}
      {yTicks.map((tick, i) => (
        <text
          key={i}
          x={paddingLeft - 6} y={tick.y + 4}
          textAnchor="end"
          fontSize="10"
          fill="rgba(255,255,255,0.35)"
          fontFamily="JetBrains Mono, monospace"
        >
          {tick.label}
        </text>
      ))}

      {/* X axis labels */}
      {xLabelIndices.map((idx, i) => (
        <text
          key={i}
          x={toX(idx)} y={height - 6}
          textAnchor="middle"
          fontSize="10"
          fill="rgba(255,255,255,0.35)"
          fontFamily="JetBrains Mono, monospace"
        >
          {labels[idx]}
        </text>
      ))}

      {/* Threshold line */}
      {thresholdY !== null && (
        <line
          x1={paddingLeft} y1={thresholdY}
          x2={paddingLeft + chartW} y2={thresholdY}
          stroke={lineColor} strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.45"
        />
      )}

      {/* Area fill */}
      <path d={areaPath} fill="url(#areaGrad)" clipPath="url(#chartClip)" />

      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        clipPath="url(#chartClip)"
      />

      {/* Last point dot */}
      <circle
        cx={toX(data.length - 1)}
        cy={toY(data[data.length - 1])}
        r="3.5"
        fill={lineColor}
      />

      {/* Unit label top-right */}
      <text
        x={paddingLeft + chartW} y={paddingTop - 4}
        textAnchor="end"
        fontSize="10"
        fill="rgba(255,255,255,0.3)"
        fontFamily="JetBrains Mono, monospace"
      >
        {unit}
      </text>
    </svg>
  );
}

function ComponentModal({ comp, groupName, onClose }: {
  comp: Component;
  groupName: string;
  onClose: () => void;
}) {
  const statusColor =
    comp.status === 'CRITICAL' ? 'var(--status-critical)' :
    comp.status === 'WARNING' ? 'var(--status-warning)' :
    'var(--status-nominal)';

  const statusBg =
    comp.status === 'CRITICAL' ? 'var(--status-critical-bg)' :
    comp.status === 'WARNING' ? 'var(--status-warning-bg)' :
    'var(--status-nominal-bg)';

  const first = comp.history[0];
  const last = comp.history[comp.history.length - 1];
  const delta = last - first;
  const deltaAbs = Math.abs(delta).toFixed(2);
  const TrendIcon = delta > 0.05 ? TrendingUp : delta < -0.05 ? TrendingDown : Minus;
  const trendColor = comp.status === 'NOMINAL'
    ? 'var(--status-nominal)'
    : comp.status === 'CRITICAL'
    ? 'var(--status-critical)'
    : 'var(--status-warning)';

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      {/* Modal panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-elevated)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '620px',
          padding: '28px',
          position: 'relative'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--bg-overlay)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {groupName}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>·</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: statusColor,
                backgroundColor: statusBg,
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {comp.status}
            </span>
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-display)',
            margin: 0
          }}>
            {comp.name}
          </h2>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Current value</p>
            <p style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: statusColor, margin: 0 }}>
              {comp.value}{comp.unit}
            </p>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Last 22m trend</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendIcon size={16} color={trendColor} />
              <p style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'JetBrains Mono, monospace', color: trendColor, margin: 0 }}>
                {delta >= 0 ? '+' : ''}{deltaAbs}{comp.unit}
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Last updated</p>
            <p style={{ fontSize: '14px', fontWeight: 400, fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)', margin: 0 }}>
              14:42:00 UTC
            </p>
          </div>
        </div>

        {/* Chart */}
        <div style={{ marginBottom: '8px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Telemetry — last 22 minutes
          </p>
          <DetailChart
            data={comp.history}
            labels={comp.historyLabels}
            status={comp.status}
            unit={comp.unit}
          />
        </div>

        {/* Threshold note for non-nominal */}
        {comp.status !== 'NOMINAL' && (
          <p style={{
            fontSize: '11px',
            color: statusColor,
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: statusBg,
            borderRadius: 'var(--radius-md)',
            borderLeft: `3px solid ${statusColor}`
          }}>
            {comp.status === 'CRITICAL'
              ? 'Value has exceeded critical threshold. Dashed line indicates threshold boundary.'
              : 'Value is approaching warning threshold. Monitor closely.'}
          </p>
        )}
      </div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState<{ comp: Component; groupName: string } | null>(null);

  return (
    <div>
      {/* Detail modal */}
      {selectedComponent && (
        <ComponentModal
          comp={selectedComponent.comp}
          groupName={selectedComponent.groupName}
          onClose={() => setSelectedComponent(null)}
        />
      )}

      {/* Top Row - Summary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card>
          <p className="text-[11px] mb-2" style={{ color: 'var(--text-secondary)' }}>Active alerts</p>
          <p className="text-[28px] font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--status-warning)' }}>12</p>
          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>3 critical · 9 warning</p>
        </Card>
        <Card>
          <p className="text-[11px] mb-2" style={{ color: 'var(--text-secondary)' }}>Avg. reliability score</p>
          <p className="text-[28px] font-semibold mb-1" style={{ fontFamily: 'var(--font-display)', color: '#F5A623' }}>74%</p>
          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Across all active alerts</p>
        </Card>
        <Card>
          <p className="text-[11px] mb-2" style={{ color: 'var(--text-secondary)' }}>False alarm rate (30d)</p>
          <p className="text-[28px] font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>18%</p>
          <p className="text-[12px]" style={{ color: 'var(--status-nominal)' }}>↓ 4% vs last 30d</p>
        </Card>
        <Card>
          <p className="text-[11px] mb-2" style={{ color: 'var(--text-secondary)' }}>Pending operator decisions</p>
          <p className="text-[28px] font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>5</p>
          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>Awaiting review</p>
        </Card>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-[55%_45%] gap-6 mb-6">
        {/* Left: Alert Triage Panel */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Active alerts</h2>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius-md)] text-[12px]"
              style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
            >
              Sort by reliability <ChevronDown size={14} />
            </button>
          </div>

          <div className="space-y-2">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="relative p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all duration-100"
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-overlay)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                onClick={() => navigate(`/alert/${alert.id}`)}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[var(--radius-md)]"
                  style={{ backgroundColor: alert.severity === 'CRITICAL' ? 'var(--status-critical)' : 'var(--status-warning)' }}
                />
                {alert.unacknowledged && (
                  <div className="absolute left-[-10px] top-4"><PulsingDot /></div>
                )}
                <div className="pl-3 flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <ReliabilityBadge score={alert.reliability} size="medium" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium mb-2" style={{ fontFamily: 'var(--font-display)' }}>{alert.title}</h3>
                    <div className="flex items-center gap-4 text-[11px] mb-2">
                      <TemporalConsistencyIndicator type={alert.temporal} duration={alert.duration} />
                      <div className="flex items-center gap-1">
                        <Link2 size={14} style={{ color: 'var(--status-nominal)' }} />
                        <span style={{ color: 'var(--status-nominal)' }}>{alert.correlation}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[11px]" style={{ color: 'var(--text-secondary)' }}>{alert.timestamp}</p>
                      <button
                        className="px-3 py-1 rounded-[var(--radius-sm)] text-[11px] font-semibold"
                        style={{ backgroundColor: 'var(--accent-primary)', color: '#FFFFFF' }}
                      >
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full text-center mt-4 text-[13px]" style={{ color: 'var(--accent-primary)' }}>
            Load more
          </button>
        </Card>

        {/* Right: Subsystem Health Map */}
        <Card>
          <h2 className="text-[16px] font-medium mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Subsystem health map
          </h2>
          <div className="space-y-6">
            {subsystemGroups.map((group) => (
              <div key={group.name}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ color: 'var(--text-secondary)' }}>{group.icon}</div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                    {group.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.components.map((comp) => {
                    const bgColor =
                      comp.status === 'CRITICAL' ? 'var(--status-critical-bg)' :
                      comp.status === 'WARNING' ? 'var(--status-warning-bg)' :
                      'var(--status-nominal-bg)';
                    const borderColor =
                      comp.status === 'CRITICAL' ? 'var(--status-critical)' :
                      comp.status === 'WARNING' ? 'var(--status-warning)' :
                      'var(--status-nominal)';

                    return (
                      <div
                        key={comp.name}
                        className="p-3 rounded-[var(--radius-md)] border cursor-pointer transition-all duration-150"
                        style={{ backgroundColor: bgColor, borderColor }}
                        onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.15)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; }}
                        onClick={() => setSelectedComponent({ comp, groupName: group.name })}
                        title={`Click to inspect ${comp.name}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {comp.name}
                          </p>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: borderColor }} />
                        </div>
                        <MiniSparkline
                          data={comp.sparkline}
                          inFaultState={comp.status === 'CRITICAL'}
                          recovered={comp.status === 'NOMINAL'}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>Recent activity</h2>
          <button className="text-[13px]" style={{ color: 'var(--accent-primary)' }}>Show all</button>
        </div>
        <div className="space-y-2">
          {[
            { time: '14:41:15', type: 'Alert raised', desc: 'Intermittent signal loss detected' },
            { time: '14:32:07', type: 'Alert raised', desc: 'Power bus undervoltage detected' },
            { time: '14:18:31', type: 'Alert raised', desc: 'Thermal anomaly in solar array zone 2' }
          ].map((event, i) => (
            <div key={i} className="flex items-center gap-4 text-[12px]">
              <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{event.time}</span>
              <span
                className="px-2 py-0.5 rounded-[var(--radius-sm)] text-[10px] font-semibold"
                style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
              >
                {event.type}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{event.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}