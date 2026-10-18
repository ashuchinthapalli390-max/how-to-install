import React, { useState } from 'react';
import type { PlatformInfo, InstallationStep } from '../../types';
import { TerminalSimulator } from './TerminalSimulator';
import { DesktopLauncherGenerator } from './DesktopLauncherGenerator';
import { useRouter } from '../../context/RouterContext';
import { Check, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Copy, AlertTriangle, Lightbulb, Clock, Wrench, Shield } from 'lucide-react';
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
      // Confetti celebration when completing step
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#DC182C', '#FF3045', '#FFFFFF']
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* 1. Method Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 8,
          borderBottom: '1px solid var(--border-muted)'
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
                gap: 4,
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--bg-elevated)' : 'transparent',
                border: isSelected ? '1px solid var(--border-highlight)' : '1px solid transparent',
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: 200,
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: isSelected ? 'var(--accent-text)' : 'var(--text-primary)'
                  }}
                >
                  {method.name}
                </span>
                {method.isOfficial && (
                  <span className="badge" style={{ fontSize: 9, padding: '2px 5px' }}>
                    OFFICIAL
                  </span>
                )}
                {method.isArchival && (
                  <span className="badge" style={{ fontSize: 9, padding: '2px 5px', color: 'var(--warning-color)' }}>
                    LEGACY
                  </span>
                )}
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {method.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Method Overview Card */}
      <div
        className="surface-card"
        style={{
          padding: 24,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
            {currentMethod.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
            {currentMethod.description}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={16} style={{ color: 'var(--accent-bright)' }} />
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>ESTIMATED TIME</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{currentMethod.estimatedTime}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Wrench size={16} style={{ color: 'var(--accent-bright)' }} />
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>DIFFICULTY</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{currentMethod.difficulty}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={16} style={{ color: 'var(--accent-bright)' }} />
            <div>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>REQUIRES PC</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{currentMethod.requiresPc ? 'Yes' : 'No (Phone only)'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning banner if method has caveats */}
      {currentMethod.warning && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#FCA5A5',
            fontSize: 13
          }}
        >
          <AlertTriangle size={18} style={{ flexShrink: 0 }} />
          <span>{currentMethod.warning}</span>
        </div>
      )}

      {/* 3. Main Guided Engine (3 Column Desktop Layout: Timeline, Step Panel, Simulator) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 1fr) minmax(320px, 1.8fr) minmax(320px, 1.6fr)',
          gap: 28,
          alignItems: 'flex-start'
        }}
        className="guide-layout"
      >
        {/* Left Column: Timeline Progress */}
        <div
          className="surface-card"
          style={{
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Steps ({currentStepIndex + 1}/{currentMethod.steps.length})
            </span>
            <button
              onClick={handleRestart}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: 11,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Reset Step Progress"
            >
              <RotateCcw size={11} />
              Reset
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
            {currentMethod.steps.map((step, idx) => {
              const isSelected = idx === currentStepIndex;
              const isDone = Boolean(completedSteps[`${platform.id}-${currentMethod.id}-${step.stepNumber}`]);

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => setCurrentStepIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-highlight)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: isDone
                        ? 'var(--success-color)'
                        : isSelected
                        ? 'var(--accent-bright)'
                        : 'var(--bg-surface)',
                      border: isDone || isSelected ? 'none' : '1px solid var(--border-strong)',
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2
                    }}
                  >
                    {isDone ? <Check size={14} /> : step.stepNumber}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? 'var(--accent-text)' : isDone ? 'var(--text-primary)' : 'var(--text-secondary)'
                      }}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Column: Step Instructions & Actions */}
        <div
          className="surface-card"
          style={{
            padding: 28,
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          {/* Step Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="badge badge-accent">
              Step {currentStep.stepNumber} of {currentMethod.steps.length}
            </span>
            {isStepComplete && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success-color)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>
                <CheckCircle2 size={14} />
                Completed
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(20px, 2.4vw, 26px)',
              fontWeight: 700,
              lineHeight: 1.25,
              color: 'var(--text-primary)'
            }}
          >
            {currentStep.title}
          </h3>

          <p style={{ color: 'var(--text-primary)', fontSize: 16, lineHeight: 1.7 }}>
            {currentStep.instruction}
          </p>

          {currentStep.detail && (
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
              {currentStep.detail}
            </p>
          )}

          {/* Copyable Command Box if step contains command */}
          {currentStep.command && (
            <div style={{ position: 'relative', marginTop: 6 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 12px',
                  backgroundColor: '#121418',
                  borderTopLeftRadius: 'var(--radius-sm)',
                  borderTopRightRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-muted)',
                  borderBottom: 'none'
                }}
              >
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  TERMINAL COMMAND
                </span>
                <button
                  onClick={() => handleCopy(currentStep.command!)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedCommand ? 'var(--success-color)' : 'var(--accent-text)',
                    cursor: 'pointer',
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {copiedCommand ? <Check size={12} /> : <Copy size={12} />}
                  {copiedCommand ? 'Copied' : 'Copy'}
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
                {currentStep.command}
              </pre>
            </div>
          )}

          {/* Code Block if multi-line */}
          {currentStep.codeBlock && (
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 12px',
                  backgroundColor: '#121418',
                  borderTopLeftRadius: 'var(--radius-sm)',
                  borderTopRightRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-muted)',
                  borderBottom: 'none'
                }}
              >
                <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  DISTRIBUTION SCRIPT
                </span>
                <button
                  onClick={() => handleCopy(currentStep.codeBlock!)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedCommand ? 'var(--success-color)' : 'var(--accent-text)',
                    cursor: 'pointer',
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {copiedCommand ? <Check size={12} /> : <Copy size={12} />}
                  {copiedCommand ? 'Copied' : 'Copy Block'}
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
                {currentStep.codeBlock}
              </pre>
            </div>
          )}

          {/* Tip Callout */}
          {currentStep.tip && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: 13,
                color: '#BFDBFE'
              }}
            >
              <Lightbulb size={16} style={{ color: '#60A5FA', marginTop: 2, flexShrink: 0 }} />
              <span>{currentStep.tip}</span>
            </div>
          )}

          {/* Step Completion Toggle & Navigation Bar */}
          <div
            style={{
              marginTop: 12,
              paddingTop: 20,
              borderTop: '1px solid var(--border-muted)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12
            }}
          >
            {/* User Confirmed Completion Checkbox */}
            <button
              onClick={() => handleToggleComplete(currentStep.stepNumber)}
              className={isStepComplete ? 'btn btn-secondary' : 'btn btn-primary'}
              style={{
                borderColor: isStepComplete ? 'var(--success-color)' : undefined,
                color: isStepComplete ? 'var(--success-color)' : undefined
              }}
            >
              <Check size={16} />
              {isStepComplete ? 'Step Completed (Tap to undo)' : 'I Completed This Step'}
            </button>

            {/* Previous & Next Step Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentStepIndex === 0}
                className="btn btn-outline btn-sm"
                style={{ opacity: currentStepIndex === 0 ? 0.4 : 1 }}
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <button
                onClick={() => setCurrentStepIndex((prev) => Math.min(currentMethod.steps.length - 1, prev + 1))}
                disabled={currentStepIndex === currentMethod.steps.length - 1}
                className="btn btn-outline btn-sm"
                style={{ opacity: currentStepIndex === currentMethod.steps.length - 1 ? 0.4 : 1 }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Simulator / Demonstration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentStep.command ? (
            <TerminalSimulator
              command={currentStep.command}
              outputPreview={
                currentStep.command.includes('adb install')
                  ? 'Performing Streamed Install\nSuccess\n[ChatXa 4.0 successfully installed on connected device]'
                  : currentStep.command.includes('flutter build')
                  ? 'Building Linux application in release mode...\n✓ Built build/linux/x64/release/bundle/chatxa (72.4MB)'
                  : currentStep.command.includes('quarantine')
                  ? '[Apple Gatekeeper quarantine attribute cleared for ChatXa.app]'
                  : undefined
              }
              distroName={platform.id === 'linux' ? 'ubuntu' : 'powershell'}
            />
          ) : (
            <div
              className="surface-card"
              style={{
                padding: 16,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                  padding: '4px 8px'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                  VISUAL DEMONSTRATION // STEP {currentStep.stepNumber}
                </span>
                <span className="badge">LIVE</span>
              </div>
              <img
                src={
                  platform.id === 'ios' && currentStep.stepNumber === 1 && currentMethod.id === 'sideloadly'
                    ? '/assets/screenshots/iphone-unsupported-file.png'
                    : platform.previewImage || '/assets/cinematic/ChatGPT Image Oct 10, 2026, 07_59_08 AM-1.png'
                }
                alt={`${platform.name} Demonstration`}
                style={{
                  width: '100%',
                  height: 320,
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  display: 'block'
                }}
              />
              <div style={{ padding: '12px 6px 0', fontSize: 12, color: 'var(--text-muted)' }}>
                {currentStep.title} — ChatXa 4.0 Verified Installation Flow
              </div>
            </div>
          )}

          {/* If Linux, show desktop generator below */}
          {platform.id === 'linux' && currentMethod.id === 'native-linux' && (
            <DesktopLauncherGenerator />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .guide-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
