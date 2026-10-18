import React from 'react';
import { Apple } from 'lucide-react';
import type { TutorialMode } from '../../../types';

interface IOSSimulatorProps {
  currentStepIndex: number;
  onAdvanceStep: () => void;
  mode: TutorialMode;
  showHotspots: boolean;
  activeMethodId: string;
}

export const IOSSimulator: React.FC<IOSSimulatorProps> = ({
  currentStepIndex,
  onAdvanceStep,
  mode,
  showHotspots,
  activeMethodId
}) => {
  const isSideloadly = activeMethodId.includes('sideloadly');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
      {/* Sideloadly Dual-Screen Architecture (PC + iPhone) or Single iPhone Frame */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          flexWrap: 'wrap',
          width: '100%'
        }}
      >
        {/* Left: Companion PC / Mac Screen if Sideloadly selected */}
        {isSideloadly && (
          <div
            style={{
              width: 320,
              height: 480,
              borderRadius: 16,
              backgroundColor: '#161814',
              border: '2px solid #303328',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Window title bar */}
            <div style={{ height: 30, backgroundColor: '#20241c', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10, fontFamily: 'var(--mono)', color: '#888' }}>
              <span>Sideloadly v0.50 — PC Companion</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#27c93f' }} />
              </div>
            </div>

            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 11, color: '#aaa' }}>
                Connected Device: <strong style={{ color: 'var(--accent)' }}>iPhone (iOS 17.5)</strong>
              </div>

              {/* IPA Drag and Drop zone */}
              <div
                style={{
                  border: '1px dashed var(--accent)',
                  borderRadius: 8,
                  padding: '16px',
                  textAlign: 'center',
                  backgroundColor: 'rgba(198, 239, 106, 0.05)',
                  fontSize: 11,
                  color: 'var(--text)'
                }}
              >
                ChatXa-iOS-Release.ipa loaded (47.8 MB)
              </div>

              <div style={{ fontSize: 10, color: '#888', lineHeight: 1.5 }}>
                Free Apple ID signing requires standard personal Apple Account. Credentials communicate directly with Apple anisette servers.
              </div>

              <button
                onClick={() => {
                  if (mode === 'interactive') onAdvanceStep();
                }}
                className="button sm"
                style={{ marginTop: 'auto', width: '100%' }}
              >
                Start Signing (Demo)
              </button>
            </div>
          </div>
        )}

        {/* Right: High-Res iPhone Frame with Dynamic Island */}
        <div
          style={{
            width: 320,
            height: 600,
            borderRadius: 42,
            backgroundColor: '#000000',
            border: '4px solid #2a2d24',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            userSelect: 'none'
          }}
        >
          {/* Top Status Bar with Dynamic Island */}
          <div
            style={{
              height: 44,
              padding: '0 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 11,
              fontFamily: 'var(--mono)',
              color: '#ffffff',
              zIndex: 20
            }}
          >
            <span>9:41</span>
            {/* Dynamic Island */}
            <div
              style={{
                width: 88,
                height: 24,
                borderRadius: 12,
                backgroundColor: '#000000',
                border: '1px solid #1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0a0a0a', marginRight: 16 }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0a0a0a' }} />
            </div>
            <span>5G 100%</span>
          </div>

          {/* Screen Content by Step */}
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            {/* Stage 0 / 1: TestFlight Invitation Screen */}
            {currentStepIndex <= 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f0f2e8', fontSize: 14, fontWeight: 700 }}>
                  <Apple size={16} style={{ color: 'var(--accent)' }} />
                  <span>TestFlight Beta Invitation</span>
                </div>

                <div
                  style={{
                    padding: '18px 16px',
                    borderRadius: 14,
                    backgroundColor: '#181a14',
                    border: '1px solid #303328',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    textAlign: 'center'
                  }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    CX
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>ChatXa 4.0 Beta</div>
                  <div style={{ fontSize: 11, color: '#888' }}>Developer: ChatXa Communications Engine</div>

                  <button
                    onClick={() => {
                      if (mode === 'interactive') onAdvanceStep();
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: 20,
                      backgroundColor: 'var(--accent)',
                      color: 'var(--on-accent)',
                      border: 0,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: 8,
                      position: 'relative'
                    }}
                  >
                    Accept Invitation
                    {showHotspots && (
                      <span
                        style={{
                          position: 'absolute',
                          top: -6,
                          right: -6,
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          backgroundColor: '#fff',
                          color: '#000',
                          fontSize: 9,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 10px #fff'
                        }}
                      >
                        1
                      </span>
                    )}
                  </button>
                </div>

                <div style={{ fontSize: 10, color: '#888', lineHeight: 1.5, textAlign: 'center' }}>
                  Illustrative demonstration invitation for TestFlight Beta distribution.
                </div>
              </div>
            )}

            {/* Stage 2 / 3: TestFlight App Install Screen */}
            {(currentStepIndex === 2 || currentStepIndex === 3) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                    CX
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>ChatXa 4.0</div>
                    <div style={{ fontSize: 10, color: '#888' }}>Build 4.0.0 (382) · 47.8 MB</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (mode === 'interactive') onAdvanceStep();
                  }}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 20,
                    backgroundColor: 'var(--accent)',
                    color: 'var(--on-accent)',
                    border: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    position: 'relative'
                  }}
                >
                  {currentStepIndex === 3 ? 'Installing... (Illustrative)' : 'Install ChatXa'}
                  {showHotspots && currentStepIndex === 2 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        color: '#000',
                        fontSize: 9,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 10px #fff'
                      }}
                    >
                      2
                    </span>
                  )}
                </button>

                <div style={{ padding: 12, borderRadius: 10, backgroundColor: '#181a14', border: '1px solid #303328', fontSize: 10, color: '#aaa', lineHeight: 1.5 }}>
                  <strong style={{ color: '#fff', display: 'block', marginBottom: 2 }}>What's New in 4.0:</strong>
                  Full WebRTC calling stack, E2EE local encryption, and background sync.
                </div>
              </div>
            )}

            {/* Stage 4+: Home Screen Launch & Post-Install Verification */}
            {currentStepIndex >= 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 18 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 14,
                    backgroundColor: 'var(--accent)',
                    color: 'var(--on-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 18,
                    boxShadow: '0 8px 24px rgba(198, 239, 106, 0.3)',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    alert('ChatXa 4.0 launched in demo mode!');
                  }}
                >
                  CX
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>ChatXa</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>Ready to open on your iPhone</div>
                </div>

                {/* Developer Mode Note */}
                <div style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: '#20221a', border: '1px solid #3a3d2e', fontSize: 10, color: '#ccc', textAlign: 'left', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--accent)', display: 'block' }}>iOS 16+ Developer Mode:</strong>
                  If prompted with "Developer Mode Required", go to iOS Settings → Privacy & Security → Developer Mode → Toggle ON.
                </div>
              </div>
            )}

            {/* iOS Home Indicator Bar */}
            <div style={{ width: 110, height: 4, backgroundColor: '#888', borderRadius: 2, alignSelf: 'center', marginTop: 12 }} />
          </div>
        </div>
      </div>
    </div>
  );
};
