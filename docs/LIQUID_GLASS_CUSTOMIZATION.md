# Liquid Glass UI - Customization & Extension Guide

## Overview
This guide helps developers customize and extend the Liquid Glass UI implementation.

## Customizing Design Tokens

### Modifying Glass Colors
Edit `packages/components/tamagui.config.ts`:

```typescript
const liquidGlassTokens = {
  // Adjust transparency levels
  glassBg: 'rgba(255, 255, 255, 0.08)', // Change 0.08 to desired opacity
  
  // Modify glow colors to match your brand
  glowPrimary: 'rgba(0, 122, 255, 0.5)', // Your primary brand color with alpha
  glowSuccess: 'rgba(52, 199, 89, 0.5)',
  
  // Adjust blur intensities
  blurMd: '16px', // Change to your preferred blur amount
};
```

### Adding New Glass Variants
```typescript
const liquidGlassTokens = {
  // ... existing tokens
  
  // Add custom variants
  glassSubtle: 'rgba(255, 255, 255, 0.04)',
  glassIntense: 'rgba(255, 255, 255, 0.24)',
  glowWarning: 'rgba(255, 204, 0, 0.5)',
  blurXxl: '48px',
};
```

## Creating Custom Glass Components

### Basic Glass Card
```typescript
import { Platform } from 'react-native';
import { Stack } from '@onekeyhq/components';
import { getGlassStyles } from '@onekeyhq/components/src/utils/liquidGlassStyles';
import type { IStackProps } from '@onekeyhq/components';

interface IGlassCardProps extends IStackProps {
  intensity?: 'subtle' | 'standard' | 'strong';
}

export function GlassCard({ 
  intensity = 'standard', 
  children, 
  ...props 
}: IGlassCardProps) {
  const opacityMap = {
    subtle: 0.05,
    standard: 0.1,
    strong: 0.16,
  };
  
  const glassStyles = Platform.OS === 'web'
    ? getGlassStyles({ 
        blur: 'md', 
        opacity: opacityMap[intensity] 
      })
    : {};
  
  return (
    <Stack
      bg="$bg"
      borderRadius="$3"
      borderWidth="$px"
      borderColor="$borderSubdued"
      p="$4"
      {...glassStyles}
      {...props}
    >
      {children}
    </Stack>
  );
}
```

### Interactive Glass Panel
```typescript
import { Platform } from 'react-native';
import { useState } from 'react';
import { Stack } from '@onekeyhq/components';
import { 
  getGlassStyles, 
  getGlassHoverStyles,
  getGlassPressStyles 
} from '@onekeyhq/components/src/utils/liquidGlassStyles';

export function InteractiveGlassPanel({ children, onPress, ...props }) {
  const [isPressed, setIsPressed] = useState(false);
  
  const glassStyles = Platform.OS === 'web'
    ? getGlassStyles({ blur: 'lg', opacity: 0.12 })
    : {};
    
  const hoverStyles = Platform.OS === 'web'
    ? getGlassHoverStyles({ glowColor: '$glowAccent' })
    : {};
    
  const pressStyles = Platform.OS === 'web'
    ? getGlassPressStyles()
    : {};
  
  return (
    <Stack
      {...glassStyles}
      hoverStyle={hoverStyles}
      pressStyle={pressStyles}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      cursor="pointer"
      {...props}
    >
      {children}
    </Stack>
  );
}
```

### Glass Modal Overlay
```typescript
import { Platform } from 'react-native';
import { Stack, YStack } from '@onekeyhq/components';
import { getGlassStyles } from '@onekeyhq/components/src/utils/liquidGlassStyles';

export function GlassModal({ 
  isOpen, 
  onClose, 
  children 
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;
  
  const glassStyles = Platform.OS === 'web'
    ? getGlassStyles({ blur: 'xl', opacity: 0.2 })
    : {};
  
  return (
    <Stack
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0, 0, 0, 0.5)"
      onPress={onClose}
      zIndex={1000}
    >
      <YStack
        m="auto"
        maxWidth={480}
        bg="$bg"
        borderRadius="$4"
        p="$6"
        {...glassStyles}
        onPress={(e) => e.stopPropagation()}
      >
        {children}
      </YStack>
    </Stack>
  );
}
```

## Advanced Customizations

### Custom Blur Implementation
For special cases where you need different blur behavior:

```typescript
import { Platform } from 'react-native';
import type { StackProps } from '@onekeyhq/components';

export function getCustomGlassEffect(config: {
  blurRadius: number;
  saturation: number;
  brightness: number;
  opacity: number;
}): StackProps {
  if (Platform.OS !== 'web') return {};
  
  const { blurRadius, saturation, brightness, opacity } = config;
  
  return {
    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
    // @ts-expect-error - web-only CSS
    backdropFilter: `blur(${blurRadius}px) saturate(${saturation}%) brightness(${brightness}%)`,
    // @ts-expect-error - web-only CSS
    WebkitBackdropFilter: `blur(${blurRadius}px) saturate(${saturation}%) brightness(${brightness}%)`,
  } as StackProps;
}

// Usage
const advancedGlass = getCustomGlassEffect({
  blurRadius: 20,
  saturation: 150,
  brightness: 110,
  opacity: 0.15,
});
```

### Animated Blur Intensity
Using Moti for dynamic blur changes:

```typescript
import { MotiView } from 'moti';
import { useState } from 'react';

export function DynamicGlassCard({ children }) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <MotiView
      from={{ 
        // @ts-expect-error - web CSS property
        backdropFilter: 'blur(8px)' 
      }}
      animate={{ 
        // @ts-expect-error - web CSS property
        backdropFilter: isFocused ? 'blur(24px)' : 'blur(8px)' 
      }}
      transition={{ type: 'timing', duration: 300 }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {children}
    </MotiView>
  );
}
```

