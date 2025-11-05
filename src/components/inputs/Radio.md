# Radio Component

## Overview
A single radio button option. Must be used within a RadioGroup for proper functionality. Radio buttons allow users to select one option from a group.

## Layout Behavior

### Container (label element)
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width hugs contents, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 8px between radio and label
- **Alignment**: Center-aligned vertically

### Radio Input
- **Constraints**: Fixed size (16px × 16px)
- **Flex**: `flex: 0 0 auto` (no grow/shrink)
- **Accent Color**: `var(--brand-primary)` (purple)

### Label Text
- **Constraints**: Width hugs contents, Height hugs contents
- **Flex**: `flex: 0 1 auto` (can shrink, min-width: 0)
- **Font**: 14px, IBM Plex Sans, regular weight
- **Color**: `var(--text)`
- **Text Handling**: Normal white-space, no truncation

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Value of this radio option (required) |
| `checked` | `boolean` | `false` | Whether this radio is checked |
| `onChange` | `Function` | - | Change handler: `(value: string, event: Event) => void` |
| `disabled` | `boolean` | `false` | Whether the radio is disabled |
| `label` | `string` | - | Label text to display |
| `children` | `React.ReactNode` | - | Alternative to label - custom label content |
| `name` | `string` | - | Name attribute (should match RadioGroup name) |
| `id` | `string` | auto-generated | Unique ID for radio input |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## States

### Normal State
- Radio: 16px × 16px, accent color (purple when checked)
- Label: Standard text color

### Checked State
- Radio: Checked with purple accent color (`var(--brand-primary)`)
- Visual indicator: Native browser radio styling with purple accent

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
- Label color: `var(--text-disabled)`

### Hover State
- Radio opacity: 0.8 (subtle hover effect)
- Only applies when not disabled

### Focus State
- Outline: 2px solid `var(--focus)`
- Outline offset: 2px
- Ensures keyboard accessibility

## Usage Examples

### Basic Radio (used in RadioGroup)
```jsx
<RadioGroup
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
/>
```

### Custom Radio Children
```jsx
<RadioGroup
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  name="custom-group"
>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>
```

## CSS Implementation

```css
.radio {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-input {
  width: 16px;
  height: 16px;
  accent-color: var(--brand-primary);
}

.radio-label {
  font-size: 14px;
  color: var(--text);
}
```

## Edge Cases Tested

- ✅ Used within RadioGroup
- ✅ Controlled mode (checked prop)
- ✅ Disabled state prevents interaction
- ✅ Label text wraps properly on long content
- ✅ No label (aria-label only)
- ✅ Custom label content (children)
- ✅ Focus states visible for accessibility
- ✅ Keyboard navigation works correctly
- ✅ Form submission (name/value attributes)

## Accessibility

- **Label Association**: Properly associated with input via `htmlFor`/`id`
- **Keyboard Navigation**: Supports Tab and Arrow keys (when in RadioGroup)
- **Screen Readers**: Uses `aria-label` when no visible label
- **Focus States**: Visible focus indicator for keyboard users
- **Disabled State**: Properly announced to screen readers
- **RadioGroup**: Uses `role="radiogroup"` for proper ARIA semantics

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Radio size is fixed at 16px (standard size, no size variants)
- Label can be provided via `label` prop or `children`
- Should be used within RadioGroup component for proper selection management
- Disabled state uses opacity 0.6 and prevents all interaction
- Focus state uses `--focus` color from design tokens

