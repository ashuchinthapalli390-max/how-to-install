import React from 'react';
import type { TutorialMode, GuideLanguage } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  MousePointer,
  FileText,
  Globe,
  Volume2,
  VolumeX,
  Target
} from 'lucide-react';

interface TutorialModeSelectorProps {
  mode: TutorialMode;
  onSelectMode: (mode: TutorialMode) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  language: GuideLanguage;
  onChangeLanguage: (lang: GuideLanguage) => void;
  muted: boolean;
  onToggleMute: () => void;
  onReset: () => void;
}

const LANGUAGES: Array<{ id: GuideLanguage; label: string; native: string }> = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'te', label: 'Telugu', native: 'తెలుగు' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'ml', label: 'Malayalam', native: 'മലയാളം' }
];

export const TutorialModeSelector: React.FC<TutorialModeSelectorProps> = ({
  mode,
  onSelectMode,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  showHotspots,
  onToggleHotspots,
  language,
  onChangeLanguage,
  muted,
  onToggleMute,
  onReset
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 18px',
        borderRadius: 'var(--radius)',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--line)',
        flexWrap: 'wrap',
        gap: 14
      }}
    >
      {/* 3 Tutorial Modes Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'var(--raised)', padding: 4, borderRadius: 'var(--radius)' }}>
        <button
          onClick={() => onSelectMode('watch')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontFamily: 'var(--heading)',
            fontWeight: 650,
            border: 0,
            cursor: 'pointer',
            backgroundColor: mode === 'watch' ? 'var(--accent)' : 'transparent',
            color: mode === 'watch' ? 'var(--on-accent)' : 'var(--muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <Play size={12} fill="currentColor" />
          <span>WATCH DEMO</span>
        </button>

        <button
          onClick={() => onSelectMode('interactive')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontFamily: 'var(--heading)',
            fontWeight: 650,
            border: 0,
            cursor: 'pointer',
            backgroundColor: mode === 'interactive' ? 'var(--accent)' : 'transparent',
            color: mode === 'interactive' ? 'var(--on-accent)' : 'var(--muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <MousePointer size={12} />
          <span>TRY INTERACTIVE</span>
        </button>

        <button
          onClick={() => onSelectMode('read')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontFamily: 'var(--heading)',
            fontWeight: 650,
            border: 0,
            cursor: 'pointer',
            backgroundColor: mode === 'read' ? 'var(--accent)' : 'transparent',
            color: mode === 'read' ? 'var(--on-accent)' : 'var(--muted)',
            transition: 'all 0.2s ease'
          }}
        >
          <FileText size={12} />
          <span>READ STEPS</span>
        </button>
      </div>

      {/* Simulator Controls & Speed (When in Watch Mode) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {mode === 'watch' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={onTogglePlay}
              className="button secondary sm"
              style={{ minHeight: 30, padding: '4px 10px', fontSize: 11, gap: 6 }}
              title={isPlaying ? 'Pause Demo' : 'Play Demo'}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            {/* Playback speed toggle */}
            <button
              onClick={() => {
                const nextSpeed = playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1;
                onChangeSpeed(nextSpeed);
              }}
              className="button secondary sm"
              style={{ minHeight: 30, padding: '4px 8px', fontSize: 10, fontFamily: 'var(--mono)' }}
              title="Change Speed"
            >
              {playbackSpeed}x
            </button>
          </div>
        )}

        {/* Hotspots Assistance Toggle */}
        <button
          onClick={onToggleHotspots}
          className="button secondary sm"
          style={{
            minHeight: 30,
            padding: '4px 10px',
            fontSize: 11,
            gap: 6,
            borderColor: showHotspots ? 'var(--accent)' : 'var(--line)',
            color: showHotspots ? 'var(--accent)' : 'var(--muted)'
          }}
          title="Toggle Clickable Hotspots"
        >
          <Target size={12} />
          <span>{showHotspots ? 'Hotspots Active' : 'Hotspots Hidden'}</span>
        </button>

        {/* Audio Narration Toggle */}
        <button
          onClick={onToggleMute}
          className="icon-btn"
          style={{ minHeight: 30, minWidth: 30 }}
          title={muted ? 'Enable Narration Audio' : 'Mute Audio'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>

        {/* Multi-Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Globe size={13} style={{ color: 'var(--muted)' }} />
          <select
            value={language}
            onChange={(e) => onChangeLanguage(e.target.value as GuideLanguage)}
            style={{
              padding: '4px 8px',
              fontSize: 11,
              fontFamily: 'var(--heading)',
              backgroundColor: 'var(--raised)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text)',
              minHeight: 30
            }}
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} ({l.native})
              </option>
            ))}
          </select>
        </div>

        {/* Reset Progress Button */}
        <button
          onClick={onReset}
          className="icon-btn"
          style={{ minHeight: 30, minWidth: 30 }}
          title="Reset Tutorial to Step 1"
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </div>
  );
};
