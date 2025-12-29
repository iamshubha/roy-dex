/**
 * Premium Liquid Glass Showcase
 * Demonstrates all enhanced visual effects for maximum impact
 * Use this as a reference for creating outstanding, eye-catching interfaces
 */

import { 
  YStack, 
  XStack, 
  Heading, 
  SizableText, 
  Button,
  Stack,
} from '@onekeyhq/components/src/primitives';
import {
  PremiumGlassHeroCard,
  PremiumGlassCard,
  PremiumGlassGradientCard,
  PremiumGlassPanel,
} from '@onekeyhq/components/src/composite/PremiumGlassCard';
import {
  GlassShimmerEffect,
  GlassFloatEffect,
  GlassPulseEffect,
  GlassGlowEffect,
} from '@onekeyhq/components/src/utils/liquidGlassAnimations';

/**
 * Hero Section - Maximum Visual Impact
 */
export function ShowcaseHeroSection() {
  return (
    <YStack p="$8" gap="$6" bg="$bgApp">
      {/* Primary Hero Card - All effects enabled */}
      <PremiumGlassHeroCard>
        <YStack gap="$4" py="$8" px="$6">
          <Heading size="$heading4xl" textAlign="center">
            Outstanding Design
          </Heading>
          <SizableText size="$bodyLg" textAlign="center" color="$textSubdued">
            Premium liquid glass with shimmer, float, and vibrant glows
          </SizableText>
          
          {/* Glowing CTA Button */}
          <XStack justifyContent="center" mt="$4">
            <GlassGlowEffect glowColor="rgba(0, 122, 255, 0.8)" intense>
              <Button size="large" variant="primary">
                Get Started
              </Button>
            </GlassGlowEffect>
          </XStack>
        </YStack>
      </PremiumGlassHeroCard>
    </YStack>
  );
}

/**
 * Feature Cards - Gradient Overlays
 */
export function ShowcaseFeatureCards() {
  return (
    <XStack gap="$4" p="$4">
      {/* Diagonal gradient */}
      <PremiumGlassGradientCard flex={1} gradientDirection="diagonal">
        <YStack gap="$3" p="$4">
          <Heading size="$headingLg">Feature 1</Heading>
          <SizableText color="$textSubdued">
            Beautiful gradient overlay
          </SizableText>
        </YStack>
      </PremiumGlassGradientCard>

      {/* Floating card with shimmer */}
      <GlassShimmerEffect>
        <PremiumGlassCard variant="premium" floating flex={1}>
          <YStack gap="$3" p="$4">
            <Heading size="$headingLg">Feature 2</Heading>
            <SizableText color="$textSubdued">
              Floating with shimmer
            </SizableText>
          </YStack>
        </PremiumGlassCard>
      </GlassShimmerEffect>

      {/* Gradient from bottom */}
      <PremiumGlassGradientCard flex={1} gradientDirection="bottom">
        <YStack gap="$3" p="$4">
          <Heading size="$headingLg">Feature 3</Heading>
          <SizableText color="$textSubdued">
            Bottom gradient effect
          </SizableText>
        </YStack>
      </PremiumGlassGradientCard>
    </XStack>
  );
}

/**
 * Dashboard Panels - Premium Glass
 */
export function ShowcaseDashboard() {
  return (
    <YStack gap="$4" p="$4">
      {/* Stats Panel with actions */}
      <PremiumGlassPanel
        title="Statistics"
        subtitle="Real-time overview"
        actions={
          <Button size="small" variant="secondary">
            View All
          </Button>
        }
      >
        <XStack gap="$4">
          {[
            { label: 'Users', value: '12.5K', color: '$glowPrimary' },
            { label: 'Revenue', value: '$45K', color: '$glowSuccess' },
            { label: 'Growth', value: '+23%', color: '$glowGold' },
          ].map((stat, index) => (
            <GlassFloatEffect key={index}>
              <Stack flex={1} p="$4" borderRadius="$3" bg="$glassBg">
                <SizableText size="$bodyMd" color="$textSubdued">
                  {stat.label}
                </SizableText>
                <Heading size="$heading2xl" mt="$2">
                  {stat.value}
                </Heading>
              </Stack>
            </GlassFloatEffect>
          ))}
        </XStack>
      </PremiumGlassPanel>

      {/* Content Panel */}
      <PremiumGlassCard variant="premium">
        <YStack gap="$3" p="$5">
          <Heading size="$headingXl">Recent Activity</Heading>
          <YStack gap="$2">
            {[1, 2, 3].map((item) => (
              <XStack
                key={item}
                p="$3"
                borderRadius="$2"
                bg="$glassBgLight"
                alignItems="center"
                gap="$3"
              >
                <Stack
                  width="$10"
                  height="$10"
                  borderRadius="$full"
                  bg="$glassBgStrong"
                />
                <YStack flex={1}>
                  <SizableText size="$bodyMd">Activity {item}</SizableText>
                  <SizableText size="$bodySm" color="$textSubdued">
                    Just now
                  </SizableText>
                </YStack>
              </XStack>
            ))}
          </YStack>
        </YStack>
      </PremiumGlassCard>
    </YStack>
  );
}

