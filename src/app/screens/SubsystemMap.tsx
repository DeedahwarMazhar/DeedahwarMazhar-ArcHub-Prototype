import { useState } from 'react';
import { Search, Zap, Thermometer, Radio, Cpu, Navigation, Gauge, Rocket } from 'lucide-react';
import { Card } from '../components/Card';
import { TextInput } from '../components/TextInput';
import { MiniSparkline } from '../components/MiniSparkline';

const subsystemGroups = [
  {
    name: 'Power',
    icon: <Zap size={16} />,
    faults: 2,
    components: [
      { name: 'Battery Pack A', value: '24.1V', status: 'WARNING' as const, sparkline: [26, 25.8, 25.5, 25, 24.5, 24.1], updated: '2s ago' },
      { name: 'Battery Pack B', value: '23.8V', status: 'WARNING' as const, sparkline: [26, 25.9, 25.7, 25.2, 24.8, 23.8], updated: '2s ago' },
      { name: 'Solar Array 1', value: '28.4V', status: 'NOMINAL' as const, sparkline: [28, 28.2, 28.3, 28.4, 28.3, 28.4], updated: '1s ago' },
      { name: 'Solar Array 2', value: '28.6V', status: 'NOMINAL' as const, sparkline: [28.1, 28.3, 28.5, 28.5, 28.5, 28.6], updated: '1s ago' },
      { name: 'EPS Controller', value: 'FAULT', status: 'CRITICAL' as const, sparkline: [1, 1, 1, 0, 0, 0], updated: '3s ago' },
      { name: 'Power Distribution Unit', value: 'ACTIVE', status: 'NOMINAL' as const, sparkline: [1, 1, 1, 1, 1, 1], updated: '1s ago' }
    ]
  },
  {
    name: 'Thermal',
    icon: <Thermometer size={16} />,
    faults: 1,
    components: [
      { name: 'Thermal Zone 1', value: '22°C', status: 'NOMINAL' as const, sparkline: [21, 21.5, 22, 22, 22, 22], updated: '2s ago' },
      { name: 'Thermal Zone 2', value: '68°C', status: 'CRITICAL' as const, sparkline: [45, 52, 58, 62, 66, 68], updated: '1s ago' },
      { name: 'Thermal Zone 3', value: '24°C', status: 'NOMINAL' as const, sparkline: [24, 24, 24, 24, 24, 24], updated: '2s ago' },
      { name: 'Radiator Panel A', value: '-15°C', status: 'NOMINAL' as const, sparkline: [-14, -14.5, -15, -15, -15, -15], updated: '3s ago' }
    ]
  },
  {
    name: 'Attitude Control',
    icon: <Navigation size={16} />,
    faults: 0,
    components: [
      { name: 'Reaction Wheel 1', value: '2400 RPM', status: 'NOMINAL' as const, sparkline: [2400, 2400, 2400, 2400, 2400, 2400], updated: '1s ago' },
      { name: 'Reaction Wheel 2', value: '2398 RPM', status: 'NOMINAL' as const, sparkline: [2398, 2398, 2398, 2398, 2398, 2398], updated: '1s ago' },
      { name: 'Star Tracker', value: 'LOCKED', status: 'NOMINAL' as const, sparkline: [1, 1, 1, 1, 1, 1], updated: '1s ago' },
      { name: 'Magnetorquer X', value: 'ACTIVE', status: 'NOMINAL' as const, sparkline: [1, 1, 1, 1, 1, 1], updated: '2s ago' }
    ]
  },
  {
    name: 'Communications',
    icon: <Radio size={16} />,
    faults: 1,
    components: [
      { name: 'Antenna A', value: '78% signal', status: 'WARNING' as const, sparkline: [95, 90, 85, 82, 80, 78], updated: '1s ago' },
      { name: 'Antenna B', value: '98% signal', status: 'NOMINAL' as const, sparkline: [97, 98, 98, 98, 97, 98], updated: '1s ago' },
      { name: 'Transponder', value: '100% signal', status: 'NOMINAL' as const, sparkline: [100, 100, 100, 100, 100, 100], updated: '2s ago' }
    ]
  }
];

export function SubsystemMap() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'critical' | 'warning' | 'nominal'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterComponents = (components: any[]) => {
    return components.filter((comp) => {
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'critical' && comp.status === 'CRITICAL') ||
        (statusFilter === 'warning' && comp.status === 'WARNING') ||
        (statusFilter === 'nominal' && comp.status === 'NOMINAL');
      return matchesSearch && matchesStatus;
    });
  };

  return (
    <div>
      <h1 className="text-[24px] font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        Subsystem Map
      </h1>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        {/* Status Filter */}
        <div className="flex gap-2">
          {(['all', 'critical', 'warning', 'nominal'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-[var(--radius-md)] text-[13px] font-medium capitalize transition-all ${
                statusFilter === status ? '' : ''
              }`}
              style={{
                backgroundColor: statusFilter === status ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: statusFilter === status ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <TextInput
              placeholder="Search by component name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Subsystem Groups */}
      <div className="space-y-6">
        {subsystemGroups.map((group) => {
          const filtered = filterComponents(group.components);
          if (filtered.length === 0) return null;

          return (
            <Card key={group.name}>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ color: 'var(--text-primary)' }}>{group.icon}</div>
                <h2 className="text-[16px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                  {group.name}
                </h2>
                {group.faults > 0 && (
                  <span
                    className="px-2 py-0.5 rounded-[var(--radius-sm)] text-[11px] font-semibold"
                    style={{
                      backgroundColor: 'var(--status-warning-bg)',
                      color: 'var(--status-warning)'
                    }}
                  >
                    {group.faults} {group.faults === 1 ? 'fault' : 'faults'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {filtered.map((comp) => {
                  const bgColor =
                    comp.status === 'CRITICAL'
                      ? 'var(--status-critical-bg)'
                      : comp.status === 'WARNING'
                      ? 'var(--status-warning-bg)'
                      : 'var(--status-nominal-bg)';

                  const borderColor =
                    comp.status === 'CRITICAL'
                      ? 'var(--status-critical)'
                      : comp.status === 'WARNING'
                      ? 'var(--status-warning)'
                      : 'var(--status-nominal)';

                  return (
                    <div
                      key={comp.name}
                      className="p-4 rounded-[var(--radius-md)] border cursor-pointer transition-all hover:brightness-110"
                      style={{
                        backgroundColor: bgColor,
                        borderColor: borderColor
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {comp.name}
                        </p>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: borderColor }}
                        />
                      </div>
                      <p className="font-mono text-[12px] mb-2" style={{ color: 'var(--text-primary)' }}>
                        {comp.value}
                      </p>
                      <MiniSparkline
                        data={comp.sparkline}
                        inFaultState={comp.status === 'CRITICAL'}
                        recovered={comp.status === 'NOMINAL'}
                      />
                      <p className="text-[10px] mt-2" style={{ color: 'var(--text-muted)' }}>
                        Updated {comp.updated}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
