# TextInput Component

## Overview
A text input component with size variants, optional prefix/suffix text, and icon support. Supports controlled and uncontrolled modes, and includes proper focus, disabled, and validation states.

## Layout Behavior

### Container
- **Type**: Auto-layout (Vertical)
- **Constraints**: Width fills container, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 4px (for error messages/helper text when used in form patterns)

### Input Element
- **Constraints**: Width fills container, Height fixed (varies by size)
- **Border-radius**: 4px
- **Padding**: Varies by size
- **Background**: `var(--field)`

## Size Variants

### Mini (mini)
- **Height**: 32px
- **Padding**: 6px 12px
- **Font-size**: 14px

### Small (sm)
- **Height**: 36px
- **Padding**: 7px 12px
- **Font-size**: 14px

### Medium (md) - Default
- **Height**: 40px
- **Padding**: 8px 12px
- **Font-size**: 14px

### Large (lg)
- **Height**: 48px
- **Padding**: 10px 12px
- **Font-size**: 14px

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Input value (controlled mode) |
| `defaultValue` | `string` | - | Default input value (uncontrolled mode) |
| `onChange` | `Function` | - | Change handler: `(value: string, event: Event) => void` |
| `onFocus` | `Function` | - | Focus handler |
| `onBlur` | `Function` | - | Blur handler |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `placeholder` | `string` | - | Placeholder text |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `prefix` | `string` | - | Prefix text to display before input |
| `suffix` | `string` | - | Suffix text to display after input |
| `iconLeft` | `React.ReactNode` | - | Icon to display on the left |
| `iconRight` | `React.ReactNode` | - | Icon to display on the right |
| `type` | `string` | `'text'` | Input type: 'text', 'email', 'url', 'search', etc. |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | auto-generated | Unique ID for input |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## States

### Normal State
- Background: `var(--field)`
- Border: `var(--border)`
- Color: `var(--text)`
- Placeholder: `var(--text-placeholder)`

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

### Read-only State
- Background: `var(--surface-low)`
- Cursor: default
- Text can be selected but not edited

### Invalid/Error State
- Border: `var(--danger-border)`
- Focus shadow: `var(--danger-surface)`

## Usage Examples

### Basic TextInput
```jsx
const [value, setValue] = useState('');

<TextInput
  value={value}
  onChange={(newValue) => setValue(newValue)}
  placeholder="Enter text..."
/>
```

### Different Sizes
```jsx
<TextInput size="mini" placeholder="Mini input" />
<TextInput size="sm" placeholder="Small input" />
<TextInput size="md" placeholder="Medium input" />
<TextInput size="lg" placeholder="Large input" />
```

### With Prefix/Suffix
```jsx
<TextInput
  prefix="$"
  placeholder="0.00"
  type="number"
/>
<TextInput
  suffix="kg"
  placeholder="Weight"
/>
```

### With Icons
```jsx
<TextInput
  iconLeft={<SearchIcon />}
  placeholder="Search..."
  type="search"
/>
<TextInput
  iconRight={<ClearIcon />}
  placeholder="With clear button"
/>
```

### Controlled vs Uncontrolled
```jsx
// Controlled
<TextInput value={value} onChange={(v) => setValue(v)} />

// Uncontrolled
<TextInput defaultValue="Initial value" onChange={(v) => console.log(v)} />
```

### Disabled and Read-only
```jsx
<TextInput value="Disabled" disabled />
<TextInput value="Read-only" readOnly />
```

## CSS Implementation

```css
.text-input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--field);
  color: var(--text);
}

.text-input:focus {
  border-color: var(--border-active);
  box-shadow: 0 0 0 2px var(--focus);
}
```

## Edge Cases Tested

- ✅ Controlled mode (value prop)
- ✅ Uncontrolled mode (defaultValue prop)
- ✅ Disabled state prevents interaction
- ✅ Read-only state allows selection but not editing
- ✅ All size variants render correctly
- ✅ Prefix and suffix text display properly
- ✅ Left and right icons display correctly
- ✅ Placeholder text shows correctly
- ✅ Focus states visible for accessibility
- ✅ Invalid/error states display correctly
- ✅ Form submission (name/value attributes)

## Accessibility

- **Label Association**: Should be used with visible labels or `aria-label`
- **Keyboard Navigation**: Supports Tab and standard input navigation
- **Screen Readers**: Uses `aria-label` when no visible label
- **Focus States**: Visible focus indicator for keyboard users
- **Disabled State**: Properly announced to screen readers
- **Read-only State**: Properly announced to screen readers
- **Invalid State**: Should be used with `aria-invalid` for proper announcement

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Supports four size variants: mini (32px), sm (36px), md (40px), lg (48px)
- Default size is Medium (md)
- Prefix/suffix text and icons are positioned absolutely within the input
- Input padding adjusts automatically when prefix/suffix/icons are present
- Supports standard HTML input types (text, email, url, search, etc.)
- Focus state uses `--focus` color from design tokens
- Invalid state uses `--danger-border` and `--danger-surface` colors

