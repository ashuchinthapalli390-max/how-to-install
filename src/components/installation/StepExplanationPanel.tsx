import React from 'react';
import type { InstallationStep } from '../../types';
import {
  HelpCircle,
  MapPin,
  FastForward,
  LifeBuoy
} from 'lucide-react';

interface StepExplanationPanelProps {
  step: InstallationStep;
  platformName: string;
}

export const StepExplanationPanel: React.FC<StepExplanationPanelProps> = ({ step, platformName }) => {
  // Compute the 5 questions dynamically based on the step content
  const whatText = step.instruction;
  const whyText = step.detail || `Essential system requirement to configure ChatXa 4.0 securely on ${platformName}.`;
  const whereText = step.command
    ? 'Terminal command line or system prompt.'
    : 'Device screen, Settings app, or system notification tray.';
  const whatNextText = 'The system verifies the package signature and advances to the next execution stage.';
  const troubleshootingText = step.warning || step.tip || 'Verify file checksum and ensure no previous conflicting version is running.';

  return (
    <div
      className="surface-card"
      style={{
        padding: '24px 28px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="live-dot" />
          <span style={{ fontFamily: 'var(--heading)', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            VISUAL HELP ENGINE · STAGE 0{step.stepNumber}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
          {platformName.toUpperCase()} ARCHITECTURE
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}
      >
        {/* WHAT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>
            <HelpCircle size={13} />
            <span>1. WHAT ACTION?</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text)' }}>
            {whatText}
          </div>
        </div>

        {/* WHY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>
            <HelpCircle size={13} />
            <span>2. WHY IS THIS NEEDED?</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--muted)' }}>
            {whyText}
          </div>
        </div>

        {/* WHERE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>
            <MapPin size={13} />
            <span>3. WHERE TO FIND IT?</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--muted)' }}>
            {whereText}
          </div>
        </div>

        {/* WHAT NEXT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--accent)' }}>
            <FastForward size={13} />
            <span>4. WHAT APPEARS NEXT?</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--muted)' }}>
            {whatNextText}
          </div>
        </div>

        {/* TROUBLESHOOTING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'var(--mono)', color: '#f59e0b' }}>
            <LifeBuoy size={13} />
            <span>5. IF BLOCKED?</span>
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: '#fbbf24' }}>
            {troubleshootingText}
          </div>
        </div>
      </div>
    </div>
  );
};
