# Liquid Glass UI - Developer Quick Reference

## Quick Start

### Applying Glass Effects to Components

```typescript
import { Platform } from 'react-native';
import { Stack } from '@onekeyhq/components';
import { 
  getGlassStyles, 
  getGlassHoverStyles, 
  getGlassPressStyles 
} from '@onekeyhq/components/src/utils/liquidGlassStyles';

// Basic glass effect
function GlassCard() {
  const glassStyles = Platform.OS === 'web' 
    ? getGlassStyles({ blur: 'md', opacity: 0.1 })
    : {};
    
  return (
    <Stack {...glassStyles} bg="$bg" p="$4" borderRadius="$3">
      {/* Content */}
    </Stack>
  );
}

// With hover and press effects
function InteractiveGlassButton() {
  const glassStyles = Platform.OS === 'web'
    ? getGlassStyles({ blur: 'sm', opacity: 0.12 })
    : {};
    
  const hoverStyles = Platform.OS === 'web'
    ? getGlassHoverStyles({ glowColor: '$glowPrimary' })
    : {};
    
  const pressStyles = Platform.OS === 'web'
    ? getGlassPressStyles({ enableDepth: true })
    : {};
    
  return (
    <Stack
      {...glassStyles}
      hoverStyle={hoverStyles}
      pressStyle={pressStyles}
    >
      Click me
    </Stack>
  );
}
```

### Using Animation Wrappers

```typescript
import { 
  GlassHoverAnimation,
  GlassPressAnimation 
} from '@onekeyhq/components/src/utils/liquidGlassAnimations';

function AnimatedCard() {
  return (
    <GlassHoverAnimation>
      <Stack bg="$glassBg" p="$4">
        Hover me for animation
      </Stack>
    </GlassHoverAnimation>
  );
}
```

## Design Tokens

### Glass Background Colors
```typescript
'$glassBg'           // rgba(255, 255, 255, 0.08) - Base
'$glassBgLight'      // rgba(255, 255, 255, 0.12) - Lighter
'$glassBgStrong'     // rgba(255, 255, 255, 0.16) - Stronger
'$glassBgDark'       // rgba(0, 0, 0, 0.08) - Dark base
'$glassBgDarkLight'  // rgba(0, 0, 0, 0.12) - Dark lighter
'$glassBgDarkStrong' // rgba(0, 0, 0, 0.16) - Dark stronger
```

### Glow Colors
```typescript
'$glowPrimary'   // rgba(0, 122, 255, 0.5)
'$glowSuccess'   // rgba(52, 199, 89, 0.5)
'$glowCritical'  // rgba(255, 59, 48, 0.5)
'$glowAccent'    // rgba(94, 92, 230, 0.5)
```

### Blur Intensities
```typescript
blur: 'sm'  // 8px  - Subtle
blur: 'md'  // 16px - Medium (default)
blur: 'lg'  // 24px - Strong
blur: 'xl'  // 32px - Very strong
```

## Utility Functions Reference

### getGlassStyles(options)
Base frosted glass effect with backdrop-filter.

**Options:**
- `blur?: 'sm' | 'md' | 'lg' | 'xl'` - Default: 'md'
- `opacity?: number` - Background opacity (0-1), Default: 0.1
- `borderWidth?: number` - Default: 1

**Returns:** StackProps with backdrop-filter (web-only)

### getGlassHoverStyles(options)
Hover state with optional glow effect.

**Options:**
- `glowColor?: ColorTokens` - Default: '$glowPrimary'
- `enableGlow?: boolean` - Default: true

**Returns:** StackProps with box-shadow glow (web-only)

### getGlassPressStyles(options)
Press state with depth transformation.

**Options:**
- `enableDepth?: boolean` - Default: true

**Returns:** StackProps with scale and shadow (web-only)

### getGlassFocusStyles(glowColor)
Focus ring with glow effect.

**Parameters:**
- `glowColor?: ColorTokens` - Default: '$glowPrimary'

**Returns:** StackProps with focus ring shadow (web-only)

## Animation Components

### LiquidGlassAnimation
Base animation wrapper with Moti.

```typescript
<LiquidGlassAnimation
  animationType="hover" | "press" | "focus" | "custom"
  enableHoverGlow={boolean}
  enablePressDepth={boolean}
  enableFocusRing={boolean}
  {...motiProps}
>
  {children}
</LiquidGlassAnimation>
```

