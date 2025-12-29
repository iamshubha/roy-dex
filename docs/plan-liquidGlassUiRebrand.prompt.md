## Plan: Liquid Glass UI Rebrand — Web Visual Transformation

Transform OneKey's web UI to Liquid Glass aesthetic (frosted glass, backdrop blur, glowing accents, translucent layers) while preserving 100% of functionality. This is a **purely visual rebrand** — no logic, behavior, routing, or API changes.

### Steps

1. **Extend Tamagui theme layer** with Liquid Glass tokens in [tamagui.config.ts](packages/components/tamagui.config.ts): add frosted glass colors (rgba values), blur utilities, glow shadows, and CSS custom properties for `backdrop-filter` support detection. Preserve all existing tokens.

2. **Re-skin 40+ primitive components** ([Button](packages/components/src/primitives/Button/index.tsx), [Card](packages/components/src/content/Card/index.tsx), [Modal](packages/components/src/actions/Dialog/index.tsx), [Input](packages/components/src/forms/Input/index.tsx), etc.) by wrapping with glass styles: `backdrop-blur-xl`, `bg-opacity-10`, soft borders, glow shadows on hover/focus. Keep all props, events, DOM structure, and exports unchanged.

3. **Apply glass styling to layout components** ([Page](packages/components/src/layouts/Page/index.tsx), [Navigation](packages/components/src/layouts/Navigation/index.tsx), [Header](packages/kit/src/views/Home/components/Header.tsx)) with translucent panels, floating depth, and subtle gradients. Preserve routing logic and hierarchy.

4. **Add optional Framer Motion micro-interactions** for hover glow, focus rings, and press depth (spring-based). Wrap animations in web-only conditionals (`Platform.OS === 'web'`). Respect `prefers-reduced-motion`.

5. **Implement backdrop-filter fallback** in [global.css](apps/web/global.css) using `@supports` queries — provide solid backgrounds with opacity for browsers without blur support. Add performance hints to prevent GPU overdraw.

### Further Considerations

1. **Moti vs Framer Motion?** Current stack uses Moti (installed) for cross-platform animations. Adding Framer Motion is optional—only if web-specific effects (3D transforms, SVG morphing) are needed. **Recommendation:** Start with Moti, add Framer Motion only if required.

2. **Component testing strategy?** Gallery exists at [packages/components/src/content/Gallery](packages/components/src/content/Gallery) for visual testing. **Recommendation:** Test each reskinned component in gallery before applying to main app.

3. **Scope clarification?** This plan covers **apps/web** and **apps/web-embed**. Mobile/desktop/extension UIs are explicitly excluded. Confirm if web-embed requires identical styling or can be skipped.
