import React, { useState } from 'react';
import {
  Copy,
  Check
} from 'lucide-react';
import { DesktopLauncherGenerator } from '../DesktopLauncherGenerator';
import type { TutorialMode } from '../../../types';

interface LinuxSimulatorProps {
  currentStepIndex: number;
  onAdvanceStep: () => void;
  mode: TutorialMode;
  showHotspots: boolean;
  activeMethodId: string;
}

const DISTROS = [
  { id: 'ubuntu', name: 'Ubuntu / Debian', cmd: 'sudo apt-get install -y libgtk-3-0 libayatana-appindicator3-1' },
  { id: 'fedora', name: 'Fedora / RHEL', cmd: 'sudo dnf install -y gtk3 libayatana-appindicator-gtk3' },
  { id: 'arch', name: 'Arch / Manjaro', cmd: 'sudo pacman -S --needed gtk3 libayatana-appindicator' },
  { id: 'opensuse', name: 'openSUSE', cmd: 'sudo zypper install libgtk-3-0 libayatana-appindicator3-1' }
];

export const LinuxSimulator: React.FC<LinuxSimulatorProps> = ({
  currentStepIndex,
  activeMethodId
}) => {
  const [selectedDistro, setSelectedDistro] = useState(DISTROS[0]);
  const [copied, setCopied] = useState(false);
  const isWaydroid = activeMethodId.includes('waydroid');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, width: '100%' }}>
      {/* Distribution Selector Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '6px 12px',
          borderRadius: 'var(--radius)',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--line)'
        }}
      >
        <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', marginRight: 4 }}>
          DISTRIBUTION:
        </span>
        {DISTROS.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDistro(d)}
            style={{
              padding: '4px 10px',
              borderRadius: 4,
              fontSize: 11,
              fontFamily: 'var(--heading)',
              fontWeight: selectedDistro.id === d.id ? 700 : 500,
              backgroundColor: selectedDistro.id === d.id ? 'var(--raised)' : 'transparent',
              color: selectedDistro.id === d.id ? 'var(--accent)' : 'var(--muted)',
              border: selectedDistro.id === d.id ? '1px solid var(--accent)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Terminal Workstation Frame */}
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          borderRadius: 12,
          backgroundColor: '#0c0e0b',
          border: '1px solid #293026',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            height: 32,
            backgroundColor: '#151913',
            borderBottom: '1px solid #293026',
            padding: '0 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 11,
            fontFamily: 'var(--mono)',
            color: '#8b9485'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ marginLeft: 8 }}>chatxa-workstation: ~/{isWaydroid ? 'waydroid' : 'build'}</span>
          </div>

          <button
            onClick={() => handleCopy(selectedDistro.cmd)}
            className="text-link"
            style={{ fontSize: 10, border: 0, gap: 4, color: copied ? 'var(--accent)' : '#8b9485' }}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: 20, fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.7, color: '#e0e6db', minHeight: 220 }}>
          {isWaydroid ? (
            <div>
              <div style={{ color: 'var(--accent)' }}>$ waydroid status</div>
              <div style={{ color: '#8b9485' }}>
                Session: RUNNING [Wayland Native]<br />
                Container: RUNNING (LXC Android 11 HAL)<br />
                IP Address: 192.168.240.112
              </div>
              <div style={{ color: 'var(--accent)', marginTop: 10 }}>
                $ waydroid app install ChatXa-Android-Release.apk
              </div>
              <div style={{ color: '#8b9485' }}>
                Streaming APK payload to container...<br />
                Success: ChatXa 4.0 installed into Waydroid launcher.
              </div>
            </div>
          ) : (
            <div>
              <div style={{ color: '#8b9485' }}># Step 1: Install prerequisite GUI runtime libraries for {selectedDistro.name}</div>
              <div style={{ color: 'var(--accent)' }}>$ {selectedDistro.cmd}</div>
              <div style={{ color: '#8b9485', marginTop: 8 }}>
                Reading package lists... Done<br />
                Building dependency tree... Done<br />
                libgtk-3-0 is already the newest version (3.24.38-1).<br />
                libayatana-appindicator3-1 set to manually installed.
              </div>

              {currentStepIndex >= 3 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ color: 'var(--accent)' }}>$ chmod +x chatxa_linux && ./chatxa_linux</div>
                  <div style={{ color: '#10b981' }}>
                    [INFO] Initialized PipeWire audio backend.<br />
                    [INFO] GTK3 window frame mapped at 60 FPS.<br />
                    [INFO] ChatXa 4.0 client online.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cursor blink */}
          <span style={{ display: 'inline-block', width: 8, height: 15, backgroundColor: 'var(--accent)', marginLeft: 4, animation: 'cursorBlink 1s infinite' }} />
        </div>
      </div>

      {/* Linux Desktop Launcher Generator (Step 5) */}
      {currentStepIndex >= 4 && (
        <div style={{ width: '100%', maxWidth: 680 }}>
          <DesktopLauncherGenerator />
        </div>
      )}
    </div>
  );
};