### GlassHoverAnimation
Pre-configured hover animation.

```typescript
<GlassHoverAnimation>
  {children}
</GlassHoverAnimation>
```

### GlassPressAnimation
Pre-configured press animation.

```typescript
<GlassPressAnimation>
  {children}
</GlassPressAnimation>
```

### GlassGlowEffect
Animated glow effect for interactive elements.

```typescript
<GlassGlowEffect glowColor="rgba(0, 122, 255, 0.5)">
  {children}
</GlassGlowEffect>
```

## Best Practices

### 1. Always Check Platform
```typescript
// ✅ Good - Platform check
const glassStyles = Platform.OS === 'web' 
  ? getGlassStyles()
  : {};

// ❌ Bad - Applied to all platforms
const glassStyles = getGlassStyles(); // Will add empty object on native
```

### 2. Use Appropriate Blur Intensity
```typescript
// Small interactive elements (buttons, inputs)
getGlassStyles({ blur: 'sm' })

// Medium panels (cards, modals)
getGlassStyles({ blur: 'md' })

// Large backgrounds (page containers, headers)
getGlassStyles({ blur: 'lg' })
```

### 3. Consider Opacity
```typescript
// Subtle effect - for layered UI
getGlassStyles({ opacity: 0.05 })

// Standard effect - for cards
getGlassStyles({ opacity: 0.1 })

// Strong effect - for modals/overlays
getGlassStyles({ opacity: 0.16 })
```

### 4. Respect Reduced Motion
All animations automatically respect `prefers-reduced-motion`. No additional code needed.

### 5. Don't Nest Too Many Glass Layers
```typescript
// ❌ Avoid - Performance issue
<Stack {...glassStyles}>
  <Stack {...glassStyles}>
    <Stack {...glassStyles}>
      Too many glass layers!
    </Stack>
  </Stack>
</Stack>

// ✅ Better - Glass on outer container only
<Stack {...glassStyles}>
  <Stack>
    <Stack>
      Content
    </Stack>
  </Stack>
</Stack>
```

## Browser Support

### Supported (with backdrop-filter)
- Chrome 76+
- Safari 13.1+
- Firefox 103+
- Edge 79+

### Supported (with fallback)
- All other modern browsers
- Automatically falls back to solid semi-opaque backgrounds

## Performance Tips

### GPU Acceleration
Glass effects automatically use GPU acceleration on web. To optimize:

```typescript
// For static glass elements
<Stack {...glassStyles} style={{ isolation: 'isolate' }}>

// For animated glass elements (already optimized)
<GlassHoverAnimation>
```

### Avoid Rapid Re-renders
```typescript
// ✅ Memoize glass styles
const glassStyles = useMemo(
  () => Platform.OS === 'web' ? getGlassStyles({ blur: 'md' }) : {},
  []
);

// ❌ Don't recalculate on every render
const glassStyles = Platform.OS === 'web' ? getGlassStyles({ blur: 'md' }) : {};
```

## Troubleshooting

### Glass effect not visible
1. Check platform: Only works on web
2. Verify backdrop-filter support in browser
3. Check if background is too opaque
4. Ensure element has content behind it

### Performance issues
1. Reduce number of nested glass layers
2. Lower blur intensity
3. Use `isolation: isolate` on glass containers
4. Check for too many animated elements

### Focus states not visible
1. Use `getGlassFocusStyles()` with appropriate glow color
2. Ensure sufficient contrast
3. Test with keyboard navigation

## Examples from Codebase

### Button Component
[packages/components/src/primitives/Button/index.tsx](../../packages/components/src/primitives/Button/index.tsx#L107)

### Input Component  
[packages/components/src/forms/Input/sharedStyles.tsx](../../packages/components/src/forms/Input/sharedStyles.tsx#L48)

### Page Container
[packages/components/src/layouts/Page/BasicPage.tsx](../../packages/components/src/layouts/Page/BasicPage.tsx#L44)

### Header Navigation
[packages/components/src/layouts/Navigation/Header/HeaderView.tsx](../../packages/components/src/layouts/Navigation/Header/HeaderView.tsx#L185)
