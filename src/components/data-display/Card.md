# Card Component

A card component for displaying content with icon, title, optional badge, and description. Supports multiple interaction states: default, hover, focus, disabled, and selected.

## Features

- **Multiple States**: Default, hover, focus, disabled, and selected
- **Flexible Content**: Icon, title, badge, and description
- **Description Truncation**: Automatically truncates to 4 lines
- **Interactive**: Can be used as a button or link with keyboard navigation
- **Accessibility**: ARIA roles and keyboard support

## Usage

```jsx
import Card from '@tablecheck/component-library/components/data-display/Card';

// Basic card with icon, title, and description
<Card
  icon={<DiamondIcon />}
  title="Title"
  description="Description - please try to keep card descriptions below 4 lines where possible."
/>

// Card with badge (string automatically converted to Badge component)
<Card
  icon={<DiamondIcon />}
  title="Title"
  badge="New"
  description="Description text here."
/>

// Card with custom Badge component
<Card
  icon={<DiamondIcon />}
  title="Title"
  badge={<Badge size="mini" sentiment="purple">New</Badge>}
  description="Description text here."
/>

// Selected card
<Card
  icon={<DiamondIcon />}
  title="Title"
  description="Description text here."
  selected
/>

// Disabled card
<Card
  icon={<DiamondIcon />}
  title="Title"
  description="Description text here."
  disabled
/>

// Card without description
<Card
  icon={<DiamondIcon />}
  title="Title"
  badge="New"
/>

// Card as button
<Card
  icon={<DiamondIcon />}
  title="Title"
  description="Description text here."
  onClick={() => console.log('Clicked')}
/>

// Card with custom content
<Card>
  <div>Custom content here</div>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | - | Icon element to display on the left |
| `title` | `React.ReactNode` | - | Title text |
| `badge` | `React.ReactNode\|string` | - | Optional badge/tag element (Badge component or string - strings will be converted to Badge with size="micro" and sentiment="purple") |
| `description` | `React.ReactNode` | - | Description text (max 4 lines, automatically truncated) |
| `selected` | `boolean` | `false` | Whether the card is selected |
| `disabled` | `boolean` | `false` | Whether the card is disabled |
| `focused` | `boolean` | `false` | Whether the card is focused (for controlled focus) |
| `onClick` | `Function` | - | Click handler `(event: Event) => void` |
| `className` | `string` | `''` | Additional CSS classes |
| `role` | `'button' \| 'link'` | - | ARIA role (auto-set to 'button' if onClick provided) |
| `children` | `React.ReactNode` | - | Optional custom content (replaces default structure) |

## States

### Default State
- Background: `var(--surface-raised)` (light gray)
- Border: `var(--border)` (1px solid light gray)
- Border Radius: 4px
- Icon: `var(--text)` (black)
- Title: `var(--text)` (black, medium weight 500)
- Badge: Uses Badge component styling (purple sentiment by default)
- Description: `var(--text-subtle)` (gray)

### Hover State
- Background: `var(--surface-raised-hover)` (slightly darker gray)
- Border: `var(--border)` (unchanged)
- All other elements unchanged

### Focus State
- Background: `var(--surface)` (white)
- Border: `var(--focus)` (2px solid blue)
- Used for keyboard navigation and accessibility

### Selected State
- Background: `var(--purple-surface-selected)` (light purple)
- Border: `var(--purple-purple-600)` (1px solid purple)
- All other elements unchanged

### Disabled State
- Background: `var(--surface-raised)` (light gray)
- Border: `var(--border)` (1px solid light gray)
- Opacity: 0.6
- Icon: `var(--text-disabled)` (gray)
- Title: `var(--text-disabled)` (gray)
- Badge: Uses Badge component styling (inherits disabled state)
- Description: `var(--text-disabled)` (gray)
- Cursor: not-allowed
- Pointer events: none

## Visual Design

- **Layout**: Horizontal flex row with icon on left, content on right
- **Padding**: 16px on all sides
- **Gap**: 12px between icon and content
- **Content Gap**: 4px between title/badge and description (0px when no description)
- **Border Radius**: 4px
- **Icon Size**: 20px × 20px
- **Title**: 14px, medium (500), line-height 1.5
- **Badge**: Uses Badge component (defaults to `size="micro"` and `sentiment="purple"` when passing a string)
- **Description**: 12px, regular (400), line-height 1.5, max 4 lines (truncated with ellipsis)

## Accessibility

- Uses `role="button"` when `onClick` is provided
- Keyboard navigation: Enter and Space keys trigger click
- Focus visible outline for keyboard users
- `tabIndex` set to 0 when interactive, undefined when disabled
- ARIA attributes supported via `role` prop

## Notes

- Cards without descriptions automatically remove the gap between header and content
- Description is automatically truncated to 4 lines using CSS `-webkit-line-clamp`
- Badge prop accepts either a string (automatically converted to Badge component) or a Badge component directly for full customization
- Selected state uses purple surface and border for visual consistency
- Disabled state desaturates all colors and reduces opacity
- Card can be used as a button, link, or static content container
- Custom content can be provided via `children` prop
- Focus state can be controlled via `focused` prop for programmatic focus management

