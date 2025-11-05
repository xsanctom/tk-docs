# InputGroup Component

## Overview
A wrapper component for form inputs that provides consistent structure for labels, sublabels, helper text, and error messages. Ensures proper spacing, accessibility, and form validation feedback.

## Layout Behavior

### Container
- **Type**: Auto-layout (Vertical)
- **Constraints**: Width fills container, Height hugs contents
- **Overflow**: Visible
- **Padding**: 0
- **Gap**: 8px (between label, sublabel, input wrapper, and helper text)

### Label Group
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width fills container, Height hugs contents
- **Alignment**: Space-between (label on left, optional indicator on right)
- **Gap**: 8px

### Input Wrapper
- **Type**: Auto-layout (Vertical)
- **Constraints**: Width fills container, Height hugs contents
- **Gap**: 4px (between input and error message)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The input component to wrap (required) |
| `label` | `string \| React.ReactNode` | - | Label text or element |
| `sublabel` | `string \| React.ReactNode` | - | Optional sublabel text or element (appears below label) |
| `helperText` | `string \| React.ReactNode` | - | Optional helper text (appears below input) |
| `error` | `string \| React.ReactNode` | - | Optional error message (appears below input, above helper text) |
| `optional` | `boolean` | `false` | Whether to show "(Optional)" indicator next to label |
| `optionalText` | `string` | `'(Optional)'` | Custom optional text |
| `id` | `string` | auto-generated | Unique ID for the group |
| `className` | `string` | `''` | Additional CSS classes |
| `aria-describedby` | `string` | - | Additional aria-describedby value (for custom descriptions) |

## Spacing Structure

```
┌─────────────────────────────────┐
│ Label Group (8px gap)          │
│  Label ──────────── (Optional)  │
├─────────────────────────────────┤
│ Sublabel (if provided)         │
├─────────────────────────────────┤
│ Input Wrapper (4px gap)        │
│  [Input Component]             │
│  Error Message (if error)      │
├─────────────────────────────────┤
│ Helper Text (if no error)      │
└─────────────────────────────────┘
```

## Accessibility

- Labels are properly associated with inputs via `htmlFor` and `id`
- Error messages have `role="alert"` for screen readers
- `aria-describedby` automatically includes error and helper text IDs
- `aria-invalid` is set on the input when an error is present
- All text elements have proper semantic HTML

## Typography

### Label
- Font-size: 14px
- Font-weight: 500
- Color: `var(--text)`

### Optional Indicator
- Font-size: 14px
- Font-weight: 400
- Color: `var(--text-subtle)`

### Sublabel
- Font-size: 14px
- Font-weight: 400
- Color: `var(--text-subtle)`

### Error Message
- Font-size: 12px
- Font-weight: 400
- Color: `var(--danger-text)`

### Helper Text
- Font-size: 12px
- Font-weight: 400
- Color: `var(--text-subtle)`

## Usage Examples

### Basic InputGroup
```jsx
<InputGroup label="Name">
  <TextInput placeholder="Enter your name" />
</InputGroup>
```

### With Optional Indicator
```jsx
<InputGroup label="Email" optional>
  <TextInput type="email" placeholder="Enter your email" />
</InputGroup>
```

### With Sublabel
```jsx
<InputGroup 
  label="Password"
  sublabel="Must be at least 8 characters"
>
  <PasswordInput placeholder="Enter password" />
</InputGroup>
```

### With Helper Text
```jsx
<InputGroup 
  label="Username"
  helperText="This will be your unique identifier"
>
  <TextInput placeholder="Enter username" />
</InputGroup>
```

### With Error Message
```jsx
<InputGroup 
  label="Email"
  error="Please enter a valid email address"
>
  <TextInput 
    type="email"
    placeholder="email@example.com"
    defaultValue="invalid-email"
  />
</InputGroup>
```

### Complete Example
```jsx
<InputGroup 
  label="Account Name"
  sublabel="This will be displayed in your profile"
  helperText="Choose a name that represents your account"
  optional
>
  <TextInput placeholder="Enter account name" />
</InputGroup>
```

### With Different Input Types
```jsx
{/* TextInput */}
<InputGroup label="Name">
  <TextInput placeholder="Enter name" />
</InputGroup>

{/* NumberInput */}
<InputGroup label="Quantity" error="Must be positive">
  <NumberInput min={0} />
</InputGroup>

{/* Select */}
<InputGroup label="Country" helperText="Select your country">
  <Select options={countries} />
</InputGroup>

{/* TextArea */}
<InputGroup label="Description" sublabel="Optional description">
  <TextArea rows={3} />
</InputGroup>
```

## States

### Normal State
- All elements display normally
- No error styling applied

### Error State
- Error message appears below input
- Helper text is hidden (error takes precedence)
- Input receives `aria-invalid="true"`
- Error message has `role="alert"`

### Optional State
- Optional indicator appears next to label
- Custom optional text can be provided

## Notes

- Helper text only displays when there is no error (error takes precedence)
- The component automatically generates unique IDs for accessibility
- Child input components receive `aria-describedby` with error/helper IDs
- Labels are properly associated with inputs for screen readers
- Supports any input component (TextInput, NumberInput, Select, TextArea, etc.)


