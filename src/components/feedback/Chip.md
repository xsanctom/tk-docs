# Chip Component

A chip component similar to buttons but simpler, with selected state styling like ButtonGroup. Used for filters, tags, and toggleable selections. Features fully rounded corners (pill shape) and optional leading/trailing icons.

## Features

- **Size Variants**: Large (48px), Medium (40px), Small (36px)
- **Variants**: Default, Primary
- **States**: Normal, Selected (purple), Hover, Disabled, Selected & Disabled
- **Selected State**: Uses purple styling (border, text) like ButtonGroup
- **White Background**: Always maintains white background regardless of state
- **Fully Rounded Corners**: Pill-shaped with `border-radius: 9999px`
- **Icon Support**: Optional leading and trailing icons

## Usage

```jsx
import Chip from '@tablecheck/component-library/components/Chip';

// Basic usage
<Chip>Filter</Chip>

// Selected state
<Chip selected>Selected Filter</Chip>

// With icons
<Chip iconLeft={<SearchIcon />}>Search</Chip>
<Chip iconRight={<CloseIcon />}>Dismissible</Chip>
<Chip iconLeft={<SearchIcon />} iconRight={<CloseIcon />}>Both Icons</Chip>

// Primary variant
<Chip variant="primary">Primary Chip</Chip>

// Different sizes
<Chip size="lg">Large</Chip>
<Chip size="md">Medium</Chip>
<Chip size="sm">Small</Chip>

// Disabled
<Chip disabled>Disabled</Chip>
<Chip selected disabled>Selected & Disabled</Chip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Content to display in the chip |
| `variant` | `'default' \| 'primary'` | `'default'` | Visual variant |
| `size` | `'lg' \| 'md' \| 'sm'` | `'md'` | Size variant |
| `selected` | `boolean` | `false` | Whether the chip is selected (purple styling) |
| `disabled` | `boolean` | `false` | Whether the chip is disabled |
| `iconLeft` | `React.ReactNode` | - | Icon to display on the left |
| `iconRight` | `React.ReactNode` | - | Icon to display on the right |
| `onClick` | `Function` | - | Click handler |
| `className` | `string` | `''` | Additional CSS classes |

## Size Variants

| Size | Height | Padding | Font Size | Icon Size |
|------|--------|---------|-----------|-----------|
| `lg` | 48px | 12px 20px | 14px | 18px |
| `md` | 40px | 10px 16px | 12px | 16px |
| `sm` | 36px | 8px 12px | 12px | 14px |

## States

### Default State
- Border: `var(--border)` (gray)
- Text: `var(--text-subtle)` (gray)
- Font Weight: 400

### Hover State
- Border: `var(--border-active)` (darker gray)
- Text: `var(--text)` (black)
- Only applies when not selected and not disabled

### Selected State
- Background: `var(--purple-purple-50)` (light purple)
- Border: `var(--purple-border)` (purple)
- Text: `var(--purple-text)` (purple)
- Font Weight: 500
- Hover: Background changes to `var(--purple-surface)` (purple-100)

### Selected & Disabled State
- Background: `var(--purple-purple-50)` (light purple)
- Border: `var(--purple-border)` (purple)
- Text: `var(--purple-text)` (purple)
- Font Weight: 500
- Opacity: 0.6
- Cursor: not-allowed
- Note: Selected state styling is maintained with reduced opacity

### Primary Variant
- Border: `var(--info-border)` (blue)
- Text: `var(--info-text)` (blue)
- Font Weight: 500
- Note: Primary variant cannot be combined with selected state

### Disabled State
- Opacity: 0.6
- Cursor: not-allowed
- Border: `var(--border)` (gray)
- Text: `var(--text-disabled)` (gray)

## Visual Design

- **Background**: White (`var(--surface)`) by default, lighter purple (`var(--purple-purple-50)`) when selected
- **Border Radius**: `9999px` (fully rounded, pill shape)
- **Border**: 1px solid, color changes based on state
- **Text**: Centered, no truncation
- **Font**: IBM Plex Sans
- **Gap**: 6-8px between icon and text (size-dependent)

## Icon Support

Icons are sized automatically based on the chip size:
- **Large**: 18px × 18px icons
- **Medium**: 16px × 16px icons
- **Small**: 14px × 14px icons

Icons can be placed on the left (`iconLeft`), right (`iconRight`), or both sides. The gap between icon and text is automatically adjusted based on size.

## Differences from Badge

- Chips are interactive (buttons) while badges are display-only
- Chips have selected state (purple) while badges have sentiment variants
- Chips always have white background, badges use sentiment-colored backgrounds
- Chips have fully rounded corners (pill shape), badges have 4px border-radius
- Chips are simpler, badges have more complex styling options

## Differences from Button

- Chips have fully rounded corners (pill shape), buttons have 4px border-radius
- Chips are simpler with fewer variants
- Chips have selected state (purple) while buttons have selected prop (different styling)
- Chips are typically used for filters/tags, buttons for actions

## Accessibility

- Uses `button` element for keyboard navigation
- `aria-pressed` attribute indicates selected state
- Focus visible outline for keyboard users
- Disabled state prevents interaction
- Icons have `aria-hidden="true"` since they're decorative

## Notes

- Default state maintains white background
- Selected state uses lighter purple background (`var(--purple-purple-50)`), purple border, and purple text
- Selected state hover uses slightly darker purple (`var(--purple-surface)` / purple-100)
- Selected & Disabled state maintains purple styling with reduced opacity (0.6)
- Primary variant uses blue/info styling and cannot be combined with selected state
- Font weight increases to 500 when selected or primary variant
- Transitions are limited to colors, not layout properties
- Fully rounded corners create a pill/oval shape
- Icon sizes automatically adjust based on chip size
