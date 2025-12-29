import { Platform } from 'react-native';
import { MotiView } from 'moti';
import type { MotiProps } from 'moti';
import type { ReactNode } from 'react';

import { shouldReduceMotion } from './liquidGlassStyles';

/**
 * Premium Liquid Glass Animation System
 * Provides sophisticated micro-interactions for eye-catching UI
 * Respects prefers-reduced-motion
 */

interface ILiquidGlassAnimationProps extends Partial<MotiProps> {
  children: ReactNode;
  /** Enable hover glow animation */
  enableHoverGlow?: boolean;
  /** Enable press depth animation */
  enablePressDepth?: boolean;
  /** Enable focus ring animation */
  enableFocusRing?: boolean;
  /** Custom animation type */
  animationType?: 'hover' | 'press' | 'focus' | 'float' | 'pulse' | 'custom';
}

export function LiquidGlassAnimation({
  children,
  enableHoverGlow = false,
  enablePressDepth = false,
  enableFocusRing = false,
  animationType = 'custom',
  ...motiProps
}: ILiquidGlassAnimationProps) {
  // Only apply animations on web
  if (Platform.OS !== 'web' || shouldReduceMotion()) {
    return <>{children}</>;
  }

  // Enhanced animation presets with more dramatic effects
  const animationPresets = {
    hover: {
      from: {
        scale: 1,
        opacity: 1,
      },
      animate: {
        scale: 1.03,
        opacity: 0.95,
      },
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 400,
      },
    },
    press: {
      from: {
        scale: 1,
      },
      animate: {
        scale: 0.96,
      },
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 400,
      },
    },
    focus: {
      from: {
        scale: 1,
      },
      animate: {
        scale: 1.02,
      },
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
      },
    },
    float: {
      from: {
        translateY: 0,
      },
      animate: {
        translateY: [-4, 0, -4],
      },
      transition: {
        type: 'timing',
        duration: 3000,
        loop: true,
      },
    },
    pulse: {
      from: {
        scale: 1,
        opacity: 1,
      },
      animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.9, 1],
      },
      transition: {
        type: 'timing',
        duration: 2000,
        loop: true,
      },
    },
  };

  // Select preset if provided
  const preset = animationPresets[animationType as keyof typeof animationPresets];

  return (
    <MotiView
      {...(preset || {})}
      {...motiProps}
    >
      {children}
    </MotiView>
  );
}

/**
 * Web-only hover animation wrapper
 */
export function GlassHoverAnimation({ children, ...props }: Omit<ILiquidGlassAnimationProps, 'animationType'>) {
  return (
    <LiquidGlassAnimation animationType="hover" enableHoverGlow {...props}>
      {children}
    </LiquidGlassAnimation>
  );
}

/**
 * Web-only press animation wrapper
 */
export function GlassPressAnimation({ children, ...props }: Omit<ILiquidGlassAnimationProps, 'animationType'>) {
  return (
    <LiquidGlassAnimation animationType="press" enablePressDepth {...props}>
      {children}
    </LiquidGlassAnimation>
  );
}

/**
 * Web-only focus animation wrapper
 */
export function GlassFocusAnimation({ children, ...props }: Omit<ILiquidGlassAnimationProps, 'animationType'>) {
  return (
    <LiquidGlassAnimation animationType="focus" enableFocusRing {...props}>
      {children}
    </LiquidGlassAnimation>
  );
}

/**
 * Shimmer effect animation for premium visual appeal
 * Creates a moving shine across the element
 */
export function GlassShimmerEffect({
  children,
  duration = 3000,
}: {
  children: ReactNode;
  duration?: number;
}) {
  if (Platform.OS !== 'web' || shouldReduceMotion()) {
    return <>{children}</>;
  }

  return (
    <MotiView
      from={{
        // @ts-expect-error - web-only CSS property
        backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
        // @ts-expect-error - web-only CSS property
        backgroundSize: '200% 100%',
        // @ts-expect-error - web-only CSS property
        backgroundPosition: '-200% 0',
      }}
      animate={{
        // @ts-expect-error - web-only CSS property
        backgroundPosition: ['200% 0', '-200% 0'],
      }}
      transition={{
        type: 'timing',
        duration,
        loop: true,
        repeatReverse: false,
      }}
      style={{
        // @ts-expect-error - web-only CSS property
        backgroundClip: 'padding-box',
      }}
    >
      {children}
    </MotiView>
  );
}

/**
 * Floating animation for cards and panels
 */
export function GlassFloatEffect({ children }: { children: ReactNode }) {
  return (
    <LiquidGlassAnimation animationType="float">
      {children}
    </LiquidGlassAnimation>
  );
}

/**
 * Pulse animation for attention-grabbing elements
 */
export function GlassPulseEffect({ children }: { children: ReactNode }) {
  return (
    <LiquidGlassAnimation animationType="pulse">
      {children}
    </LiquidGlassAnimation>
  );
}

/**
 * Enhanced glow effect animation with pulsing intensity
 * Animates box-shadow for vibrant, eye-catching interactions
 */
export function GlassGlowEffect({
  children,
  glowColor = 'rgba(0, 122, 255, 0.6)',
  intense = false,
}: {
  children: ReactNode;
  glowColor?: string;
  intense?: boolean;
}) {
  if (Platform.OS !== 'web' || shouldReduceMotion()) {
    return <>{children}</>;
  }

  const baseGlow = `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`;
  const intenseGlow = `0 0 30px ${glowColor}, 0 0 60px ${glowColor}, 0 0 90px ${glowColor}`;

  return (
    <MotiView
      from={{
        // @ts-expect-error - web-only CSS property
        boxShadow: baseGlow,
      }}
      animate={{
        // @ts-expect-error - web-only CSS property
        boxShadow: [baseGlow, intense ? intenseGlow : `0 0 24px ${glowColor}, 0 0 48px ${glowColor}`, baseGlow],
      }}
      transition={{
        type: 'timing',
        duration: 2000,
        loop: true,
      }}
    >
      {children}
    </MotiView>
  );
}
