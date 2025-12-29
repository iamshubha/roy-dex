import { Platform } from 'react-native';

import { Stack, XStack, YStack } from '../primitives';
import type { IStackProps } from '../primitives';
import { 
  getPremiumGlassStyles,
  getGradientGlassStyles,
} from '../utils/liquidGlassStyles';
import { GlassFloatEffect, GlassShimmerEffect } from '../utils/liquidGlassAnimations';

/**
 * Premium Glass Card Component
 * Showcases the enhanced liquid glass effects for eye-catching UI
 */

export interface IPremiumGlassCardProps extends IStackProps {
  /** Enable floating animation */
  floating?: boolean;
  /** Enable shimmer effect */
  shimmer?: boolean;
  /** Gradient direction for overlay */
  gradientDirection?: 'top' | 'bottom' | 'diagonal';
  /** Card variant for different visual styles */
  variant?: 'default' | 'premium' | 'gradient';
}

export function PremiumGlassCard({
  children,
  floating = false,
  shimmer = false,
  gradientDirection = 'diagonal',
  variant = 'default',
  ...props
}: IPremiumGlassCardProps) {
  const getStyles = () => {
    if (Platform.OS !== 'web') {
      return {
        bg: '$bg',
        borderWidth: 1,
        borderColor: '$borderSubdued',
      };
    }

    switch (variant) {
      case 'premium':
        return getPremiumGlassStyles();
      case 'gradient':
        return getGradientGlassStyles(gradientDirection);
      default:
        return {
          bg: '$bg',
          borderWidth: 1,
          borderColor: '$borderSubdued',
        };
    }
  };

  const cardContent = (
    <Stack
      borderRadius="$4"
      borderCurve="continuous"
      p="$5"
      {...getStyles()}
      {...props}
    >
      {children}
    </Stack>
  );

  // Apply animations
  let enhancedCard = cardContent;

  if (shimmer && Platform.OS === 'web') {
    enhancedCard = (
      <GlassShimmerEffect duration={3000}>
        {enhancedCard}
      </GlassShimmerEffect>
    );
  }

  if (floating && Platform.OS === 'web') {
    enhancedCard = (
      <GlassFloatEffect>
        {enhancedCard}
      </GlassFloatEffect>
    );
  }

  return enhancedCard;
}

/**
 * Premium Glass Hero Card
 * For featured content with maximum visual impact
 */
export function PremiumGlassHeroCard({
  children,
  ...props
}: IPremiumGlassCardProps) {
  return (
    <PremiumGlassCard
      variant="premium"
      floating
      shimmer
      {...props}
    >
      {children}
    </PremiumGlassCard>
  );
}

/**
 * Premium Glass Gradient Card
 * For sections with gradient overlays
 */
export function PremiumGlassGradientCard({
  children,
  gradientDirection = 'diagonal',
  ...props
}: IPremiumGlassCardProps) {
  return (
    <PremiumGlassCard
      variant="gradient"
      gradientDirection={gradientDirection}
      {...props}
    >
      {children}
    </PremiumGlassCard>
  );
}

/**
 * Premium Glass Panel
 * For dashboard sections and content panels
 */
export function PremiumGlassPanel({
  title,
  subtitle,
  children,
  actions,
  ...props
}: IPremiumGlassCardProps & {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <PremiumGlassCard variant="premium" {...props}>
      {(title || subtitle || actions) && (
        <XStack justifyContent="space-between" alignItems="center" mb="$4">
          <YStack flex={1}>
            {title && (
              <Stack>
                {/* Title would use Heading component */}
                {title}
              </Stack>
            )}
            {subtitle && (
              <Stack mt="$1">
                {/* Subtitle would use SizableText */}
                {subtitle}
              </Stack>
            )}
          </YStack>
          {actions && <Stack>{actions}</Stack>}
        </XStack>
      )}
      {children}
    </PremiumGlassCard>
  );
}
