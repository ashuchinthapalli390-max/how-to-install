import React, { useState } from 'react';
import {
  ShieldAlert,
  Check,
  Folder,
  Settings
} from 'lucide-react';
import type { TutorialMode } from '../../../types';

interface AndroidSimulatorProps {
  currentStepIndex: number;
  onAdvanceStep: () => void;
  mode: TutorialMode;
  showHotspots: boolean;
}

export const AndroidSimulator: React.FC<AndroidSimulatorProps> = ({
  currentStepIndex,
  onAdvanceStep,
  mode,
  showHotspots
}) => {
  const [selectedBrand, setSelectedBrand] = useState<'samsung' | 'vivo' | 'xiaomi' | 'oneplus' | 'pixel'>('samsung');
  const [sourceAllowed, setSourceAllowed] = useState(false);
  const [showPlayProtectChecklist, setShowPlayProtectChecklist] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
      {/* Manufacturer Selector Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '6px 10px',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--line)'
        }}
      >
        <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', marginRight: 4 }}>
          OS SKIN:
        </span>
        {[
          { id: 'samsung', label: 'Samsung One UI 6' },
          { id: 'vivo', label: 'Vivo / iQOO Funtouch' },
          { id: 'xiaomi', label: 'Xiaomi HyperOS' },
          { id: 'oneplus', label: 'OnePlus OxygenOS' },
          { id: 'pixel', label: 'Google Pixel Stock' }
        ].map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrand(brand.id as any)}
            style={{
              padding: '4px 10px',
              borderRadius: 4,
              fontSize: 11,
              fontFamily: 'var(--heading)',
              fontWeight: selectedBrand === brand.id ? 700 : 500,
              backgroundColor: selectedBrand === brand.id ? 'var(--raised)' : 'transparent',
              color: selectedBrand === brand.id ? 'var(--accent)' : 'var(--muted)',
              border: selectedBrand === brand.id ? '1px solid var(--accent)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            {brand.label}
          </button>
        ))}
      </div>

      {/* Realistic Android Hardware Frame */}
      <div
        style={{
          width: 320,
          height: 600,
          borderRadius: 36,
          backgroundColor: '#0a0a08',
          border: '4px solid #282a24',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none'
        }}
      >
        {/* Top Status Bar & Front Camera Hole Punch */}
        <div
          style={{
            height: 32,
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 10,
            fontFamily: 'var(--mono)',
            color: '#a0a29a',
            zIndex: 10
          }}
        >
          <span>10:42</span>
          {/* Hole Punch Camera */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#000000',
              border: '1px solid #333'
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>5G</span>
            <span>98%</span>
          </div>
        </div>

        {/* Screen Content by Step Index */}
        <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          {/* Stage 0 / 1: File Manager / Received APK */}
          {currentStepIndex <= 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e0e2d8', fontSize: 13, fontWeight: 600 }}>
                <Folder size={16} style={{ color: 'var(--accent)' }} />
                <span>Downloads / Sideload</span>
              </div>

              {/* APK File Item with Hotspot */}
              <div
                onClick={() => {
                  if (mode === 'interactive') onAdvanceStep();
                }}
                style={{
                  padding: '14px',
                  borderRadius: 12,
                  backgroundColor: '#181a15',
                  border: '1px solid #30332a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: mode === 'interactive' ? 'pointer' : 'default',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    backgroundColor: 'var(--accent)',
                    color: 'var(--on-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 10
                  }}
                >
                  APK
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2e8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    ChatXa-Android-Release.apk
                  </div>
                  <div style={{ fontSize: 10, color: '#888b80', marginTop: 2 }}>549.7 MB · Official 4.0 Release</div>
                </div>

                {/* Interactive Hotspot */}
                {showHotspots && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--on-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 800,
                      boxShadow: '0 0 12px var(--accent)',
                      animation: 'pulse 1.8s infinite'
                    }}
                    title="Tap to begin installation"
                  >
                    1
                  </div>
                )}
              </div>

              <div style={{ fontSize: 11, color: '#888b80', lineHeight: 1.5, marginTop: 10 }}>
                {mode === 'interactive' ? '👉 Tap the APK card above to open Package Installer.' : 'Verified release ready for package initialization.'}
              </div>
            </div>
          )}

          {/* Stage 2: Unknown Source Permission Screen */}
          {currentStepIndex === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b', fontSize: 13, fontWeight: 700 }}>
                <Settings size={16} />
                <span>Install Unknown Apps</span>
              </div>

              <div
                style={{
                  padding: '14px',
                  borderRadius: 12,
                  backgroundColor: '#181a15',
                  border: '1px solid #30332a',
                  fontSize: 11,
                  color: '#ccc',
                  lineHeight: 1.6
                }}
              >
                For your security, your phone is not allowed to install unknown apps from this source.
              </div>

              {/* Permission Toggle with Hotspot */}
              <div
                onClick={() => {
                  setSourceAllowed((prev) => !prev);
                  if (mode === 'interactive') onAdvanceStep();
                }}
                style={{
                  padding: '14px',
                  borderRadius: 12,
                  backgroundColor: '#1c1f18',
                  border: `1px solid ${sourceAllowed ? 'var(--accent)' : '#444'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f0f2e8' }}>Allow from this source</div>
                  <div style={{ fontSize: 10, color: '#888b80' }}>Google Chrome / Files</div>
                </div>

                <div
                  style={{
                    width: 36,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: sourceAllowed ? 'var(--accent)' : '#333',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: 2,
                      left: sourceAllowed ? 18 : 2,
                      transition: 'left 0.2s'
                    }}
                  />
                </div>

                {showHotspots && !sourceAllowed && (
                  <div
                    style={{
                      position: 'absolute',
                      right: -6,
                      top: -6,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      color: 'var(--on-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 800,
                      boxShadow: '0 0 12px var(--accent)',
                      animation: 'pulse 1.8s infinite'
                    }}
                  >
                    2
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stage 3: Confirmation Dialog */}
          {currentStepIndex === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
              <div
                style={{
                  padding: '20px 16px',
                  borderRadius: 16,
                  backgroundColor: '#181a15',
                  border: '1px solid #30332a',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  textAlign: 'center'
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'var(--accent)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-accent)', fontWeight: 800 }}>
                  CX
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f2e8' }}>ChatXa 4.0</div>
                  <div style={{ fontSize: 11, color: '#888b80', marginTop: 4 }}>Do you want to install this application?</div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{ flex: 1, padding: '10px', borderRadius: 8, backgroundColor: '#222', color: '#888', border: 0, fontSize: 12 }}>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (mode === 'interactive') onAdvanceStep();
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 8,
                      backgroundColor: 'var(--accent)',
                      color: 'var(--on-accent)',
                      border: 0,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    Install
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
                          fontSize: 10,
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 10px #fff'
                        }}
                      >
                        3
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stage 4: Installing Progress */}
          {currentStepIndex === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--on-accent)', fontWeight: 800, fontSize: 14 }}>
                CX
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f2e8' }}>Installing ChatXa...</div>
              <div style={{ width: '80%', height: 4, backgroundColor: '#222', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', backgroundColor: 'var(--accent)', animation: 'progressShim 1.5s infinite ease-in-out' }} />
              </div>
              <span style={{ fontSize: 9, fontFamily: 'var(--mono)', color: '#888b80' }}>
                ILLUSTRATIVE DEMONSTRATION PROGRESS
              </span>
            </div>
          )}

          {/* Stage 5: App Installed Success / Launch */}
          {currentStepIndex >= 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 18 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(198, 239, 106, 0.15)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                <Check size={28} strokeWidth={3} />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f0f2e8', textAlign: 'center' }}>App installed.</div>
                <div style={{ fontSize: 11, color: '#888b80', marginTop: 4, textAlign: 'center' }}>ChatXa 4.0 is ready for launch on your device.</div>
              </div>

              <button
                onClick={() => {
                  alert('Demonstration complete. Follow these verified steps on your real Android phone!');
                }}
                className="button sm"
                style={{ width: '80%', padding: '12px' }}
              >
                Open ChatXa 4.0
              </button>
            </div>
          )}

          {/* Bottom Android Gesture Pill */}
          <div style={{ width: 72, height: 4, backgroundColor: '#555850', borderRadius: 2, alignSelf: 'center', marginTop: 12 }} />
        </div>
      </div>

      {/* Safety Checklist Button for Play Protect */}
      <button
        onClick={() => setShowPlayProtectChecklist((prev) => !prev)}
        className="button secondary sm"
        style={{ fontSize: 11, gap: 6 }}
      >
        <ShieldAlert size={13} style={{ color: '#f59e0b' }} />
        <span>{showPlayProtectChecklist ? 'Hide Play Protect Checklist' : 'Google Play Protect Safety Checklist'}</span>
      </button>

      {/* Play Protect Safety Explanation Drawer */}
      {showPlayProtectChecklist && (
        <div
          style={{
            maxWidth: 520,
            padding: '16px 20px',
            borderRadius: 'var(--radius)',
            backgroundColor: 'color-mix(in srgb, #f59e0b, transparent 92%)',
            border: '1px solid color-mix(in srgb, #f59e0b, transparent 70%)',
            fontSize: 12,
            lineHeight: 1.6,
            color: 'var(--text)'
          }}
        >
          <strong style={{ color: '#f59e0b', display: 'block', marginBottom: 4 }}>Play Protect Sideload Verification:</strong>
          Because ChatXa 4.0 is direct-distributed rather than indexed by Google Play Store, Play Protect may present "Unrecognized developer". Tap <em>"More details"</em> → <em>"Install anyway"</em>. ChatXa contains zero third-party ads or analytics trackers.
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.8; }
        }
        @keyframes progressShim {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
