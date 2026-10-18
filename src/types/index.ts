export type PlatformId = 'android' | 'ios' | 'windows' | 'macos' | 'linux';

export type ThemeMode = 'original' | 'dark' | 'light';

export interface InstallationStep {
  stepNumber: number;
  title: string;
  instruction: string;
  detail?: string;
  command?: string;
  codeBlock?: string;
  screenshot?: string;
  warning?: string;
  tip?: string;
}

export interface InstallationMethod {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requiresPc: boolean;
  toolsNeeded: string[];
  compatibility: string;
  warning?: string;
  isOfficial?: boolean;
  isArchival?: boolean;
  steps: InstallationStep[];
}

export interface BrandSetting {
  brand: string;
  osName: string;
  instructions: string[];
  warning?: string;
}

export interface PlatformInfo {
  id: PlatformId;
  name: string;
  label: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  fileExtension: string;
  releaseFileName?: string;
  releaseFileSize?: string;
  previewImage?: string;
  methods: InstallationMethod[];
  troubleshootingShortcuts: string[];
  brandNotes?: BrandSetting[];
  systemRequirements: Array<{ label: string; value: string }>;
}

export interface ReleaseArtifact {
  id: string;
  platform: PlatformId;
  platformName: string;
  version: string;
  fileName: string;
  fileSize: string;
  architecture: string;
  fileType: string;
  releaseDate: string;
  sha256: string;
  minOs: string;
  status: 'verified' | 'build-required' | 'legacy';
  downloadUrl?: string;
  directFilePath?: string;
  releaseNotes: string[];
  sourceBuildCommand?: string;
}

export interface TroubleshootingItem {
  id: string;
  platform: PlatformId | 'all';
  title: string;
  symptom: string;
  rootCause: string;
  verification: string;
  solutionSteps: string[];
  relatedDocUrl?: string;
  category: 'Installation' | 'Permissions' | 'Gatekeeper' | 'Dependencies' | 'Audio/Video' | 'Network';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  platform?: PlatformId | 'general';
  tags: string[];
}

export type TutorialMode = 'watch' | 'interactive' | 'read';

export type GuideLanguage = 'en' | 'te' | 'hi' | 'ta' | 'ml';

export interface InteractiveHotspotData {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  label: string;
  targetAction: string;
  tooltip: {
    what: string;
    why: string;
    where: string;
    whatNext: string;
    troubleshooting: string;
  };
}

export interface SimulatorScreenState {
  stepNumber: number;
  screenId: string;
  title: string;
  osBadge: string;
  subtitle: string;
  hotspots?: InteractiveHotspotData[];
  narrationText?: Record<GuideLanguage, string>;
}

export interface DecisionTreeNode {
  id: string;
  platform: PlatformId | 'all';
  symptom: string;
  question: string;
  options: Array<{
    label: string;
    nextNodeId?: string;
    solution?: {
      title: string;
      explanation: string;
      commands?: string[];
      steps: string[];
      officialDocUrl?: string;
    };
  }>;
}

export interface ProgressDashboardState {
  selectedPlatform: PlatformId;
  selectedMethodId: string;
  currentStepIndex: number;
  totalSteps: number;
  completedStepIds: string[];
  lastUpdated: string;
}
