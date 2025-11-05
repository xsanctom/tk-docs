# RadioCardGroup Component

## Overview
A container component for radio card options. Manages selection state and ensures only one card can be selected at a time. Cards are displayed horizontally by default with equal width distribution, or vertically stacked.

## Layout Behavior

### Container
- **Type**: Auto-layout (Horizontal by default, Vertical when orientation="vertical")
- **Constraints**: Width fills container, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 8px between cards

### Radio Cards
- **Constraints**: Each card fills available width (flex: 1)
- **Layout**: Side-by-side horizontally (default) or stacked vertically
- **Equal Width**: Cards distribute evenly in horizontal layout

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Currently selected value |
| `onChange` | `Function` | - | Change handler: `(value: string, event: Event) => void` |
| `options` | `Array` | `[]` | Array of option objects: `{ value: string, label: string, description?: string, disabled?: boolean }` |
| `name` | `string` | auto-generated | Name attribute for form submission |
| `orientation` | `'vertical' \| 'horizontal'` | `'horizontal'` | Layout orientation |
| `disabled` | `boolean` | `false` | Whether all cards in group are disabled |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `React.ReactNode` | - | Custom RadioCard components (alternative to options prop) |
| `aria-label` | `string` | - | Accessible label for the group |

## Variants

### Horizontal (Default)
- Cards align horizontally
- Gap: 8px between cards
- Cards distribute evenly (flex: 1)
- Best for 2-4 options with equal importance

### Vertical
- Cards stack vertically
- Gap: 8px between cards
- Cards fill container width
- Best for many options or when cards have varying content

## Usage Examples

### Basic RadioCardGroup with Options
```jsx
const [selected, setSelected] = useState('option1');

<RadioCardGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  options={[
    { value: 'option1', label: 'Option 1', description: 'Description for option 1' },
    { value: 'option2', label: 'Option 2', description: 'Description for option 2' },
    { value: 'option3', label: 'Option 3', description: 'Description for option 3' }
  ]}
/>
```

### Vertical RadioCardGroup
```jsx
<RadioCardGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  orientation="vertical"
  options={[
    { value: 'option1', label: 'Option 1', description: 'Long description text' },
    { value: 'option2', label: 'Option 2', description: 'Another long description' }
  ]}
/>
```

### RadioCardGroup with Custom RadioCard Children
```jsx
<RadioCardGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  name="custom-group"
>
  <RadioCard value="option1" label="Option 1" description="Description 1" />
  <RadioCard value="option2" label="Option 2" description="Description 2" />
  <RadioCard value="option3" label="Option 3" disabled />
</RadioCardGroup>
```

### RadioCardGroup with Disabled Options
```jsx
<RadioCardGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  options={[
    { value: 'option1', label: 'Option 1', description: 'Available option' },
    { value: 'option2', label: 'Option 2', description: 'Disabled option', disabled: true },
    { value: 'option3', label: 'Option 3', description: 'Another available option' }
  ]}
/>
```

### All Disabled RadioCardGroup
```jsx
<RadioCardGroup
  value={selected}
  onChange={(value) => setSelected(value)}
  disabled
  options={[
    { value: 'option1', label: 'Option 1', description: 'Description 1' },
    { value: 'option2', label: 'Option 2', description: 'Description 2' }
  ]}
/>
```

## CSS Implementation

```css
.radio-card-group {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 8px;
}

.radio-card-group.vertical {
  flex-direction: column;
}

.radio-card-group.vertical .radio-card {
  width: 100%;
}
```

## Edge Cases Tested

- ✅ Single card in group
- ✅ Many cards (5+)
- ✅ Horizontal orientation distributes evenly
- ✅ Vertical orientation stacks correctly
- ✅ Disabled individual cards
- ✅ All cards disabled
- ✅ Selection state management (only one selected)
- ✅ Value changes update selection correctly
- ✅ Form submission (name/value attributes)
- ✅ Long labels and descriptions wrap properly
- ✅ Cards without descriptions

## Accessibility

- **Role**: Uses `role="radiogroup"` for proper ARIA semantics
- **Keyboard Navigation**: Arrow keys navigate between cards
- **Screen Readers**: Properly announced as a radio group
- **Focus Management**: Focus moves between cards with arrow keys
- **Selection**: Only one card can be selected at a time
- **Clickable Area**: Entire card is clickable, improving usability

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Auto-generates unique `name` attribute if not provided
- Supports both `options` prop and `children` patterns
- Disabled state cascades to all child cards
- Individual cards can also be disabled via option.disabled
- Gap: 8px between cards (consistent spacing)
- Cards distribute evenly in horizontal layout (flex: 1)
- Active/selected cards use purple sentiment styling

