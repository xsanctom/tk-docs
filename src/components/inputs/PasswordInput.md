# PasswordInput Component

A password input component that wraps TextInput with password-specific functionality, including a show/hide toggle button with eye icon.

## Features

- **Show/Hide Toggle**: Eye icon button to toggle password visibility
- **Size Variants**: Inherits all TextInput size variants (mini, sm, md, lg)
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled modes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Password Security**: Type switches between "password" and "text"

## Usage

```jsx
import { PasswordInput } from '../lib/components';

// Basic password input
<PasswordInput 
  value={password}
  onChange={(value) => setPassword(value)}
/>

// Without toggle button
<PasswordInput 
  showPasswordToggle={false}
  value={password}
  onChange={(value) => setPassword(value)}
/>

// Different sizes
<PasswordInput 
  size="sm"
  placeholder="Enter password"
/>

// Disabled state
<PasswordInput 
  disabled
  defaultValue="hidden"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Input value (controlled mode) |
| `defaultValue` | `string` | - | Default input value (uncontrolled mode) |
| `onChange` | `(value: string, event: Event) => void` | - | Change handler |
| `onFocus` | `(event: Event) => void` | - | Focus handler |
| `onBlur` | `(event: Event) => void` | - | Blur handler |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `placeholder` | `string` | `'Enter password...'` | Placeholder text |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `showPasswordToggle` | `boolean` | `true` | Whether to show the show/hide toggle button |
| `defaultShowPassword` | `boolean` | `false` | Initial visibility state (uncontrolled mode) |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## Size Variants

- **mini**: 32px height, 6px vertical padding
- **sm**: 36px height, 7px vertical padding
- **md**: 40px height, 8px vertical padding (default)
- **lg**: 48px height, 10px vertical padding

## Toggle Button

The toggle button appears on the right side of the input:
- Shows **EyeIcon** when password is hidden (click to show)
- Shows **EyeOffIcon** when password is visible (click to hide)
- Automatically hidden when input is disabled
- Accessible with keyboard navigation
- Includes ARIA labels for screen readers

## Implementation Details

PasswordInput:
- Uses a native `<input>` element with `type="password"` or `type="text"`
- Manages visibility state internally (or via controlled `showPassword` prop if added)
- Toggle button is positioned absolutely on the right side
- Input padding is adjusted to accommodate the toggle button
- All TextInput features are supported (size, disabled, readOnly, etc.)

## Accessibility

- Full keyboard navigation support
- ARIA labels for toggle button ("Show password" / "Hide password")
- Focus states with visible focus ring
- Disabled states properly announced
- Password type prevents browser autocomplete suggestions (good for security)

## Security Notes

- Input type is "password" by default (masks characters)
- Toggle only changes visual display, doesn't affect form submission
- Password is never logged or exposed when toggled

