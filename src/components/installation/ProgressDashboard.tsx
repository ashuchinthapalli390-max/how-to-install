import React from 'react';
import type { PlatformId } from '../../types';
import { useRouter } from '../../context/RouterContext';
import {
  RotateCcw,
  ArrowRight,
  Smartphone,
  Apple,
  Monitor,
  Laptop,
  Terminal
} from 'lucide-react';

interface ProgressDashboardProps {
  platformId: PlatformId;
  methodName: string;
  totalSteps: number;
  completedCount: number;
  onReset: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  platformId,
  methodName,
  totalSteps,
  completedCount,
  onReset
}) => {
  const { navigate } = useRouter();
  const percent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const getPlatformIcon = (id: PlatformId) => {
    switch (id) {
      case 'android': return <Smartphone size={14} />;
      case 'ios': return <Apple size={14} />;
      case 'windows': return <Monitor size={14} />;
      case 'macos': return <Laptop size={14} />;
      case 'linux': return <Terminal size={14} />;
    }
  };

  return (
    <div
      className="surface-card"
      style={{
        padding: '20px 24px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 18
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: 'var(--raised)',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--mono)',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--accent)'
          }}
        >
          {percent}%
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--accent)' }}>{getPlatformIcon(platformId)}</span>
            <span style={{ fontFamily: 'var(--heading)', fontSize: 13, fontWeight: 700 }}>
              Your Guide Progress: {methodName}
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, fontFamily: 'var(--mono)' }}>
            {completedCount} of {totalSteps} verification stages completed · Local session saved
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={onReset}
          className="button secondary sm"
          style={{ minHeight: 32, padding: '6px 12px', fontSize: 11, gap: 6 }}
        >
          <RotateCcw size={12} />
          Reset Progress
        </button>

        <button
          onClick={() => navigate('/download')}
          className="button sm"
          style={{ minHeight: 32, padding: '6px 14px', fontSize: 11, gap: 6 }}
        >
          <span>Get Verified Binaries</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
