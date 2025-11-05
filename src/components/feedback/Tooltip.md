# Tooltip Component

A tooltip component that displays contextual information on hover, focus, or click. Supports multiple positioning options.

## Features

- **Multiple Positions**: Top, bottom, left, right, and their start/end variants (12 positions total)
- **Trigger Types**: Hover (default), click, focus, or manual control
- **Accessibility**: ARIA attributes and keyboard support
- **Animation**: Smooth fade in/out transitions
- **No Arrow**: Tooltips display without arrows for a cleaner look

## Usage

```jsx
import Tooltip from '@tablecheck/component-library/components/Tooltip';

// Basic hover tooltip
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// Different positions
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>

// Start/end alignment
<Tooltip content="Top start" position="top-start">
  <Button>Top Start</Button>
</Tooltip>

<Tooltip content="Bottom end" position="bottom-end">
  <Button>Bottom End</Button>
</Tooltip>

// Click trigger
<Tooltip content="Click to toggle" trigger="click">
  <Button>Click me</Button>
</Tooltip>

// Focus trigger
<Tooltip content="Focus to show" trigger="focus">
  <input type="text" placeholder="Focus me" />
</Tooltip>

// Manual control
<Tooltip content="Controlled tooltip" trigger="manual" visible={isVisible}>
  <Button onClick={() => setIsVisible(!isVisible)}>Toggle</Button>
</Tooltip>

```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The element that triggers the tooltip (must be a single React element) |
| `content` | `string` | - | Tooltip content text (required) |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | `'top'` | Tooltip position relative to trigger element |
| `trigger` | `'hover' \| 'click' \| 'focus' \| 'manual'` | `'hover'` | How the tooltip is triggered |
| `showArrow` | `boolean` | `true` | Whether to show the arrow pointing to the trigger element |
| `visible` | `boolean` | - | For manual trigger: controls tooltip visibility |
| `className` | `string` | `''` | Additional CSS classes |

## Position Variants

### Basic Positions
- `top`: Above the element, centered
- `bottom`: Below the element, centered
- `left`: Left of the element, vertically centered
- `right`: Right of the element, vertically centered

### Start/End Alignment
- `top-start`: Above the element, aligned to start (left)
- `top-end`: Above the element, aligned to end (right)
- `bottom-start`: Below the element, aligned to start (left)
- `bottom-end`: Below the element, aligned to end (right)
- `left-start`: Left of the element, aligned to start (top)
- `left-end`: Left of the element, aligned to end (bottom)
- `right-start`: Right of the element, aligned to start (top)
- `right-end`: Right of the element, aligned to end (bottom)

## Typography

- **Font Size**: 12px
- **Font Weight**: 400
- **Line Height**: 1.5
- **Padding**: 6px 8px
- **Max Width**: 180px (text wraps after this width)

## Trigger Types

### Hover (Default)
- Shows on mouse enter
- Hides on mouse leave
- Also shows on focus for keyboard accessibility

### Click
- Toggles on click
- Closes when clicking outside the tooltip
- Useful for interactive tooltips

### Focus
- Shows on focus
- Hides on blur
- Ideal for form inputs and interactive elements

### Manual
- Controlled via `visible` prop
- Useful for programmatic control

## Visual Design

- **Background**: Dark gray (`var(--grey-grey-900)`)
- **Text**: White (`var(--grey-white)`)
- **Border Radius**: 4px
- **Shadow**: `0 2px 8px rgba(0, 0, 0, 0.15)`
- **Offset**: 8px gap between tooltip and trigger element
- **Z-index**: 1000 (above most content)
- **No Arrow**: Tooltips display without arrows

## Accessibility

- Uses `role="tooltip"` for screen readers
- `aria-describedby` links trigger element to tooltip
- `aria-live="polite"` for dynamic content updates
- Keyboard accessible (focus trigger)
- Click outside closes tooltip for click trigger

## Animation

- **Fade In**: 0.15s ease-out
- **Fade Out**: 0.1s ease-in
- Smooth opacity and visibility transitions

## Edge Cases

- **No Content**: If `content` is not provided, tooltip wrapper is not rendered, children are returned as-is
- **Multiple Children**: Children must be a single React element (use `React.Children.only`)
- **Overflow**: Tooltip respects max-width and wraps text automatically
- **Viewport Edges**: Tooltip can extend beyond viewport (consider using a positioning library for advanced cases)
- **Nested Tooltips**: Avoid nesting tooltips as it can cause interaction issues

## Notes

- Tooltip wrapper uses `display: inline-block` to allow proper positioning
- Tooltip is absolutely positioned relative to its wrapper
- Arrow position adjusts based on tooltip position
- For click trigger, tooltip closes when clicking outside the wrapper
- Tooltip content supports text wrapping for long content
- Max-width prevents tooltips from becoming too wide

## Best Practices

1. **Keep content concise**: Tooltips should provide brief, helpful information
2. **Use appropriate triggers**: Hover for hints, focus for form help, click for interactive content
3. **Choose positions carefully**: Ensure tooltip doesn't cover important content
4. **Consider mobile**: Hover doesn't work on touch devices, consider using click or focus
5. **Accessibility first**: Always provide alternative ways to access tooltip information

