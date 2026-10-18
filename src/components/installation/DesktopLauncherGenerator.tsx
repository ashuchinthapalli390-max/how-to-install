import React, { useState } from 'react';
import { Copy, Check, FileText } from 'lucide-react';

export const DesktopLauncherGenerator: React.FC = () => {
  const [appName, setAppName] = useState('ChatXa');
  const [execPath, setExecPath] = useState('/opt/chatxa/chatxa');
  const [iconPath, setIconPath] = useState('/opt/chatxa/assets/logos/ChatXa_01_Crimson_Noir_Right.png');
  const [copied, setCopied] = useState(false);

  const desktopContent = `[Desktop Entry]
Version=1.0
Type=Application
Name=${appName}
Comment=ChatXa 4.0 — Every Moment Connects (Realtime Social & LiveKit Calling)
Exec=${execPath}
Icon=${iconPath}
Terminal=false
Categories=Network;InstantMessaging;Chat;
Keywords=chat;social;messaging;calls;webrtc;
StartupWMClass=chatxa`;

  const handleCopy = () => {
    navigator.clipboard.writeText(desktopContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="surface-card"
      style={{
        marginTop: 24,
        padding: 24,
        border: '1px solid var(--border-highlight)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <FileText size={20} style={{ color: 'var(--accent-bright)' }} />
        <div>
          <h4 style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700 }}>
            Interactive Linux .desktop Launcher Generator
          </h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            Customize your local file paths below to generate a valid freedesktop launcher entry.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: 6 }}>
            Application Display Name:
          </label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: 6 }}>
            Executable Path (Exec):
          </label>
          <input
            type="text"
            value={execPath}
            onChange={(e) => setExecPath(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginBottom: 6 }}>
            Icon Path (PNG):
          </label>
          <input
            type="text"
            value={iconPath}
            onChange={(e) => setIconPath(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-muted)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 13
            }}
          />
        </div>
      </div>

      {/* Generated Code Area */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 14px',
            backgroundColor: '#0E1014',
            borderTopLeftRadius: 'var(--radius-md)',
            borderTopRightRadius: 'var(--radius-md)',
            border: '1px solid var(--border-muted)',
            borderBottom: 'none'
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            Target: ~/.local/share/applications/chatxa.desktop
          </span>
          <button
            onClick={handleCopy}
            className="btn btn-primary btn-sm"
            style={{ padding: '4px 10px', fontSize: 11 }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied to Clipboard' : 'Copy .desktop File'}
          </button>
        </div>

        <pre
          className="code-block"
          style={{
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
          }}
        >
          {desktopContent}
        </pre>
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        💡 After saving, refresh your application cache with:{' '}
        <code style={{ color: 'var(--accent-text)' }}>update-desktop-database ~/.local/share/applications/</code>
      </div>
    </div>
  );
};
