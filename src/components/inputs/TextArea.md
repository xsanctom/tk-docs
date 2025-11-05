# TextArea Component

## Overview
A multi-line text input component with size variants, optional rows configuration, and resize support. Supports controlled and uncontrolled modes, and includes proper focus, disabled, and validation states.

## Layout Behavior

### Container
- **Type**: Auto-layout (Vertical)
- **Constraints**: Width fills container, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 4px (for error messages/helper text when used in form patterns)

### TextArea Element
- **Constraints**: Width fills container, Height hugs contents (min-height varies by size)
- **Border-radius**: 4px
- **Padding**: Varies by size
- **Background**: `var(--field)`
- **Resize**: Vertical (by default)
- **Text wrapping**: Pre-wrap with break-word

## Size Variants

### Mini (mini)
- **Min-height**: 32px
- **Padding**: 6px 12px
- **Font-size**: 14px
- **Line-height**: 1.5

### Small (sm)
- **Min-height**: 36px
- **Padding**: 7px 12px
- **Font-size**: 14px
- **Line-height**: 1.5

### Medium (md) - Default
- **Min-height**: 40px
- **Padding**: 8px 12px
- **Font-size**: 14px
- **Line-height**: 1.5

### Large (lg)
- **Min-height**: 48px
- **Padding**: 10px 12px
- **Font-size**: 14px
- **Line-height**: 1.5

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Textarea value (controlled mode) |
| `defaultValue` | `string` | - | Default textarea value (uncontrolled mode) |
| `onChange` | `Function` | - | Change handler: `(value: string, event: Event) => void` |
| `onFocus` | `Function` | - | Focus handler |
| `onBlur` | `Function` | - | Blur handler |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `readOnly` | `boolean` | `false` | Whether the textarea is read-only |
| `placeholder` | `string` | - | Placeholder text |
| `rows` | `number` | `3` | Number of visible text rows |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `resize` | `boolean` | `true` | Whether the textarea can be resized (vertical only) |
| `autoExpand` | `boolean` | `false` | Whether the textarea should automatically expand based on content |
| `minRows` | `number` | `2` | Minimum number of rows when autoExpand is enabled |
| `maxRows` | `number` | `null` | Maximum number of rows when autoExpand is enabled (no limit if null) |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | auto-generated | Unique ID for textarea |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## States

### Normal State
- Background: `var(--field)`
- Border: `var(--border)`
- Color: `var(--text)`
- Placeholder: `var(--text-placeholder)`
- Resize: Vertical (if enabled)

### Hover State
- Border: `var(--border-active)`
- Only applies when not disabled and not read-only

### Focus State
- Border: `var(--border-active)`
- Box-shadow: `0 0 0 2px var(--focus)`
- Ensures keyboard accessibility

### Disabled State
- Background: `var(--surface-disabled)`
- Border: `var(--border)`
- Color: `var(--text-disabled)`
- Opacity: 0.6
- Cursor: not-allowed
- Resize: Disabled (none)

### Read-only State
- Background: `var(--surface-low)`
- Cursor: default
- Text can be selected but not edited
- Resize: Disabled (none)

### Invalid/Error State
- Border: `var(--danger-border)`
- Focus shadow: `var(--danger-surface)`

## Usage Examples

### Basic TextArea
```jsx
<TextArea placeholder="Enter your message..." />
<TextArea defaultValue="Default text" />
```

### Controlled TextArea
```jsx
const [value, setValue] = useState('');
<TextArea value={value} onChange={(val) => setValue(val)} />
```

### Different Sizes
```jsx
<TextArea size="mini" rows={2} />
<TextArea size="sm" rows={3} />
<TextArea size="md" rows={4} />
<TextArea size="lg" rows={5} />
```

### Disabled and Read-only
```jsx
<TextArea disabled value="Cannot edit this" />
<TextArea readOnly value="Can select but not edit" />
```

### Without Resize
```jsx
<TextArea resize={false} rows={4} />
```

### With Custom Rows
```jsx
<TextArea rows={6} placeholder="Enter a longer message..." />
```

### Auto-Expand (Dynamic Height)
```jsx
{/* Basic auto-expand: starts at 2 lines, expands as needed */}
<TextArea 
  autoExpand 
  placeholder="Start typing, it will expand..."
/>

{/* Auto-expand with maximum limit (5 rows) */}
<TextArea 
  autoExpand 
  minRows={2}
  maxRows={5}
  placeholder="Expands up to 5 rows..."
/>

{/* Auto-expand with custom minimum */}
<TextArea 
  autoExpand 
  minRows={3}
  placeholder="Starts at 3 rows..."
/>
```

## Auto-Expand Behavior

When `autoExpand={true}`, the textarea automatically adjusts its height based on content:

- **Minimum Height**: Enforced by `minRows` (default: 2)
- **Dynamic Growth**: Expands as content requires more lines
- **Maximum Height**: Optional limit via `maxRows` (when reached, shows scrollbar)
- **Resize Handle**: Disabled when auto-expand is enabled
- **Shrinking**: Automatically shrinks when content is deleted
- **Height Calculation**: Based on `scrollHeight`, accounting for padding, borders, and line-height

### When to Use Auto-Expand

- **Comments/Feedback**: Messages that start small but may grow
- **Chat Inputs**: Where space is limited but content varies
- **Quick Notes**: Where users shouldn't need to manually resize
- **Form Fields**: When you want dynamic height without manual resize

```css
.text-area {
  width: 100%;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--field);
  color: var(--text);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
```

## Accessibility

- Uses semantic `<textarea>` element
- Supports `aria-label` for accessible labeling
- Focus states clearly visible for keyboard navigation
- Disabled state prevents interaction
- Read-only state allows text selection but not editing

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Supports four size variants: mini (32px min), sm (36px min), md (40px min), lg (48px min)
- Default size is Medium (md)
- Default rows is 3
- Resize is vertical by default, can be disabled with `resize={false}`
- Auto-expand functionality available via `autoExpand` prop (starts at 2 rows by default)
- Text wraps naturally with `pre-wrap` and `break-word`
- Min-height ensures minimum usable size, but textarea grows with content
- Height includes padding and border (box-sizing: border-box)
- Perfect for multi-line text input in forms, comments, descriptions, etc.
