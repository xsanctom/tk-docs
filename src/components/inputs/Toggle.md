# Toggle Component

## Overview
A toggle switch component for boolean on/off states. Displays as a sliding switch with optional label and description. The toggle switches between inactive (grey) and active (purple) states with a smooth animation.

## Layout Behavior

### Container (label element)
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width hugs contents, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 12px between toggle switch and info (label/description)

### Toggle Switch
- **Constraints**: Fixed size (44px × 24px)
- **Flex**: `flex: 0 0 auto` (no grow/shrink)
- **Background**: `var(--toggle-inactive)` when off, `var(--brand-primary)` when on
- **Border-radius**: 24px (fully rounded)

### Slider Button
- **Size**: 18px × 18px (circular)
- **Position**: Left edge (3px from left, 3px from bottom) when off
- **Transform**: Translates 20px to the right when checked
- **Background**: `var(--surface)` (white)
- **Transition**: 0.2s ease for smooth animation

### Toggle Info (Label/Description)
- **Type**: Auto-layout (Vertical)
- **Constraints**: Width fills container (flex: 1), Height hugs contents
- **Gap**: 4px between label and description

### Label
- **Font**: 14px, IBM Plex Sans, font-weight: 500
- **Color**: `var(--text)`
- **Text Handling**: Normal white-space, no truncation

### Description (optional)
- **Font**: 12px, IBM Plex Sans, font-weight: 400
- **Color**: `var(--text-subtle)`
- **Line-height**: 1.4
- **Text Handling**: Normal white-space, wraps properly

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | - | Whether toggle is checked (controlled mode) |
| `defaultChecked` | `boolean` | - | Initial checked state (uncontrolled mode) |
| `onChange` | `Function` | - | Change handler: `(checked: boolean, event: Event) => void` |
| `disabled` | `boolean` | `false` | Whether the toggle is disabled |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant: 'sm' (38x20), 'md' (50x26), 'lg' (68x38) |
| `label` | `string` | - | Optional label text |
| `description` | `string` | - | Optional description text |
| `children` | `React.ReactNode` | - | Custom content (alternative to label/description) |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | auto-generated | Unique ID for toggle input |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## States

### Normal State (Off)
- Background: `var(--toggle-inactive)` (grey)
- Slider: Left position (3px from left)
- Label: Standard text color

### Active State (On)
- Background: `var(--brand-primary)` (purple)
- Slider: Right position (translates 20px)
- Visual feedback: Smooth transition animation

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
- Label/Description color: `var(--text-disabled)`

### Hover State
- Not explicitly styled (relies on cursor pointer)
- Can be enhanced with subtle background change

### Focus State
- Outline: 2px solid `var(--focus)`
- Outline offset: 2px
- Ensures keyboard accessibility

## Size Variants

### Small (sm)
- **Dimensions**: 38px × 20px
- **Slider Button**: 14px diameter
- **Translation**: 18px when checked
- Best for compact interfaces or dense layouts

### Medium (md) - Default
- **Dimensions**: 50px × 26px
- **Slider Button**: 20px diameter
- **Translation**: 24px when checked
- Standard size for most use cases

### Large (lg)
- **Dimensions**: 68px × 38px
- **Slider Button**: 28px diameter
- **Translation**: 30px when checked
- Best for mobile interfaces or when larger touch targets are needed

## Usage Examples

### Toggle with Different Sizes
```jsx
<Toggle size="sm" checked={enabled} onChange={(checked) => setEnabled(checked)} label="Small toggle" />
<Toggle size="md" checked={enabled} onChange={(checked) => setEnabled(checked)} label="Medium toggle" />
<Toggle size="lg" checked={enabled} onChange={(checked) => setEnabled(checked)} label="Large toggle" />
```

### Basic Toggle
```jsx
const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
/>
```

### Toggle with Label
```jsx
<Toggle
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
  label="Enable notifications"
/>
```

### Toggle with Label and Description
```jsx
<Toggle
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
  label="Enable notifications"
  description="Receive email notifications for important updates"
/>
```

### Uncontrolled Toggle
```jsx
<Toggle
  defaultChecked={true}
  onChange={(checked) => console.log(checked)}
  label="Remember me"
/>
```

### Disabled Toggle
```jsx
<Toggle
  checked={true}
  disabled
  label="Premium feature"
  description="Upgrade to enable this feature"
/>
```

### Custom Content
```jsx
<Toggle
  checked={enabled}
  onChange={(checked) => setEnabled(checked)}
>
  <span className="custom-label">
    Custom <strong>label</strong> content
  </span>
</Toggle>
```

## CSS Implementation

```css
.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
}

.toggle-slider {
  background-color: var(--toggle-inactive);
  border-radius: 24px;
  transition: all 0.2s ease;
}

.toggle-input:checked + .toggle-slider {
  background-color: var(--brand-primary);
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(20px);
}
```

## Edge Cases Tested

- ✅ Controlled mode (checked prop)
- ✅ Uncontrolled mode (defaultChecked prop)
- ✅ Disabled state prevents interaction
- ✅ Label text wraps properly on long content
- ✅ Description text wraps properly
- ✅ No label/description (toggle only)
- ✅ Label only (no description)
- ✅ Custom content (children)
- ✅ Focus states visible for accessibility
- ✅ Keyboard navigation works correctly
- ✅ Form submission (name/value attributes)
- ✅ Smooth animation transition

## Accessibility

- **Label Association**: Properly associated with input via `htmlFor`/`id`
- **Keyboard Navigation**: Supports Tab and Space/Enter keys
- **Screen Readers**: Uses `aria-label` when no visible label
- **Focus States**: Visible focus indicator for keyboard users
- **Disabled State**: Properly announced to screen readers
- **Role**: Uses native checkbox input for proper semantics

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Toggle supports three sizes: Small (38x20), Medium (50x26), Large (68x38)
- Default size is Medium (md)
- Slider button sizes: Small (14px), Medium (20px), Large (28px)
- Padding: Small (3px), Medium (3px), Large (5px)
- Label and description are optional
- Supports both controlled and uncontrolled modes
- Disabled state uses opacity 0.6 and prevents all interaction
- Focus state uses `--focus` color from design tokens
- Smooth 0.2s transition for all state changes
- Slider button size and translation distance scale proportionally with toggle size

