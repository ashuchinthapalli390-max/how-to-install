import React, { useState } from 'react';
import type { PlatformInfo, InstallationStep } from '../../types';
import { TerminalSimulator } from './TerminalSimulator';
import { DesktopLauncherGenerator } from './DesktopLauncherGenerator';
import { useRouter } from '../../context/RouterContext';
import {
  Check,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Copy,
  AlertTriangle,
  Lightbulb,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InstallationEngineProps {
  platform: PlatformInfo;
  initialMethodId?: string;
}

export const InstallationEngine: React.FC<InstallationEngineProps> = ({ platform, initialMethodId }) => {
  const { searchParams, setSearchParam } = useRouter();

  // Selected method
  const activeMethodId = searchParams.get('method') || initialMethodId || platform.methods[0]?.id || '';
  const currentMethod = platform.methods.find((m) => m.id === activeMethodId) || platform.methods[0];

  // Current step index (0-indexed)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Completed steps map: key = `${platform.id}-${method.id}-${stepNumber}`, value = boolean
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`chatxa_progress_${platform.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [copiedCommand, setCopiedCommand] = useState(false);

  // Sync method change with URL
  const handleSelectMethod = (methodId: string) => {
    setSearchParam('method', methodId);
    setCurrentStepIndex(0);
  };

  // Reset progress for this method
  const handleRestart = () => {
    setCurrentStepIndex(0);
    const updated = { ...completedSteps };
    currentMethod.steps.forEach((s) => {
      delete updated[`${platform.id}-${currentMethod.id}-${s.stepNumber}`];
    });
    setCompletedSteps(updated);
    try {
      localStorage.setItem(`chatxa_progress_${platform.id}`, JSON.stringify(updated));
    } catch (e) {}
  };

  // Mark step complete
  const handleToggleComplete = (stepNumber: number) => {
    const key = `${platform.id}-${currentMethod.id}-${stepNumber}`;
    const newState = !completedSteps[key];
    const updated = { ...completedSteps, [key]: newState };
    setCompletedSteps(updated);

    try {
      localStorage.setItem(`chatxa_progress_${platform.id}`, JSON.stringify(updated));
    } catch (e) {}

    if (newState) {
      // Confetti celebration using CreaXa Lime & Obsidian palette
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#c6ef6a', '#dcff37', '#f0f1e8']
        });
      } catch (e) {}

      // Advance to next step if not last
      if (currentStepIndex < currentMethod.steps.length - 1) {
        setTimeout(() => setCurrentStepIndex((prev) => prev + 1), 350);
      }
    }
  };

  const currentStep: InstallationStep = currentMethod.steps[currentStepIndex] || currentMethod.steps[0];
  const isStepComplete = Boolean(completedSteps[`${platform.id}-${currentMethod.id}-${currentStep.stepNumber}`]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  const progressPercent = Math.round(
    (currentMethod.steps.filter((s) => completedSteps[`${platform.id}-${currentMethod.id}-${s.stepNumber}`]).length /
      currentMethod.steps.length) *
      100
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* 1. Method Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 4
        }}
      >
        {platform.methods.map((method) => {
          const isSelected = method.id === currentMethod.id;
          return (
            <button
              key={method.id}
              onClick={() => handleSelectMethod(method.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '14px 18px',
                borderRadius: 'var(--radius)',
                backgroundColor: isSelected ? 'var(--surface)' : 'var(--raised)',
                border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}`,
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: 200,
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', marginBottom: 4 }}>
                <span
                  style={{
                    fontFamily: 'var(--heading)',
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? 'var(--accent)' : 'var(--text)'
                  }}
                >
                  {method.name}
                </span>
                {method.isOfficial && (
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: 8,
                      padding: '2px 5px',
                      borderRadius: 3,
                      backgroundColor: 'var(--accent)',
                      color: 'var(--on-accent)',
                      marginLeft: 'auto'
                    }}
                  >
                    OFFICIAL
                  </span>
                )}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>
                {method.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Workflow Container (CreaXa Story Interface) */}
      <div
        className="surface-card"
        style={{
          padding: 0,
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden'
        }}
      >
        {/* Top Progress Bar */}
        <div style={{ height: 3, backgroundColor: 'var(--line)', width: '100%' }}>
          <div
            style={{
              height: '100%',
              backgroundColor: 'var(--accent)',
              width: `${((currentStepIndex + 1) / currentMethod.steps.length) * 100}%`,
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>

        {/* Panel Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 28px',
            borderBottom: '1px solid var(--line)',
            backgroundColor: 'color-mix(in srgb, var(--surface), var(--bg) 40%)',
            flexWrap: 'wrap',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 650,
                color: 'var(--accent)',
                letterSpacing: '0.08em'
              }}
            >
              STEP 0{currentStep.stepNumber} / 0{currentMethod.steps.length}
            </span>
            <span style={{ color: 'var(--line)' }}>|</span>
            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={12} />
              {currentMethod.estimatedTime}
            </span>
            <span style={{ color: 'var(--line)' }}>|</span>
            <span
              style={{
                fontSize: 10,
                fontFamily: 'var(--mono)',
                padding: '2px 8px',
                borderRadius: 3,
                backgroundColor: 'var(--raised)',
                color: 'var(--text)'
              }}
            >
              {currentMethod.difficulty.toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              COMPLETION: <strong style={{ color: 'var(--text)' }}>{progressPercent}%</strong>
            </div>
            <button
              onClick={handleRestart}
              className="text-link"
              style={{ fontSize: 11, padding: 0, border: 0, gap: 6 }}
              title="Restart Tutorial"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>

        {/* Stage Timeline Navigation Pills */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--line)',
            backgroundColor: 'var(--surface)',
            overflowX: 'auto'
          }}
        >
          {currentMethod.steps.map((step, idx) => {
            const isCompleted = Boolean(completedSteps[`${platform.id}-${currentMethod.id}-${step.stepNumber}`]);
            const isActive = currentStepIndex === idx;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 18px',
                  borderRight: '1px solid var(--line)',
                  backgroundColor: isActive ? 'var(--raised)' : 'transparent',
                  color: isActive ? 'var(--accent)' : isCompleted ? 'var(--text)' : 'var(--muted)',
                  fontSize: 12,
                  fontFamily: 'var(--heading)',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontFamily: 'var(--mono)',
                    backgroundColor: isCompleted ? 'var(--accent)' : 'var(--line)',
                    color: isCompleted ? 'var(--on-accent)' : 'var(--muted)'
                  }}
                >
                  {isCompleted ? <Check size={11} strokeWidth={3} /> : step.stepNumber}
                </span>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Step Body Content */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>
              <span>STAGE DETAILS</span>
              <span>•</span>
              <span style={{ color: 'var(--accent)' }}>{currentMethod.name}</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--heading)',
                fontSize: 'clamp(24px, 2.5vw, 32px)',
                fontWeight: 650,
                letterSpacing: '-0.04em',
                marginBottom: 16
              }}
            >
              {currentStep.title}
            </h3>

            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text)', margin: 0 }}>
              {currentStep.instruction}
            </p>

            {currentStep.detail && (
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', marginTop: 12 }}>
                {currentStep.detail}
              </p>
            )}
          </div>

          {/* Terminal Command Execution Simulator (If command is present) */}
          {currentStep.command && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  TERMINAL EXECUTION COMMAND:
                </span>
                <button
                  onClick={() => handleCopy(currentStep.command!)}
                  className="button secondary sm"
                  style={{ minHeight: 30, padding: '4px 12px', fontSize: 11, gap: 6 }}
                >
                  {copiedCommand ? <Check size={12} style={{ color: 'var(--accent)' }} /> : <Copy size={12} />}
                  {copiedCommand ? 'Copied to Clipboard' : 'Copy Command'}
                </button>
              </div>

              <div className="code-block" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code>$ {currentStep.command}</code>
                <span className="terminal-cursor" />
              </div>
            </div>
          )}

          {/* Interactive Terminal Simulator for Linux */}
          {platform.id === 'linux' && currentStepIndex === 2 && (
            <TerminalSimulator command={currentStep.command || 'sudo apt-get install -y libgtk-3-0 libayatana-appindicator3-1'} />
          )}

          {/* Interactive Desktop Launcher Generator for Linux */}
          {platform.id === 'linux' && currentStepIndex === 5 && (
            <DesktopLauncherGenerator />
          )}

          {/* Warnings & Tips callouts */}
          {currentStep.warning && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'color-mix(in srgb, #ef4444, transparent 92%)',
                border: '1px solid color-mix(in srgb, #ef4444, transparent 65%)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14
              }}
            >
              <AlertTriangle size={18} style={{ color: '#ef4444', flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 13, lineHeight: 1.6, color: '#fca5a5' }}>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: 2 }}>Security Notice:</strong>
                {currentStep.warning}
              </div>
            </div>
          )}

          {currentStep.tip && (
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius)',
                backgroundColor: 'color-mix(in srgb, var(--accent), transparent 94%)',
                border: '1px solid color-mix(in srgb, var(--accent), transparent 70%)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14
              }}
            >
              <Lightbulb size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text)' }}>
                <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: 2 }}>Architectural Tip:</strong>
                {currentStep.tip}
              </div>
            </div>
          )}

          {/* Navigation Controls Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 24,
              borderTop: '1px solid var(--line)',
              marginTop: 12,
              flexWrap: 'wrap',
              gap: 16
            }}
          >
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="button secondary"
              style={{ minHeight: 44, padding: '10px 18px', fontSize: 12, gap: 8 }}
            >
              <ChevronLeft size={16} />
              Previous Stage
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => handleToggleComplete(currentStep.stepNumber)}
                className={`button ${isStepComplete ? 'secondary' : ''}`}
                style={{
                  minHeight: 44,
                  padding: '10px 20px',
                  fontSize: 12,
                  gap: 8,
                  borderColor: isStepComplete ? 'var(--accent)' : undefined
                }}
              >
                <CheckCircle2 size={16} style={{ color: isStepComplete ? 'var(--accent)' : 'inherit' }} />
                {isStepComplete ? 'Completed ✓' : 'Mark as Verified'}
              </button>

              {currentStepIndex < currentMethod.steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                  className="button"
                  style={{ minHeight: 44, padding: '10px 20px', fontSize: 12, gap: 8 }}
                >
                  Next Stage
                  <ChevronRight size={16} />
                </button>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    color: 'var(--accent)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius)',
                    backgroundColor: 'var(--raised)'
                  }}
                >
                  ✓ Workflow Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
