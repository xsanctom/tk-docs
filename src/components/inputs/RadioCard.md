# RadioCard Component

## Overview
A card-style radio button option. Displays as a clickable card with label and optional description. The entire card is clickable, and the radio input is visually hidden but accessible. Must be used within a RadioCardGroup for proper functionality.

## Layout Behavior

### Container (label element)
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width fills container (flex: 1), Height hugs contents
- **Overflow**: Visible
- **Padding**: 12px on all sides
- **Gap**: 8px between input and content
- **Border**: 1px solid `var(--border)`
- **Border-radius**: 4px

### Radio Input
- **Constraints**: Hidden (opacity: 0, position: absolute, width/height: 0)
- **Accessibility**: Still accessible for screen readers and keyboard navigation

### Content Container
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
| `value` | `string` | - | Value of this radio card option (required) |
| `checked` | `boolean` | `false` | Whether this radio card is checked |
| `onChange` | `Function` | - | Change handler: `(value: string, event: Event) => void` |
| `disabled` | `boolean` | `false` | Whether the radio card is disabled |
| `label` | `string` | - | Label text to display (required if no children) |
| `description` | `string` | - | Optional description text below label |
| `children` | `React.ReactNode` | - | Custom content (alternative to label/description) |
| `name` | `string` | - | Name attribute (should match RadioCardGroup name) |
| `id` | `string` | auto-generated | Unique ID for radio input |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (optional if label provided) |

## States

### Normal State
- Background: `var(--surface)`
- Border: `var(--border)`
- Label: Standard text color

### Hover State
- Background: `var(--surface-raised)`
- Only applies when not disabled and not active

### Active/Checked State
- Background: `var(--purple-surface)`
- Border: `var(--purple-border)`
- Uses purple sentiment styling

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none
- Label/Description color: `var(--text-disabled)`

### Focus State
- Outline: 2px solid `var(--focus)`
- Outline offset: 2px
- Ensures keyboard accessibility

## Usage Examples

### Basic RadioCard (used in RadioCardGroup)
```jsx
<RadioCardGroup
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  options={[
    { value: 'option1', label: 'Option 1', description: 'Description for option 1' },
    { value: 'option2', label: 'Option 2', description: 'Description for option 2' }
  ]}
/>
```

### Custom RadioCard Children
```jsx
<RadioCardGroup
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  name="custom-group"
>
  <RadioCard value="option1" label="Option 1" description="Description 1" />
  <RadioCard value="option2" label="Option 2" description="Description 2" />
</RadioCardGroup>
```

### RadioCard without Description
```jsx
<RadioCardGroup
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
/>
```

## CSS Implementation

```css
.radio-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--surface);
}

.radio-card.active {
  background-color: var(--purple-surface);
  border-color: var(--purple-border);
}
```

## Edge Cases Tested

- ✅ Used within RadioCardGroup
- ✅ Controlled mode (checked prop)
- ✅ Disabled state prevents interaction
- ✅ Label text wraps properly on long content
- ✅ Description text wraps properly
- ✅ No description (label only)
- ✅ Custom content (children)
- ✅ Focus states visible for accessibility
- ✅ Keyboard navigation works correctly
- ✅ Entire card is clickable
- ✅ Form submission (name/value attributes)

## Accessibility

- **Label Association**: Properly associated with input via `htmlFor`/`id`
- **Keyboard Navigation**: Supports Tab and Arrow keys (when in RadioCardGroup)
- **Screen Readers**: Uses `aria-label` or label text
- **Focus States**: Visible focus indicator for keyboard users
- **Disabled State**: Properly announced to screen readers
- **RadioCardGroup**: Uses `role="radiogroup"` for proper ARIA semantics
- **Clickable Area**: Entire card is clickable, improving usability

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Radio input is visually hidden but accessible
- Entire card is clickable (not just the label)
- Active state uses purple sentiment styling
- Cards fill container width evenly (flex: 1)
- Disabled state uses opacity 0.6 and prevents all interaction
- Focus state uses `--focus` color from design tokens

