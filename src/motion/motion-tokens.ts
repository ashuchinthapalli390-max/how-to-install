/**
 * CHATXA 4.0 — CENTRALIZED MOTION DESIGN SYSTEM
 * Reusable motion tokens, timing scales, and easing curves
 * based on the CreaXa visual language.
 */

export const MOTION_DURATIONS = {
  FAST: 150,           // Quick button hovers, micro-transforms, icon clicks
  STANDARD: 260,       // Card hovers, step transitions, tabs, dialog popups
  EMPHASIS: 450,       // Stage completion, modal reveals, accordion expands
  SECTION_REVEAL: 700, // Section entry, editorial typography reveal
  CINEMATIC: 1200      // Full experience storyboard scene transitions
} as const;

export const MOTION_EASINGS = {
  // Editorial smooth acceleration & deceleration
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  expoOut: 'cubic-bezier(0.19, 1, 0.22, 1)',
  // Subtle tactile spring for interactive hot spots & buttons
  springSubtle: 'cubic-bezier(0.175, 0.885, 0.32, 1.12)'
} as const;

/**
  * Checks if the user prefers reduced motion
  */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns a CSS transition string with reduced-motion fallback
 */
export function getMotionTransition(
  properties: string[] = ['all'],
  duration: keyof typeof MOTION_DURATIONS = 'STANDARD',
  easing: keyof typeof MOTION_EASINGS = 'easeOutCubic'
): string {
  if (prefersReducedMotion()) {
    return 'none';
  }
  const ms = MOTION_DURATIONS[duration];
  const ease = MOTION_EASINGS[easing];
  return properties.map((prop) => `${prop} ${ms}ms ${ease}`).join(', ');
}
