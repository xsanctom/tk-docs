# Select Component

## Overview
A single-select dropdown component with size variants, optional search functionality, and keyboard navigation support. Supports controlled and uncontrolled modes, and includes proper focus, disabled, and selection states.

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

### Dropdown Menu
- **Position**: Absolute, positioned below button (or above if insufficient space)
- **Max-height**: 260px (or 216px when searchable)
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
| `value` | `any` | - | Selected value (controlled mode) |
| `defaultValue` | `any` | - | Default selected value (uncontrolled mode) |
| `onChange` | `Function` | - | Change handler: `(value: any, option: Object) => void` |
| `placeholder` | `string` | `'Select an option...'` | Placeholder text when no option is selected |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `searchable` | `boolean` | `false` | Whether options can be filtered by search |
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
- Background: `var(--brand-primary)`
- Color: `var(--brand-primary-text)`
- Hover: `var(--brand-primary-hover)`

### Option Hover State
- Background: `var(--surface-hover)`

## Keyboard Navigation

- **Arrow Down**: Select next option
- **Arrow Up**: Select previous option
- **Enter**: Confirm selection
- **Escape**: Close dropdown

## Usage Examples

### Basic Select
```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

<Select options={options} placeholder="Choose an option..." />
```

### Controlled Select
```jsx
const [value, setValue] = useState(null);
<Select 
  options={options} 
  value={value} 
  onChange={(val) => setValue(val)} 
/>
```

### Uncontrolled Select
```jsx
<Select 
  options={options} 
  defaultValue="option1"
  onChange={(val, option) => console.log('Selected:', val, option)}
/>
```

### Different Sizes
```jsx
<Select size="mini" options={options} />
<Select size="sm" options={options} />
<Select size="md" options={options} />
<Select size="lg" options={options} />
```

### Searchable Select
```jsx
<Select 
  options={options} 
  searchable 
  placeholder="Search and select..."
/>
```

### Disabled Select
```jsx
<Select 
  options={options} 
  disabled 
  defaultValue="option1"
/>
```

### Options with Disabled Items
```jsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2', disabled: true },
  { value: 'option3', label: 'Option 3' }
];

<Select options={options} />
```

### With Form Submission
```jsx
<form onSubmit={handleSubmit}>
  <Select 
    name="category"
    options={categoryOptions}
    onChange={(val) => setCategory(val)}
  />
  <button type="submit">Submit</button>
</form>
```

## CSS Implementation

```css
.select-button {
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

.select-dropdown {
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
```

## Accessibility

- Uses semantic button element for trigger
- Supports `aria-label` for accessible labeling
- Implements `aria-expanded` and `aria-haspopup` attributes
- Keyboard navigation support (Arrow keys, Enter, Escape)
- Focus states clearly visible for keyboard navigation
- Disabled state prevents interaction
- Selected option clearly indicated with `aria-selected`
- Dropdown menu uses `role="listbox"` and options use `role="option"`

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Supports four size variants: mini (32px), sm (36px), md (40px), lg (48px)
- Default size is Medium (md)
- Dropdown automatically positions above if insufficient space below
- Search functionality filters options in real-time
- Keyboard navigation wraps around (first/last option)
- Selected option is highlighted with brand primary color
- Supports both controlled and uncontrolled modes
- Hidden input field included for form submission compatibility
- Option labels truncate with ellipsis if too long
- Dropdown closes on outside click or Escape key
- Perfect for single-choice selections in forms, filters, navigation, etc.

## Edge Cases

- **Very long option labels**: Truncated with ellipsis
- **Many options**: Dropdown scrolls (max-height: 260px)
- **No options**: Shows "No options found" message
- **Search with no results**: Shows "No options found" message
- **Disabled options**: Displayed but not selectable
- **Insufficient space below**: Dropdown opens above button
- **Form submission**: Hidden input includes selected value
- **Rapid clicking**: Dropdown toggle works smoothly
- **Keyboard navigation**: Wraps around at start/end of list

