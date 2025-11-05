# PhoneInput Component

A phone number input component with country code selector using Badge component. Supports flexible international formatting, automatically stripping all non-numeric characters.

## Features

- **Country Code Selector**: Interactive Badge component with dropdown for selecting country code
- **Flexible Formatting**: Strips all non-numeric characters (parentheses, dashes, spaces, etc.)
- **International Support**: No length restrictions, supports any country format
- **Searchable Dropdown**: Search countries by name, code, or dial code
- **Default Country**: Japan (+81) by default
- **Size Variants**: Supports all size variants (mini, sm, md, lg)
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled modes
- **Accessibility**: Proper ARIA labels, keyboard navigation, and focus states

## Usage

```jsx
import { PhoneInput } from '../lib/components';

// Basic phone input (defaults to Japan +81)
<PhoneInput 
  value={phone}
  onChange={(value) => setPhone(value)}
/>

// With specific country code
<PhoneInput 
  value={phone}
  onChange={(value) => setPhone(value)}
  countryCode="+1"
  onCountryChange={(dialCode, country) => console.log('Country changed:', country)}
/>

// Uncontrolled mode
<PhoneInput 
  defaultValue="1234567890"
  onChange={(value) => handlePhoneChange(value)}
/>

// Different sizes
<PhoneInput 
  size="sm"
  placeholder="Enter phone number"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Input value (controlled mode). Should contain digits only (non-numeric characters are stripped) |
| `defaultValue` | `string` | - | Default input value (uncontrolled mode) |
| `onChange` | `(value: string, event: Event) => void` | - | Change handler. Returns digits only (country code not included) |
| `onCountryChange` | `(dialCode: string, country: Object) => void` | - | Country change handler. Called when user selects a different country |
| `onFocus` | `(event: Event) => void` | - | Focus handler |
| `onBlur` | `(event: Event) => void` | - | Blur handler |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readOnly` | `boolean` | `false` | Whether the input is read-only |
| `placeholder` | `string` | `'Phone number'` | Placeholder text |
| `size` | `'mini' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `countryCode` | `string` | `'+81'` | Country dial code (e.g., "+81" for Japan) |
| `name` | `string` | - | Name attribute for form submission. Hidden input includes full number with country code |
| `id` | `string` | - | Unique ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## Size Variants

- **mini**: 32px height, 6px vertical padding
- **sm**: 36px height, 7px vertical padding
- **md**: 40px height, 8px vertical padding (default)
- **lg**: 48px height, 10px vertical padding

## Country Code Selector

The country code selector displays as a Badge component with:
- **Badge Display**: Country abbreviation + dial code (e.g., "JP +81")
- **Dropdown Display**: Country name + dial code (e.g., "Japan +81")
- **Search**: Searchable dropdown to quickly find countries
- **Keyboard Navigation**: Arrow keys, Enter, Escape support
- **Click Outside**: Closes dropdown when clicking outside

### Default Country

The component defaults to Japan (+81). To change the default:

```jsx
<PhoneInput 
  countryCode="+1"  // United States
  value={phone}
  onChange={(value) => setPhone(value)}
/>
```

### Country Change Handler

```jsx
<PhoneInput 
  value={phone}
  onChange={(value) => setPhone(value)}
  onCountryChange={(dialCode, country) => {
    console.log('Selected country:', country.name);
    console.log('Dial code:', dialCode);
    // country object contains: code, name, dialCode, abbreviation
  }}
/>
```

## Formatting

PhoneInput automatically strips all non-numeric characters:
- **Removes**: Parentheses `()`, dashes `-`, spaces, and all other symbols
- **Preserves**: Only digits (0-9)
- **No Length Limit**: Supports phone numbers of any length
- **No Validation**: Does not validate format or length

### Examples

```jsx
// User types: (555) 123-4567
// Display: 5551234567
// onChange receives: "5551234567"

// User types: +1-555-123-4567
// Display: 15551234567
// onChange receives: "15551234567"

// User pastes: +81 90-1234-5678
// Display: 819012345678
// onChange receives: "819012345678"
```

## Form Submission

When using `name` prop, a hidden input is created with the full phone number including country code:

```jsx
<PhoneInput 
  name="phone"
  countryCode="+81"
  value="9012345678"
  onChange={(value) => setPhone(value)}
/>

// Form submission includes:
// <input type="hidden" name="phone" value="+819012345678" />
```

## Implementation Details

- Uses `type="tel"` for mobile keyboard optimization
- Strips non-numeric characters on input
- Country code is stored separately and displayed in Badge
- Dropdown uses similar styling to Select component
- Badge size matches input size for visual consistency

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- Focus states with visible focus ring
- Proper input type for mobile keyboards (tel)
- Dropdown has proper ARIA attributes (`role="listbox"`, `aria-expanded`)
- Keyboard navigation in dropdown (Arrow keys, Enter, Escape)
