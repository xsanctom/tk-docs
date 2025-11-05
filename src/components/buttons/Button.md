# Button Component

## Overview
A flexible button component with support for variants, sizes, icons, and proper text truncation following precise layout specifications.

## Layout Behavior

### Container
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width hugs contents, Height fixed (40px min for md, 32px for sm, 48px for lg)
- **Overflow**: Visible
- **Padding**: 12px 16px (md), 8px 12px (sm), 16px 24px (lg)
- **Gap**: 8px between icon and text

### Icon Left (if present)
- **Constraints**: Left-aligned, Center-vertical
- **Flex**: `flex: 0 0 auto` (no grow/shrink)
- **Size**: 16px × 16px (md), 14px × 14px (sm), 18px × 18px (lg)
- **Overflow**: Hidden

### Text Label
- **Constraints**: Left-aligned, Center-vertical
- **Flex**: `flex: 1 1 0` (grows, shrinks)
- **Truncation**: Ellipsis on overflow
- **White-space**: Nowrap
- **Overflow**: Hidden
- **Min-width**: 0 (critical for truncation in flex)

### Icon Right (if present)
- **Constraints**: Right-aligned, Center-vertical
- **Flex**: `flex: 0 0 auto` (no grow/shrink)
- **Size**: 16px × 16px (md), 14px × 14px (sm), 18px × 18px (lg)
- **Overflow**: Hidden

## Variants

### Primary
- Background: `var(--brand-primary)`
- Text: `var(--brand-primary-text)`
- Border: `var(--brand-primary)`
- Hover: `var(--brand-primary-hover)`

### Secondary Brand
- Background: `var(--brand-secondary)`
- Text: `var(--text)`
- Border: `var(--brand-secondary)`
- Hover: `var(--brand-secondary-hover)`

### Secondary (Default)
- Background: `var(--surface)`
- Text: `var(--text)`
- Border: `var(--border)`
- Hover: `var(--surface-hover)`

### Tertiary
- Background: `transparent`
- Text: `var(--text)`
- Border: `var(--border)`
- Hover: `var(--surface-hover)`

### Ghost
- Background: `transparent`
- Text: `var(--text)`
- Border: `var(--border-transparent)`
- Hover: `var(--surface-hover)`

### Bare
- Background: `transparent`
- Text: `var(--text)`
- Border: `none`
- Hover: `var(--surface-hover)`

### Bare Primary
- Background: `transparent`
- Text: `var(--link)`
- Border: `none`
- Hover: `var(--surface-hover)` background, `var(--link-hover)` text

### Danger
- Background: `var(--danger-surface)`
- Text: `var(--danger-text)`
- Border: `var(--danger-border)`
- Hover: `var(--danger-surface-hover)`

### Danger Secondary
- Background: `var(--surface)`
- Text: `var(--danger-text)` or `var(--danger)`
- Border: `var(--border)`
- Hover: `var(--surface-hover)`

## Sizes

### Mini (mini)
- Padding: 6px 10px
- Height: 32px
- Font size: 13px
- Icon size: 12px × 12px

### Small (sm)
- Padding: 8px 12px
- Height: 36px
- Font size: 14px
- Icon size: 14px × 14px

### Medium (md) - Default
- Padding: 12px 16px
- Height: 40px
- Font size: 14px
- Icon size: 16px × 16px

### Large (lg)
- Padding: 16px 24px
- Height: 48px
- Font size: 16px
- Icon size: 18px × 18px

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Button text content |
| `variant` | `'primary' \| 'secondary-brand' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'bare' \| 'bare-primary' \| 'danger' \| 'danger-secondary'` | `'secondary'` | Button variant |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `iconLeft` | `React.ReactNode` | - | Icon to display on left |
| `iconRight` | `React.ReactNode` | - | Icon to display on right |
| `onClick` | `Function` | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `className` | `string` | `''` | Additional CSS classes |

## States

### Normal State
- Default appearance based on variant

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
- Variant-specific disabled colors:
  - Primary: `var(--brand-primary-disabled)`
  - Secondary Brand: `var(--brand-secondary)` with `var(--text-disabled)`
  - Secondary: `var(--surface-disabled)`, `var(--text-disabled)`
  - Tertiary: Transparent with `var(--text-disabled)`
  - Ghost: Transparent with `var(--text-disabled)`
  - Bare: Transparent with `var(--text-disabled)`
  - Bare Primary: Transparent with `var(--link-disabled)`
  - Danger: `var(--danger-surface)` with `var(--danger-text)`
  - Danger Secondary: `var(--surface-disabled)` with `var(--text-disabled)`

### Hover State
- Only applies when not disabled
- Variant-specific hover colors (see Variants section above)

### Active State (Click)
- Slight transform: `translateY(1px)`
- Only applies when not disabled

## CSS Implementation

```css
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  min-height: 40px;
  width: fit-content;
}

.button-text {
  flex: 1 1 0;
  min-width: 0; /* Critical for truncation */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button-icon-left,
.button-icon-right {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
}
```

## Edge Cases Tested

- ✅ Long text truncates with ellipsis
- ✅ Icon stays fixed width when text grows
- ✅ Button width hugs content (doesn't stretch)
- ✅ Maintains min-height with single line
- ✅ Icon-only buttons render correctly
- ✅ Works with both left and right icons
- ✅ Works with both icons simultaneously
- ✅ Disabled state prevents interaction
- ✅ All variant combinations with disabled work correctly
- ✅ Focus states visible for accessibility
- ✅ Responsive at different container sizes

## Usage Examples

### Basic Button
```jsx
<Button onClick={handleClick}>Click me</Button>
```

### Primary Button with Icon
```jsx
<Button variant="primary" iconLeft={<Icon />}>
  Save
</Button>
```

### Small Button
```jsx
<Button size="sm" variant="tertiary">
  Cancel
</Button>
```

### Icon Only Button
```jsx
<Button iconLeft={<Icon />} aria-label="Close" />
```

## Accessibility

- Supports keyboard navigation (Enter/Space)
- Focus states visible with `--focus` color
- Disabled state prevents interaction
- ARIA labels supported via `aria-label` prop
- Icon elements marked with `aria-hidden="true"`

## Notes

- All colors use CSS custom properties (no hardcoded values)
- Text truncation requires `min-width: 0` on flex children
- Icon-only buttons automatically adjust padding and size
- Button respects container constraints (hugs contents)

