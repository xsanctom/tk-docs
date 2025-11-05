# Checkbox Component

## Overview
A reusable checkbox component with label support, proper accessibility, and state management. Supports both controlled and uncontrolled modes.

## Layout Behavior

### Container (label element)
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width hugs contents, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 8px between checkbox and label
- **Alignment**: Center-aligned vertically

### Checkbox Input
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
| `checked` | `boolean` | - | Whether checkbox is checked (controlled mode) |
| `defaultChecked` | `boolean` | - | Whether checkbox is checked by default (uncontrolled mode) |
| `onChange` | `Function` | - | Change handler: `(checked: boolean, event: Event) => void` |
| `disabled` | `boolean` | `false` | Whether checkbox is disabled |
| `label` | `string` | - | Label text to display |
| `children` | `React.ReactNode` | - | Alternative to label - custom label content |
| `id` | `string` | auto-generated | Unique ID for checkbox input |
| `name` | `string` | - | Name attribute for form submission |
| `value` | `string` | - | Value attribute for form submission |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## States

### Normal State
- Checkbox: 16px × 16px, accent color (purple when checked)
- Label: Standard text color

### Checked State
- Checkbox: Checked with purple accent color (`var(--brand-primary)`)
- Visual indicator: Native browser checkbox styling with purple accent

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
- Label color: `var(--text-disabled)`

### Hover State
- Checkbox opacity: 0.8 (subtle hover effect)
- Only applies when not disabled

### Focus State
- Outline: 2px solid `var(--focus)`
- Outline offset: 2px
- Ensures keyboard accessibility

## Usage Examples

### Basic Checkbox
```jsx
<Checkbox 
  label="Accept terms and conditions"
  onChange={(checked) => console.log(checked)}
/>
```

### Controlled Checkbox
```jsx
const [agreed, setAgreed] = useState(false);

<Checkbox 
  label="I agree"
  checked={agreed}
  onChange={(checked) => setAgreed(checked)}
/>
```

### Uncontrolled Checkbox
```jsx
<Checkbox 
  label="Subscribe to newsletter"
  defaultChecked={true}
  onChange={(checked) => console.log(checked)}
/>
```

### Disabled Checkbox
```jsx
<Checkbox 
  label="This option is disabled"
  disabled
/>
```

### Checkbox with Custom Label Content
```jsx
<Checkbox onChange={(checked) => console.log(checked)}>
  <span>Custom <strong>label</strong> content</span>
</Checkbox>
```

### Checkbox without Visible Label
```jsx
<Checkbox 
  aria-label="Select all items"
  onChange={(checked) => handleSelectAll(checked)}
/>
```

## CSS Implementation

```css
.checkbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: var(--brand-primary);
}

.checkbox-label {
  font-size: 14px;
  color: var(--text);
}
```

## Edge Cases Tested

- ✅ Controlled mode (checked prop)
- ✅ Uncontrolled mode (defaultChecked prop)
- ✅ Disabled state prevents interaction
- ✅ Label text wraps properly on long content
- ✅ No label (aria-label only)
- ✅ Custom label content (children)
- ✅ Focus states visible for accessibility
- ✅ Keyboard navigation works correctly
- ✅ Form submission (name/value attributes)
- ✅ Multiple checkboxes in a group

## Accessibility

- **Label Association**: Properly associated with input via `htmlFor`/`id`
- **Keyboard Navigation**: Supports Tab and Space key
- **Screen Readers**: Uses `aria-label` when no visible label
- **Focus States**: Visible focus indicator for keyboard users
- **Disabled State**: Properly announced to screen readers

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Checkbox size is fixed at 16px (standard size, no size variants)
- Label can be provided via `label` prop or `children`
- Supports both controlled and uncontrolled modes
- Disabled state uses opacity 0.6 and prevents all interaction
- Focus state uses `--focus` color from design tokens

