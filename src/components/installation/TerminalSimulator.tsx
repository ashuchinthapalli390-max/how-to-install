import React, { useState, useEffect } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface TerminalSimulatorProps {
  command: string;
  outputPreview?: string;
  distroName?: string;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  command,
  outputPreview,
  distroName = 'linux-workstation'
}) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTypedText('');
    setIsTyping(true);
    let index = 0;
    const interval = setInterval(() => {
      if (index < command.length) {
        setTypedText(command.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [command]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skipAnimation = () => {
    setTypedText(command);
    setIsTyping(false);
  };

  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-strong)',
        backgroundColor: '#07080A',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7)',
        fontFamily: 'var(--font-mono)'
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          backgroundColor: '#121418',
          borderBottom: '1px solid #23262E'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: 11, color: '#8E94A2', marginLeft: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Terminal size={12} />
            bash — {distroName}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {isTyping && (
            <button
              onClick={skipAnimation}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-text)',
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              Skip typing
            </button>
          )}
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: copied ? 'var(--success-color)' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'background var(--transition-fast)'
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div style={{ padding: 18, color: '#ECEFF4', fontSize: 13, lineHeight: 1.6 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ color: 'var(--accent-bright)', userSelect: 'none' }}>
            chatxa@{distroName}:~$
          </span>
          <span style={{ color: '#88C0D0', wordBreak: 'break-all', flex: 1 }}>
            {typedText}
            {isTyping && <span className="terminal-cursor" />}
          </span>
        </div>

        {/* Output Preview */}
        {outputPreview && !isTyping && (
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px dashed #23262E',
              color: '#98A2B3',
              fontSize: 12
            }}
          >
            <div style={{ color: '#4ADE80', marginBottom: 4, fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', backgroundColor: '#4ADE80' }} />
              Simulated Execution Output Preview (Non-executed demonstration):
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', color: '#A6ACCD' }}>
              {outputPreview}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