### Conditional Glass by Context
Apply glass effects based on app state:

```typescript
import { createContext, useContext } from 'react';

const GlassThemeContext = createContext({
  glassEnabled: true,
  glassIntensity: 'medium' as 'low' | 'medium' | 'high',
});

export function useGlassTheme() {
  return useContext(GlassThemeContext);
}

export function GlassThemeProvider({ children, enabled = true, intensity = 'medium' }) {
  return (
    <GlassThemeContext.Provider value={{ glassEnabled: enabled, glassIntensity: intensity }}>
      {children}
    </GlassThemeContext.Provider>
  );
}

// Usage in components
function MyComponent() {
  const { glassEnabled, glassIntensity } = useGlassTheme();
  
  const intensityMap = { low: 0.05, medium: 0.1, high: 0.16 };
  
  const glassStyles = Platform.OS === 'web' && glassEnabled
    ? getGlassStyles({ opacity: intensityMap[glassIntensity] })
    : {};
  
  return <Stack {...glassStyles}>Content</Stack>;
}
```

## Performance Optimization

### Lazy Glass Application
Only apply glass effects when element is in viewport:

```typescript
import { useEffect, useRef, useState } from 'react';

function useInViewport() {
  const ref = useRef<any>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current || Platform.OS !== 'web') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return { ref, isInView };
}

export function LazyGlassCard({ children }) {
  const { ref, isInView } = useInViewport();
  
  const glassStyles = Platform.OS === 'web' && isInView
    ? getGlassStyles({ blur: 'md' })
    : {};
  
  return (
    <Stack ref={ref} {...glassStyles}>
      {children}
    </Stack>
  );
}
```

### Conditional GPU Acceleration
```typescript
export function OptimizedGlassPanel({ isAnimating, children }) {
  const optimizationStyles = Platform.OS === 'web' && isAnimating ? {
    // @ts-expect-error - web CSS
    willChange: 'backdrop-filter, transform',
    transform: 'translateZ(0)',
  } : {};
  
  return (
    <Stack {...getGlassStyles()} {...optimizationStyles}>
      {children}
    </Stack>
  );
}
```

## Theme Integration

### Dark Mode Adjustments
```typescript
import { useThemeName } from '@onekeyhq/components';

export function ThemeAwareGlassCard({ children }) {
  const theme = useThemeName();
  
  const glassColor = theme === 'dark' 
    ? 'rgba(0, 0, 0, 0.12)'
    : 'rgba(255, 255, 255, 0.12)';
  
  const glassStyles = Platform.OS === 'web' ? {
    backgroundColor: glassColor,
    // @ts-expect-error - web CSS
    backdropFilter: 'blur(16px) saturate(180%)',
  } : {};
  
  return <Stack {...glassStyles}>{children}</Stack>;
}
```

## Testing Glass Effects

### Visual Regression Tests
```typescript
// In your test file
describe('GlassCard', () => {
  it('applies glass styles on web', () => {
    Platform.OS = 'web';
    const { getByTestId } = render(<GlassCard testID="glass-card">Content</GlassCard>);
    const element = getByTestId('glass-card');
    
    // Check for backdrop-filter
    expect(element.style.backdropFilter).toContain('blur');
  });
  
  it('does not apply glass styles on native', () => {
    Platform.OS = 'ios';
    const { getByTestId } = render(<GlassCard testID="glass-card">Content</GlassCard>);
    const element = getByTestId('glass-card');
    
    expect(element.style.backdropFilter).toBeUndefined();
  });
});
```

### Accessibility Testing
```typescript
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('glass components are accessible', async () => {
  const { container } = render(
    <GlassCard>
      <Button>Click me</Button>
    </GlassCard>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Migration from Solid Backgrounds

### Finding Components to Migrate
```bash
# Search for components with solid backgrounds
grep -r "bg='\$bg" packages/components/src/

# Find components with border styles
grep -r "borderColor='\$border" packages/components/src/
```

### Migration Pattern
```typescript
// Before: Solid background
<Stack bg="$bg" borderWidth="$px" borderColor="$border">
  Content
</Stack>

// After: Glass effect
<Stack 
  bg="$bg" 
  borderWidth="$px" 
  borderColor="$border"
  {...(Platform.OS === 'web' ? getGlassStyles({ blur: 'md' }) : {})}
>
  Content
</Stack>
```

## Troubleshooting

### Glass Not Rendering
1. Verify platform check: `Platform.OS === 'web'`
2. Check browser support for backdrop-filter
3. Ensure element has content behind it
4. Verify opacity isn't too low

### Performance Issues
1. Reduce number of glass layers
2. Use `isolation: isolate` on containers
3. Avoid animating backdrop-filter
4. Use lazy loading for off-screen elements

### Z-Index Issues
```typescript
// Ensure proper stacking context
<Stack 
  {...glassStyles}
  zIndex={100}
  style={{ isolation: 'isolate' }}
>
```

## Resources

- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [Moti Documentation](https://moti.fyi/)
- [Tamagui Documentation](https://tamagui.dev/)
- Browser Compatibility: [caniuse.com/backdrop-filter](https://caniuse.com/backdrop-filter)

## Getting Help

For questions or issues with Liquid Glass implementation:
1. Check [LIQUID_GLASS_IMPLEMENTATION.md](./LIQUID_GLASS_IMPLEMENTATION.md) for overview
2. Reference [LIQUID_GLASS_QUICK_REFERENCE.md](./LIQUID_GLASS_QUICK_REFERENCE.md) for API docs
3. Look at existing component implementations in the codebase
4. Open an issue with reproduction steps