/**
 * Interactive Buttons Showcase
 */
export function ShowcaseButtons() {
  return (
    <YStack gap="$4" p="$6" bg="$bgApp">
      <Heading size="$headingXl" mb="$4">
        Interactive Elements
      </Heading>

      {/* Primary Actions with Glows */}
      <XStack gap="$3" flexWrap="wrap">
        <GlassGlowEffect glowColor="rgba(0, 122, 255, 0.8)" intense>
          <Button size="large" variant="primary">
            Primary Glow
          </Button>
        </GlassGlowEffect>

        <GlassGlowEffect glowColor="rgba(52, 199, 89, 0.8)" intense>
          <Button size="large" variant="primary" bg="$buttonSuccess">
            Success Glow
          </Button>
        </GlassGlowEffect>

        <GlassGlowEffect glowColor="rgba(94, 92, 230, 0.8)" intense>
          <Button size="large" variant="secondary">
            Accent Glow
          </Button>
        </GlassGlowEffect>

        <GlassGlowEffect glowColor="rgba(255, 204, 0, 0.8)">
          <Button size="large" variant="secondary">
            Gold Accent
          </Button>
        </GlassGlowEffect>
      </XStack>

      {/* Pulsing Badges */}
      <XStack gap="$3" mt="$4">
        <GlassPulseEffect>
          <Stack px="$3" py="$1.5" borderRadius="$full" bg="$glowPrimary">
            <SizableText size="$bodySm" color="$textOnColor">
              New
            </SizableText>
          </Stack>
        </GlassPulseEffect>

        <GlassPulseEffect>
          <Stack px="$3" py="$1.5" borderRadius="$full" bg="$glowSuccess">
            <SizableText size="$bodySm" color="$textOnColor">
              Active
            </SizableText>
          </Stack>
        </GlassPulseEffect>

        <GlassPulseEffect>
          <Stack px="$3" py="$1.5" borderRadius="$full" bg="$glowGold">
            <SizableText size="$bodySm" color="$textOnColor">
              Premium
            </SizableText>
          </Stack>
        </GlassPulseEffect>
      </XStack>
    </YStack>
  );
}

/**
 * Product Cards - E-commerce Example
 */
export function ShowcaseProductCards() {
  return (
    <XStack gap="$4" p="$4" flexWrap="wrap">
      {[
        { name: 'Premium Product', price: '$299', featured: true },
        { name: 'Standard Product', price: '$199', featured: false },
        { name: 'Basic Product', price: '$99', featured: false },
      ].map((product, index) => (
        <GlassShimmerEffect key={index}>
          <PremiumGlassCard
            variant={product.featured ? 'premium' : 'default'}
            floating={product.featured}
            width={280}
          >
            <YStack gap="$3" p="$4">
              {/* Product Image Placeholder */}
              <Stack
                height={200}
                borderRadius="$3"
                bg="$glassBgStrong"
                overflow="hidden"
              />

              {/* Product Info */}
              <YStack gap="$2">
                <XStack justifyContent="space-between" alignItems="center">
                  <Heading size="$headingMd">{product.name}</Heading>
                  {product.featured && (
                    <GlassPulseEffect>
                      <Stack
                        px="$2"
                        py="$0.5"
                        borderRadius="$1"
                        bg="$glowGold"
                      >
                        <SizableText size="$bodyXs" color="$textOnColor">
                          Featured
                        </SizableText>
                      </Stack>
                    </GlassPulseEffect>
                  )}
                </XStack>

                <SizableText size="$bodyMd" color="$textSubdued">
                  Premium quality with glass effects
                </SizableText>

                <XStack
                  justifyContent="space-between"
                  alignItems="center"
                  mt="$2"
                >
                  <Heading size="$headingXl">{product.price}</Heading>
                  <Button size="small" variant="primary">
                    Add to Cart
                  </Button>
                </XStack>
              </YStack>
            </YStack>
          </PremiumGlassCard>
        </GlassShimmerEffect>
      ))}
    </XStack>
  );
}

/**
 * Full Page Example - Complete Showcase
 */
export function PremiumShowcasePage() {
  return (
    <YStack bg="$bgApp" flex={1}>
      {/* Hero Section */}
      <ShowcaseHeroSection />

      {/* Feature Cards */}
      <ShowcaseFeatureCards />

      {/* Dashboard */}
      <ShowcaseDashboard />

      {/* Interactive Elements */}
      <ShowcaseButtons />

      {/* Product Cards */}
      <ShowcaseProductCards />
    </YStack>
  );
}

export default PremiumShowcasePage;
