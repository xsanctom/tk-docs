# IconButton Component

## Overview
A square button component designed to display only an icon. Perfect for icon-only actions like close, menu, search, etc.

## Layout Behavior

### Container
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Center-aligned, fixed width/height
- **Width**: 40px (md), 32px (sm), 48px (lg)
- **Height**: 40px (md), 32px (sm), 48px (lg)
- **Padding**: 8px (md), 6px (sm), 12px (lg)
- **Content**: Centered icon

### Icon
- **Constraints**: Center-aligned horizontally and vertically
- **Flex**: `flex: 0 0 auto` (no grow/shrink)
- **Size**: 16px × 16px (md), 14px × 14px (sm), 18px × 18px (lg)
- **Overflow**: Hidden

## Variants

IconButton supports all 9 button variants, matching the Button component styling:

### Primary
- Background: `var(--brand-primary)`
- Icon: `var(--brand-primary-text)`
- Hover: `var(--brand-primary-hover)`

### Secondary Brand
- Background: `var(--brand-secondary)`
- Icon: `var(--text)`
- Hover: `var(--brand-secondary-hover)`

### Secondary
- Background: `var(--surface)`
- Icon: `var(--text)`
- Border: `1px solid var(--border)`
- Hover: `var(--surface-hover)`

### Tertiary
- Background: `transparent`
- Icon: `var(--text)`
- Border: `1px solid var(--border)`
- Hover: `var(--surface-hover)`

### Ghost
- Background: `transparent`
- Icon: `var(--text)`
- Border: `1px solid var(--border-transparent)`
- Hover: `var(--surface-hover)`

### Bare (Default)
- Background: `transparent`
- Icon: `var(--text-subtle)`
- Border: `none`
- Hover: `var(--surface-hover)` background, `var(--text)` icon

### Bare Primary
- Background: `transparent`
- Icon: `var(--link)`
- Border: `none`
- Hover: `var(--surface-hover)` background, `var(--link-hover)` icon

### Danger
- Background: `var(--danger-surface)`
- Icon: `var(--danger-text)`
- Hover: `var(--danger-surface-hover)`

### Danger Secondary
- Background: `var(--surface)`
- Icon: `var(--danger-text)` or `var(--danger)`
- Border: `1px solid var(--border)`
- Hover: `var(--surface-hover)`

## Sizes

### Mini (mini)
- Size: 32px × 32px
- Padding: 6px
- Icon size: 12px × 12px

### Small (sm)
- Size: 36px × 36px
- Padding: 6px
- Icon size: 14px × 14px

### Medium (md) - Default
- Size: 40px × 40px
- Padding: 8px
- Icon size: 16px × 16px

### Large (lg)
- Size: 48px × 48px
- Padding: 12px
- Icon size: 18px × 18px

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Icon element to display (required) |
| `variant` | `'primary' \| 'secondary-brand' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'bare' \| 'bare-primary' \| 'danger' \| 'danger-secondary'` | `'bare'` | Button variant |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `onClick` | `Function` | - | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (highly recommended for icon-only buttons) |

## States

### Normal State
- Default appearance based on variant
- Bare variant (default): Neutral appearance with `var(--text-subtle)` color, transparent background

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
- Color: `var(--text-disabled)`
- Variant-specific disabled colors (matching Button component)

### Hover State
- Variant-specific hover colors (see Variants section above)
- Only applies when not disabled

### Active State (Click)
- Background: `var(--surface-active)`
- Only applies when not disabled

## CSS Implementation

```css
.icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: none;
  border: none;
  border-radius: 4px;
}

.icon-button-icon {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
}
```

## Edge Cases Tested

- ✅ Square aspect ratio maintained at all sizes
- ✅ Icon centered perfectly
- ✅ Hover state works correctly
- ✅ Disabled state applies correct styling and prevents interaction
- ✅ Hover states work correctly for all variants
- ✅ Focus states visible for accessibility
- ✅ Works with various icon sizes/types

## Usage Examples

### Basic IconButton
```jsx
<IconButton 
  icon={<CloseIcon />} 
  aria-label="Close"
  onClick={handleClose}
/>
```

### Small IconButton
```jsx
<IconButton 
  icon={<MenuIcon />} 
  size="sm"
  aria-label="Open menu"
/>
```

### Large IconButton
```jsx
<IconButton 
  icon={<SearchIcon />} 
  size="lg"
  aria-label="Search"
/>
```

### With Variants
```jsx
{/* Primary variant */}
<IconButton 
  icon={<CloseIcon />} 
  variant="primary"
  aria-label="Close"
/>

{/* Danger variant */}
<IconButton 
  icon={<DeleteIcon />} 
  variant="danger"
  aria-label="Delete"
/>

{/* Bare Primary variant */}
<IconButton 
  icon={<LinkIcon />} 
  variant="bare-primary"
  aria-label="Open link"
/>
```

## Accessibility

- **Required**: `aria-label` should be provided for icon-only buttons
- Supports keyboard navigation (Enter/Space)
- Focus states visible with `--focus` color
- Disabled state prevents interaction
- Icon element marked with `aria-hidden="true"`

## Notes

- All colors use CSS custom properties
- IconButton is neutral by default (no background, subtle text color)
- Hover state adds background and brighter text color
- Square aspect ratio ensures consistent sizing

