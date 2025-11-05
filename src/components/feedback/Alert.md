# Alert Component

## Overview
A persistent banner notification component for displaying success, info, danger, and warning messages. Alerts remain visible until dismissed (if dismissible) or removed programmatically. Distinct from Toasts which auto-dismiss.

## Layout Behavior

### Container
- **Type**: Flex row layout
- **Constraints**: Width fills container, Height hugs contents
- **Overflow**: Visible
- **Padding**: 12px 16px
- **Border-radius**: 4px
- **Gap**: 12px between icon, content, and close button

### Content Structure
- **Icon**: Fixed 20px × 20px, flex-shrink: 0, optional
- **Content**: Flex column container, flex: 1, min-width: 0, gap: 4px
- **Close Button**: Fixed 20px × 20px, flex-shrink: 0, optional

## Variants

### Success
- **Background**: `var(--success-surface)`
- **Border**: `var(--success-border)`
- **Text**: `var(--success-text)`
- **Default Icon**: Checkmark circle
- Use for successful operations, confirmations

### Info (Default)
- **Background**: `var(--info-surface)`
- **Border**: `var(--info-border)`
- **Text**: `var(--info-text)`
- **Default Icon**: Info circle
- Use for informational messages, tips

### Danger
- **Background**: `var(--danger-surface)`
- **Border**: `var(--danger-border)`
- **Text**: `var(--danger-text)`
- **Default Icon**: X circle
- Use for errors, critical issues
- **ARIA**: `aria-live="assertive"` for screen readers

### Warning
- **Background**: `var(--warning-surface)`
- **Border**: `var(--warning-border)`
- **Text**: `var(--warning-text)`
- **Default Icon**: Alert triangle
- Use for warnings, cautions
- **ARIA**: `aria-live="assertive"` for screen readers

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'success' \| 'info' \| 'danger' \| 'warning'` | `'info'` | Alert variant type |
| `title` | `string` | `undefined` | Optional alert title/heading |
| `children` | `React.ReactNode` | Required | Alert message content |
| `icon` | `React.ReactNode \| null` | `undefined` | Custom icon (overrides default). Set to `null` to hide icon |
| `dismissible` | `boolean` | `false` | Show close button |
| `onDismiss` | `Function` | `undefined` | Callback when dismissed |
| `className` | `string` | `''` | Additional CSS classes |
| `...rest` | `HTMLAttributes` | - | Other HTML attributes |

## Text Handling

### Title
- **Font-size**: 14px
- **Font-weight**: 500
- **Line-height**: 1.5
- **Truncation**: Single line with ellipsis
- **White-space**: Nowrap

### Message
- **Font-size**: 14px
- **Font-weight**: 400
- **Line-height**: 1.5
- **Wrapping**: Multi-line, wraps normally
- **Overflow-wrap**: Break-word for long words

## Usage Examples

### Basic Alert
```jsx
<Alert variant="info">
  This is an informational message.
</Alert>
```

### Alert with Title
```jsx
<Alert variant="success" title="Success">
  Your changes have been saved successfully.
</Alert>
```

### Dismissible Alert
```jsx
const [showAlert, setShowAlert] = useState(true);

{showAlert && (
  <Alert
    variant="warning"
    title="Warning"
    dismissible
    onDismiss={() => setShowAlert(false)}
  >
    This action cannot be undone.
  </Alert>
)}
```

### Alert Without Icon
```jsx
<Alert variant="info" icon={null}>
  Alert without icon
</Alert>
```

### Alert with Custom Icon
```jsx
<Alert variant="info" icon={<CustomIcon />}>
  Alert with custom icon
</Alert>
```

### All Variants
```jsx
<Alert variant="success" title="Success">Operation completed successfully</Alert>
<Alert variant="info" title="Information">Here's some helpful information</Alert>
<Alert variant="warning" title="Warning">Please review this before proceeding</Alert>
<Alert variant="danger" title="Error">Something went wrong</Alert>
```

## Visual Design

### Colors
All colors use semantic design tokens:
- **Success**: Green-tinted surface, border, and text
- **Info**: Blue-tinted surface, border, and text
- **Danger**: Red-tinted surface, border, and text
- **Warning**: Yellow-tinted surface, border, and text

### Spacing
- Container padding: 12px 16px
- Gap between elements: 12px
- Gap between title and message: 4px

### Icon
- Size: 20px × 20px
- Inherits text color from variant
- SVG stroke-based icons

### Close Button
- Size: 20px × 20px
- Opacity: 0.7 (default), 1.0 (hover)
- Inherits text color from variant
- Focus outline: 2px solid `var(--focus)`

## Accessibility

- **Role**: `role="alert"` for screen reader announcements
- **ARIA Live**: 
  - `aria-live="assertive"` for danger and warning variants
  - `aria-live="polite"` for success and info variants
- **Close Button**: `aria-label="Dismiss alert"` for screen readers
- **Focus**: Close button has visible focus outline

## Edge Cases

1. **Long Title**: Title truncates with ellipsis, single line
2. **Long Message**: Message wraps normally, multi-line
3. **No Title**: Content container adjusts, no extra spacing
4. **No Icon**: Layout adjusts, content starts immediately
5. **No Dismiss Button**: Layout adjusts, content extends full width
6. **Empty Children**: Component still renders structure (may be intentional for loading states)

## Notes

- Alerts are persistent until dismissed or removed programmatically
- Use Toasts for temporary notifications that auto-dismiss
- Icons inherit color from variant automatically
- All colors use CSS custom properties for theme support
- Component supports dark mode via design tokens

