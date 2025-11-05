# RadioGroup Component

## Overview
A container component for radio button options. Manages selection state and ensures only one option can be selected at a time. Supports both vertical and horizontal layouts.

## Layout Behavior

### Container
- **Type**: Auto-layout (Vertical by default, Horizontal when orientation="horizontal")
- **Constraints**: Width hugs contents, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 4px vertical, 16px horizontal (when horizontal orientation)

### Radio Options
- **Constraints**: Each radio hugs its content
- **Layout**: Stacked vertically (default) or side-by-side (horizontal)
- **Spacing**: Consistent gap between options

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Currently selected value |
| `onChange` | `Function` | - | Change handler: `(value: string, event: Event) => void` |
| `options` | `Array` | `[]` | Array of option objects: `{ value: string, label: string, disabled?: boolean }` |
| `name` | `string` | auto-generated | Name attribute for form submission |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation |
| `disabled` | `boolean` | `false` | Whether all radios in group are disabled |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `React.ReactNode` | - | Custom Radio components (alternative to options prop) |
| `aria-label` | `string` | - | Accessible label for the group |

## Variants

### Vertical (Default)
- Options stack vertically
- Gap: 4px between options
- Best for form layouts

### Horizontal
- Options align horizontally
- Gap: 16px between options
- Wraps if needed
- Best for toolbar-style selections

## Usage Examples

### Basic RadioGroup with Options
```jsx
const [selected, setSelected] = useState('option1');

<RadioGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
/>
```

### Horizontal RadioGroup
```jsx
<RadioGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  orientation="horizontal"
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ]}
/>
```

### RadioGroup with Custom Radio Children
```jsx
<RadioGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  name="custom-group"
>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
  <Radio value="option3" label="Option 3" disabled />
</RadioGroup>
```

### RadioGroup with Disabled Options
```jsx
<RadioGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' }
  ]}
/>
```

### All Disabled RadioGroup
```jsx
<RadioGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  disabled
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ]}
/>
```

## CSS Implementation

```css
.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.radio-group.horizontal {
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
}
```

## Edge Cases Tested

- ✅ Single option in group
- ✅ Many options (5+)
- ✅ Horizontal orientation wraps correctly
- ✅ Vertical orientation stacks correctly
- ✅ Disabled individual options
- ✅ All options disabled
- ✅ Selection state management (only one selected)
- ✅ Value changes update selection correctly
- ✅ Form submission (name/value attributes)
- ✅ Long labels wrap properly

## Accessibility

- **Role**: Uses `role="radiogroup"` for proper ARIA semantics
- **Keyboard Navigation**: Arrow keys navigate between options
- **Screen Readers**: Properly announced as a radio group
- **Focus Management**: Focus moves between options with arrow keys
- **Selection**: Only one option can be selected at a time

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Auto-generates unique `name` attribute if not provided
- Supports both `options` prop and `children` patterns
- Disabled state cascades to all child radios
- Individual radios can also be disabled via option.disabled
- Gap: 4px vertical, 16px horizontal for better visual spacing

