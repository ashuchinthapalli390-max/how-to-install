import React, { useState } from 'react';
import { Folder } from 'lucide-react';
import type { TutorialMode } from '../../../types';

interface WindowsSimulatorProps {
  currentStepIndex: number;
  onAdvanceStep: () => void;
  mode: TutorialMode;
  showHotspots: boolean;
}

export const WindowsSimulator: React.FC<WindowsSimulatorProps> = ({
  currentStepIndex,
  onAdvanceStep,
  mode,
  showHotspots
}) => {
  const [smartScreenExpanded, setSmartScreenExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
      {/* Windows 11 Desktop Workspace Frame */}
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          height: 440,
          borderRadius: 16,
          backgroundColor: '#0c1015',
          border: '2px solid #232b35',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(30, 45, 60, 0.6) 0%, #0c1015 70%)',
          userSelect: 'none'
        }}
      >
        {/* Workspace Desktop Icons */}
        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16, width: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <Folder size={28} style={{ color: '#ffb900' }} />
            <span style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>This PC</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            <Folder size={28} style={{ color: '#0078d4' }} />
            <span style={{ fontSize: 9, color: '#fff', textAlign: 'center' }}>Downloads</span>
          </div>
        </div>

        {/* Floating File Explorer Window */}
        {currentStepIndex <= 1 && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 100,
              right: 40,
              bottom: 60,
              borderRadius: 10,
              backgroundColor: '#181f28',
              border: '1px solid #334050',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Window title bar */}
            <div style={{ height: 32, backgroundColor: '#202936', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#ccc' }}>
              <span>File Explorer — Downloads</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, backgroundColor: '#334050', borderRadius: 2 }} />
                <span style={{ width: 10, height: 10, backgroundColor: '#334050', borderRadius: 2 }} />
                <span style={{ width: 10, height: 10, backgroundColor: '#e81123', borderRadius: 2 }} />
              </div>
            </div>

            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                onClick={() => {
                  if (mode === 'interactive') onAdvanceStep();
                }}
                style={{
                  padding: '12px',
                  borderRadius: 6,
                  backgroundColor: '#222d3b',
                  border: '1px solid #3b4d62',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div style={{ padding: '6px 10px', borderRadius: 4, backgroundColor: '#ffb900', color: '#000', fontSize: 10, fontWeight: 700 }}>
                  ZIP
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>ChatXa-Windows-x64-Release.zip</div>
                  <div style={{ fontSize: 10, color: '#888' }}>Right-click → Extract All...</div>
                </div>
                {showHotspots && (
                  <div style={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: 'var(--accent)', color: 'var(--on-accent)', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    1
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Windows Defender SmartScreen Dialog (Step 2) */}
        {currentStepIndex === 2 && (
          <div
            style={{
              position: 'absolute',
              top: 50,
              left: 120,
              right: 120,
              borderRadius: 8,
              backgroundColor: '#004275',
              color: '#ffffff',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              zIndex: 30
            }}
          >
            <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Windows protected your PC</h4>
            <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0, opacity: 0.9 }}>
              Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put your PC at risk.
            </p>

            {!smartScreenExpanded ? (
              <span
                onClick={() => setSmartScreenExpanded(true)}
                style={{ fontSize: 11, textDecoration: 'underline', cursor: 'pointer', color: '#a0d1ff', alignSelf: 'flex-start' }}
              >
                More info
                {showHotspots && <span style={{ marginLeft: 6, padding: '1px 5px', borderRadius: '50%', backgroundColor: '#fff', color: '#000', fontSize: 9 }}>!</span>}
              </span>
            ) : (
              <div style={{ fontSize: 11, marginTop: 4 }}>
                <div>App: <strong>chatxa.exe</strong></div>
                <div>Publisher: <strong>Unknown Publisher (Direct Build)</strong></div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              {smartScreenExpanded && (
                <button
                  onClick={() => {
                    if (mode === 'interactive') onAdvanceStep();
                  }}
                  style={{ padding: '6px 14px', borderRadius: 4, backgroundColor: '#fff', color: '#004275', border: 0, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                >
                  Run anyway
                </button>
              )}
              <button style={{ padding: '6px 14px', borderRadius: 4, backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff', fontSize: 11 }}>
                Don't run
              </button>
            </div>
          </div>
        )}

        {/* Running ChatXa Window (Step 3+) */}
        {currentStepIndex >= 3 && (
          <div
            style={{
              position: 'absolute',
              top: 30,
              left: 80,
              right: 80,
              bottom: 50,
              borderRadius: 8,
              backgroundColor: '#121510',
              border: '1px solid var(--line)',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ height: 30, backgroundColor: '#181b15', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, borderBottom: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="live-dot" />
                <span style={{ fontWeight: 700, color: '#f0f2e8' }}>ChatXa 4.0 — Workstation Client</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 10, height: 10, backgroundColor: '#333' }} />
                <span style={{ width: 10, height: 10, backgroundColor: '#333' }} />
                <span style={{ width: 10, height: 10, backgroundColor: '#e81123' }} />
              </div>
            </div>

            <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                CX
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Welcome to ChatXa Desktop</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Direct 64-bit runtime connected to local signaling cluster</div>
            </div>
          </div>
        )}

        {/* Windows 11 Taskbar at Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 44,
            backgroundColor: '#10141a',
            borderTop: '1px solid #1f2732',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            zIndex: 40
          }}
        >
          {/* Windows Logo */}
          <div style={{ width: 18, height: 18, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
            <span style={{ backgroundColor: '#00a4ef' }} />
            <span style={{ backgroundColor: '#00a4ef' }} />
            <span style={{ backgroundColor: '#00a4ef' }} />
            <span style={{ backgroundColor: '#00a4ef' }} />
          </div>

          <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: '#1d2633', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={16} style={{ color: '#ffb900' }} />
          </div>

          <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: currentStepIndex >= 3 ? 'var(--raised)' : 'transparent', border: currentStepIndex >= 3 ? '1px solid var(--accent)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', fontSize: 8, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              CX
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
