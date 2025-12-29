import { Platform } from 'react-native';

import type { ColorTokens, StackProps } from '../shared/tamagui';

/**
 * Liquid Glass UI utility functions for web-only visual enhancements
 * These styles provide frosted glass, backdrop blur, and glowing accents
 */

export interface LiquidGlassStyleOptions {
  /** Blur intensity: 'sm' | 'md' | 'lg' | 'xl' */
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  /** Background opacity (0-1) */
  opacity?: number;
  /** Glow color on hover */
  glowColor?: ColorTokens;
  /** Border thickness */
  borderWidth?: number;
  /** Enable glow effect on hover */
  enableGlow?: boolean;
  /** Enable depth effect on press */
  enableDepth?: boolean;
}

const blurValues = {
  sm: 8,
  md: 20,
  lg: 32,
  xl: 48,
  xxl: 64,
};

/**
 * Returns enhanced base glass effect styles for web
 * Provides dramatic backdrop blur, translucent background, and premium visual effects
 */
export function getGlassStyles(
  options: LiquidGlassStyleOptions = {},
): StackProps {
  const {
    blur = 'md',
    opacity = 0.12,
    borderWidth = 1,
  } = options;

  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    borderWidth,
    borderColor: `rgba(255, 255, 255, ${opacity * 2.5})`,
    // @ts-expect-error - web-only CSS property
    backdropFilter: `blur(${blurValues[blur]}px) saturate(200%) brightness(105%)`,
    // @ts-expect-error - web-only CSS property
    WebkitBackdropFilter: `blur(${blurValues[blur]}px) saturate(200%) brightness(105%)`,
    // @ts-expect-error - web-only CSS property
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  } as StackProps;
}

/**
 * Returns enhanced hover glass effect styles with vibrant glow
 */
export function getGlassHoverStyles(
  options: LiquidGlassStyleOptions = {},
): StackProps {
  const { glowColor = '$glowPrimary', enableGlow = true } = options;

  if (Platform.OS !== 'web' || !enableGlow) {
    return {};
  }

  return {
    // @ts-expect-error - web-only CSS property
    boxShadow: `0 0 24px ${glowColor}, 0 0 48px ${glowColor}, 0 12px 40px rgba(0, 0, 0, 0.25)`,
    borderColor: `rgba(255, 255, 255, 0.4)`,
    // @ts-expect-error - web-only CSS property
    transform: 'translateY(-2px)',
    // @ts-expect-error - web-only CSS property
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  } as StackProps;
}

/**
 * Returns press glass effect styles with depth
 */
export function getGlassPressStyles(
  options: LiquidGlassStyleOptions = {},
): StackProps {
  const { enableDepth = true } = options;

  if (Platform.OS !== 'web' || !enableDepth) {
    return {};
  }

  return {
    // @ts-expect-error - web-only CSS property
    transform: 'scale(0.98) translateY(1px)',
    // @ts-expect-error - web-only CSS property
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  } as StackProps;
}

/**
 * Returns focus ring glass effect styles
 */
export function getGlassFocusStyles(glowColor: ColorTokens = '$glowPrimary'): StackProps {
  if (Platform.OS !== 'web') {
    return {};
  }

  return {
    // @ts-expect-error - web-only CSS property
    boxShadow: `0 0 0 3px ${glowColor}`,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  } as StackProps;
}

/**
 * CSS custom properties for backdrop-filter support detection
 */
export const liquidGlassCSSProperties = `
  :root {
    --supports-backdrop-filter: true;
  }

  @supports not (backdrop-filter: blur(10px)) {
    :root {
      --supports-backdrop-filter: false;
    }
  }
`;

/**
 * Premium glass effect for hero cards and featured content
 */
export function getPremiumGlassStyles(): StackProps {
  if (Platform.OS !== 'web') return {};

  return {
    // @ts-expect-error - web-only CSS property
    backdropFilter: 'blur(32px) saturate(180%) brightness(110%)',
    // @ts-expect-error - web-only CSS property
    WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(110%)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    // @ts-expect-error - web-only CSS property
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
  } as StackProps;
}

/**
 * Frosted glass effect for modals and overlays
 */
export function getFrostedGlassStyles(): StackProps {
  if (Platform.OS !== 'web') return {};

  return {
    // @ts-expect-error - web-only CSS property
    backdropFilter: 'blur(48px) saturate(150%)',
    // @ts-expect-error - web-only CSS property
    WebkitBackdropFilter: 'blur(48px) saturate(150%)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    // @ts-expect-error - web-only CSS property
    boxShadow: '0 20px 60px 0 rgba(0, 0, 0, 0.3)',
  } as StackProps;
}

/**
 * Gradient glass overlay for premium visual hierarchy
 */
export function getGradientGlassStyles(direction: 'top' | 'bottom' | 'diagonal' = 'diagonal'): StackProps {
  if (Platform.OS !== 'web') return {};

  const gradients = {
    top: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
    bottom: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%)',
    diagonal: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 100%)',
  };

  return {
    // @ts-expect-error - web-only CSS property
    background: gradients[direction],
    // @ts-expect-error - web-only CSS property
    backdropFilter: 'blur(24px) saturate(180%)',
    // @ts-expect-error - web-only CSS property
    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
  } as StackProps;
}

/**
 * Utility to check if reduced motion is preferred
 */
export function shouldReduceMotion(): boolean {
  if (Platform.OS !== 'web') return false;
  
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animation config for liquid glass micro-interactions
 */
export const liquidGlassAnimations = {
  hover: {
    duration: 200,
    type: 'timing' as const,
  },
  press: {
    duration: 100,
    type: 'timing' as const,
  },
  glow: {
    duration: 300,
    type: 'spring' as const,
    damping: 15,
    stiffness: 300,
  },
};
