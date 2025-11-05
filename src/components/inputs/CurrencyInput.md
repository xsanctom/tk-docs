# CurrencyInput Component

A currency input component that wraps NumberInput with currency-specific defaults. Automatically handles currency symbol display, decimal places, and formatting.

## Features

- **Currency Support**: USD, JPY, EUR, GBP, CAD, AUD, CNY (defaults to USD)
- **Automatic Decimal Places**: Currency-specific defaults (USD=2, JPY=0, etc.)
- **Currency Symbol Display**: Shows currency code as Badge prefix
- **Formatting**: Automatic thousand separator formatting on blur
- **Size Variants**: Inherits all NumberInput size variants
- **Full NumberInput Features**: All NumberInput props are supported

## Usage

```jsx
import { CurrencyInput } from '../lib/components';

// Basic USD currency input
<CurrencyInput 
  value={price}
  onChange={(value) => setPrice(value)}
/>

// JPY (no decimals)
<CurrencyInput 
  currency="JPY"
  value={price}
  onChange={(value) => setPrice(value)}
/>

// Custom decimal places
<CurrencyInput 
  currency="USD"
  decimalPlaces={3}
  value={price}
  onChange={(value) => setPrice(value)}
/>

// Without symbol prefix
<CurrencyInput 
  currency="EUR"
  showSymbol={false}
  value={price}
  onChange={(value) => setPrice(value)}
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
| `placeholder` | `string` | Currency-specific | Placeholder text |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `currency` | `string` | `'USD'` | Currency code: 'USD', 'JPY', 'EUR', 'GBP', etc. |
| `showSymbol` | `boolean` | `true` | Whether to show currency symbol as prefix |
| `decimalPlaces` | `number` | Currency-specific | Number of decimal places (USD=2, JPY=0) |
| `formatOnBlur` | `boolean` | `true` | Format number on blur with thousand separators |
| `min` | `number` | - | Minimum value allowed |
| `max` | `number` | - | Maximum value allowed |
| `allowNegative` | `boolean` | `false` | Whether negative numbers are allowed |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## Supported Currencies

| Currency | Symbol | Decimal Places |
|----------|--------|----------------|
| USD | USD | 2 |
| JPY | JPY | 0 |
| EUR | EUR | 2 |
| GBP | GBP | 2 |
| CAD | CAD | 2 |
| AUD | AUD | 2 |
| CNY | CNY | 2 |

## Implementation Details

CurrencyInput is a wrapper component around NumberInput that:
- Automatically sets currency-specific decimal places
- Displays currency code as a Badge prefix
- Enables formatting by default (`formatOnBlur={true}`)
- Disables negative numbers by default (`allowNegative={false}`)
- Calculates step value based on decimal places

## Notes

- CurrencyInput uses NumberInput internally, so all NumberInput features are available
- The currency symbol is displayed as a Badge component (micro size)
- Default placeholder is currency-specific (e.g., "0.00" for USD, "0" for JPY)
- Custom currencies can be used by passing the currency code, but defaults to USD behavior if not recognized

