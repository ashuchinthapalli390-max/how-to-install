import React, { useState } from 'react';
import {
  Folder,
  ArrowRight,
  ShieldAlert,
  Apple,
  Terminal
} from 'lucide-react';
import type { TutorialMode } from '../../../types';

interface MacOSSimulatorProps {
  currentStepIndex: number;
  onAdvanceStep: () => void;
  mode: TutorialMode;
  showHotspots: boolean;
}

export const MacOSSimulator: React.FC<MacOSSimulatorProps> = ({
  currentStepIndex,
  onAdvanceStep,
  mode,
  showHotspots
}) => {
  const [appDragged, setAppDragged] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
      {/* macOS Sonoma Desktop Frame */}
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          height: 440,
          borderRadius: 16,
          backgroundColor: '#101416',
          border: '2px solid #253035',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(circle at 60% 20%, rgba(35, 55, 65, 0.7) 0%, #0d1214 70%)',
          userSelect: 'none'
        }}
      >
        {/* Top macOS Menu Bar */}
        <div
          style={{
            height: 26,
            backgroundColor: 'rgba(20, 26, 30, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 11,
            color: '#e0e4e8',
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Apple size={13} fill="currentColor" />
            <span style={{ fontWeight: 700 }}>Finder</span>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Go</span>
            <span>Window</span>
            <span>Help</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 10, fontFamily: 'var(--mono)' }}>
            <span>100%</span>
            <span>Sun Oct 18 9:41 AM</span>
          </div>
        </div>

        {/* Finder Applications Drag-and-Drop Window (Step 0 - 2) */}
        {currentStepIndex <= 2 && (
          <div
            style={{
              position: 'absolute',
              top: 45,
              left: 90,
              right: 90,
              bottom: 80,
              borderRadius: 10,
              backgroundColor: '#1b2226',
              border: '1px solid #324047',
              boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Window title bar with red/yellow/green stoplights */}
            <div style={{ height: 30, backgroundColor: '#212a2f', padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27c93f' }} />
              <span style={{ margin: '0 auto', fontSize: 11, color: '#aaa', transform: 'translateX(-20px)' }}>
                ChatXa Installer — Drag to Applications
              </span>
            </div>

            {/* Drag to Applications layout */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 40px' }}>
              {/* App Icon */}
              <div
                onClick={() => {
                  setAppDragged(true);
                  if (mode === 'interactive') onAdvanceStep();
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  transform: appDragged ? 'translateX(140px) scale(0.95)' : 'translateX(0)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative'
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>
                  CX
                </div>
                <span style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>ChatXa.app</span>
                {showHotspots && !appDragged && (
                  <span style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', backgroundColor: '#fff', color: '#000', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    1
                  </span>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight size={24} style={{ color: '#66757d' }} />

              {/* Applications Folder */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#2a363d', border: '1px solid #41535d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8899a6' }}>
                  <Folder size={34} style={{ color: '#007aff' }} />
                </div>
                <span style={{ fontSize: 11, color: '#fff' }}>Applications</span>
              </div>
            </div>
          </div>
        )}

        {/* Gatekeeper Quarantine Clearance Step (Step 3) */}
        {currentStepIndex === 3 && (
          <div
            style={{
              position: 'absolute',
              top: 50,
              left: 100,
              right: 100,
              padding: 24,
              borderRadius: 10,
              backgroundColor: '#1d2428',
              border: '1px solid #3d4f57',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#f59e0b', fontSize: 14, fontWeight: 700 }}>
              <ShieldAlert size={18} />
              <span>Gatekeeper Quarantine Clear</span>
            </div>

            <p style={{ fontSize: 12, color: '#ccc', lineHeight: 1.6, margin: 0 }}>
              If macOS displays <em>"ChatXa.app is damaged and cannot be opened"</em>, Apple has placed an extended quarantine flag on the file. Run this verified terminal command to strip the attribute:
            </p>

            <div className="code-block" style={{ fontSize: 11 }}>
              <code>sudo xattr -rd com.apple.quarantine /Applications/ChatXa.app</code>
            </div>

            <button
              onClick={() => {
                if (mode === 'interactive') onAdvanceStep();
              }}
              className="button sm"
              style={{ alignSelf: 'flex-end', marginTop: 4 }}
            >
              Confirm Quarantined Stripped
            </button>
          </div>
        )}

        {/* Running ChatXa Window (Step 4+) */}
        {currentStepIndex >= 4 && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 80,
              right: 80,
              bottom: 70,
              borderRadius: 10,
              backgroundColor: '#121614',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ height: 28, backgroundColor: '#1a1f1c', padding: '0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#27c93f' }} />
              <span style={{ margin: '0 auto', fontSize: 11, color: '#888', transform: 'translateX(-20px)' }}>ChatXa — Cocoa Core</span>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                CX
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>ChatXa Native macOS Engine Active</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Optimized for Apple Silicon M1-M4 & Intel Core</div>
            </div>
          </div>
        )}

        {/* macOS Glass Dock at Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            height: 48,
            padding: '0 12px',
            borderRadius: 16,
            backgroundColor: 'rgba(30, 40, 45, 0.65)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 40
          }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: '#007aff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Folder size={18} style={{ color: '#fff' }} />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: '#34c759', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Terminal size={18} style={{ color: '#fff' }} />
          </div>
          <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: 'var(--accent)', color: 'var(--on-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>
            CX
          </div>
        </div>
      </div>
    </div>
  );
};
