# NumberInput Component

A number input component with size variants, min/max/step support, and optional prefix/suffix. Extends TextInput functionality with number-specific features.

## Features

- **Size Variants**: mini (32px), sm (36px), md (40px), lg (48px)
- **Min/Max Constraints**: Enforce minimum and maximum values
- **Step Control**: Define increment/decrement step values
- **Decimal Places**: Control number of decimal places
- **Negative Numbers**: Option to allow or disallow negative values
- **Formatting**: Optional thousand separator formatting on blur
- **Prefix/Suffix Support**: Add text or components before/after input
- **Icon Support**: Left and right icon placement
- **Full Accessibility**: ARIA labels, keyboard navigation, focus states

## Usage

```jsx
import { NumberInput } from '../lib/components';

// Basic number input
<NumberInput 
  value={quantity}
  onChange={(value) => setQuantity(value)}
  placeholder="Enter quantity"
/>

// With min/max constraints
<NumberInput 
  value={age}
  onChange={(value) => setAge(value)}
  min={0}
  max={120}
  placeholder="Age"
/>

// With decimal places
<NumberInput 
  value={price}
  onChange={(value) => setPrice(value)}
  decimalPlaces={2}
  step={0.01}
  placeholder="0.00"
/>

// With prefix/suffix
<NumberInput 
  value={weight}
  onChange={(value) => setWeight(value)}
  suffix="kg"
  placeholder="Weight"
/>

// With formatting
<NumberInput 
  value={amount}
  onChange={(value) => setAmount(value)}
  formatOnBlur
  placeholder="Amount"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| null` | - | Input value (controlled mode) |
| `defaultValue` | `number` | - | Default input value (uncontrolled mode) |
| `onChange` | `(value: number \| null, event: Event) => void` | - | Change handler |
| `onFocus` | `(event: Event) => void` | - | Focus handler |
| `onBlur` | `(event: Event) => void` | - | Blur handler |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `placeholder` | `string` | - | Placeholder text |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `prefix` | `string \| React.ReactNode` | - | Prefix text or component |
| `suffix` | `string \| React.ReactNode` | - | Suffix text or component |
| `iconLeft` | `React.ReactNode` | - | Icon to display on the left |
| `iconRight` | `React.ReactNode` | - | Icon to display on the right |
| `min` | `number` | - | Minimum value allowed |
| `max` | `number` | - | Maximum value allowed |
| `step` | `number` | `1` | Step increment/decrement value |
| `decimalPlaces` | `number` | - | Number of decimal places (0-20) |
| `allowNegative` | `boolean` | `true` | Whether negative numbers are allowed |
| `formatOnBlur` | `boolean` | `false` | Format number on blur (thousand separators) |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## Size Variants

- **mini**: 32px height, 6px vertical padding
- **sm**: 36px height, 7px vertical padding
- **md**: 40px height, 8px vertical padding (default)
- **lg**: 48px height, 10px vertical padding

## Validation

The component automatically validates:
- Minimum/maximum constraints
- Negative number allowance
- Decimal places (when specified)
- Step increments (when specified)

Invalid values are clamped to valid ranges rather than showing error states.

## Formatting

When `formatOnBlur` is enabled:
- Numbers are formatted with thousand separators (e.g., 1,234.56)
- Formatting is applied when the input loses focus
- Raw numeric value is shown while typing
- Formatted value is displayed when not focused

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- Focus states with visible focus ring
- Disabled and read-only states properly announced
- Value constraints communicated via min/max attributes

## Edge Cases

- Empty input returns `null` to onChange
- Invalid input is prevented (e.g., letters when typing)
- Values are clamped to min/max ranges
- Decimal places are enforced when specified
- Negative numbers are blocked when `allowNegative={false}`

## Notes

- The component uses `type="number"` input but removes browser spinner arrows for consistent styling
- Prefix/suffix support allows badges or other components to be used
- Dynamic padding adjusts automatically for prefix/suffix widths
- Step value is automatically calculated from `decimalPlaces` if `step` is not provided

