# MultiSelect Component

## Overview
A multi-select dropdown component with size variants, optional search functionality, checkbox selection, and Select All/Clear All actions. Supports controlled and uncontrolled modes, and includes proper focus, disabled, and selection states.

## Layout Behavior

### Container
- **Type**: Auto-layout (Vertical)
- **Constraints**: Width fills container, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 4px (for error messages/helper text when used in form patterns)

### Button Element
- **Constraints**: Width fills container, Height fixed (varies by size)
- **Border-radius**: 4px
- **Padding**: Varies by size (includes space for chevron icon)
- **Background**: `var(--field)`
- **Text truncation**: Ellipsis for long option labels
- **Button text**: Shows placeholder, single selection label, or "{count} selected"

### Dropdown Menu
- **Position**: Absolute, positioned below button (or above if insufficient space)
- **Max-height**: 260px (adjusted when searchable or actions present)
- **Overflow**: Auto scroll for long option lists
- **Z-index**: 1000

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
| `options` | `Array<{value: any, label: string, disabled?: boolean}>` | `[]` | Array of option objects |
| `value` | `Array<any>` | - | Selected values array (controlled mode) |
| `defaultValue` | `Array<any>` | `[]` | Default selected values array (uncontrolled mode) |
| `onChange` | `Function` | - | Change handler: `(values: Array<any>) => void` |
| `placeholder` | `string` | `'Select options...'` | Placeholder text when no options are selected |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `searchable` | `boolean` | `false` | Whether options can be filtered by search |
| `showSelectAll` | `boolean` | `true` | Whether to show Select All/Clear All actions |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | auto-generated | Unique ID for select |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## States

### Normal State
- Background: `var(--field)`
- Border: `var(--border)`
- Color: `var(--text)`
- Placeholder: `var(--text-placeholder)`
- Chevron icon: `var(--text-subtle)`

### Hover State
- Border: `var(--border-active)`
- Only applies when not disabled

### Focus/Open State
- Border: `var(--border-active)`
- Box-shadow: `0 0 0 2px var(--focus)`
- Chevron icon rotates 180 degrees
- Ensures keyboard accessibility

### Disabled State
- Background: `var(--surface-disabled)`
- Border: `var(--border)`
- Color: `var(--text-disabled)`
- Opacity: 0.6
- Cursor: not-allowed

### Selected Option State
- Checkbox: Checked with brand primary accent color
- Option label: Normal text color

### Option Hover State
- Background: `var(--surface-hover)`

### Action Buttons (Select All/Clear All)
- Color: `var(--link)`
- Hover: `var(--link-hover)` with `var(--surface-hover)` background

## Button Text Behavior

- **No selection**: Shows placeholder text
- **Single selection**: Shows the selected option label
- **Multiple selections**: Shows "{count} selected" (e.g., "3 selected")

## Usage Examples

### Basic MultiSelect
```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

<MultiSelect options={options} placeholder="Choose options..." />
```

### Controlled MultiSelect
```jsx
const [values, setValues] = useState([]);
<MultiSelect 
  options={options} 
  value={values} 
  onChange={(vals) => setValues(vals)} 
/>
```

### Uncontrolled MultiSelect
```jsx
<MultiSelect 
  options={options} 
  defaultValue={['option1', 'option2']}
  onChange={(vals) => console.log('Selected:', vals)}
/>
```

### Different Sizes
```jsx
<MultiSelect size="mini" options={options} />
<MultiSelect size="sm" options={options} />
<MultiSelect size="md" options={options} />
<MultiSelect size="lg" options={options} />
```

### Searchable MultiSelect
```jsx
<MultiSelect 
  options={options} 
  searchable 
  placeholder="Search and select..."
/>
```

### Without Select All Actions
```jsx
<MultiSelect 
  options={options} 
  showSelectAll={false}
/>
```

### With Disabled Options
```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' }
];

<MultiSelect options={options} />
```

### Disabled MultiSelect
```jsx
<MultiSelect 
  options={options} 
  disabled 
  defaultValue={['option1']}
/>
```

## CSS Implementation

```css
.multi-select-button {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--field);
  color: var(--text);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.multi-select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 260px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.multi-select-checkbox {
  accent-color: var(--brand-primary);
}
```

## Accessibility

- Uses semantic button element for trigger
- Supports `aria-label` for accessible labeling
- Implements `aria-expanded` and `aria-haspopup` attributes
- Uses `aria-multiselectable="true"` to indicate multi-select capability
- Focus states clearly visible for keyboard navigation
- Disabled state prevents interaction
- Selected options indicated with checked checkboxes
- Dropdown menu uses `role="listbox"` with `aria-multiselectable="true"`
- Options use native checkbox inputs for better accessibility

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Supports four size variants: mini (32px), sm (36px), md (40px), lg (48px)
- Default size is Medium (md)
- Dropdown automatically positions above if insufficient space below
- Search functionality filters options in real-time
- Select All selects all available (non-disabled) options in filtered list
- Clear All clears only options from filtered list (preserves selections outside filter)
- Button text shows count when multiple items selected
- Selected options indicated with checked checkboxes
- Supports both controlled and uncontrolled modes
- Hidden input field includes selected values as JSON string for form submission
- Option labels truncate with ellipsis if too long
- Dropdown closes on outside click
- Perfect for multi-choice selections in forms, filters, tags, etc.

## Edge Cases

- **Very long option labels**: Truncated with ellipsis
- **Many options**: Dropdown scrolls (max-height: 260px)
- **No options**: Shows "No options found" message
- **Search with no results**: Shows "No options found" message
- **Disabled options**: Displayed but not selectable
- **Insufficient space below**: Dropdown opens above button
- **Form submission**: Hidden input includes selected values as JSON string
- **Select All with filters**: Only selects visible filtered options
- **Clear All with filters**: Only clears visible filtered options
- **Rapid clicking**: Checkbox toggle works smoothly
- **All options selected**: Select All button still works (no-op if all already selected)

## Differences from Select Component

- **Value type**: Array instead of single value
- **Selection method**: Checkboxes instead of buttons
- **Actions**: Includes Select All/Clear All buttons
- **Button text**: Shows count when multiple selected
- **onChange signature**: Receives array of values instead of single value
- **Hidden input**: Stores JSON string of array instead of single value

