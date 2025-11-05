# Badge Component

## Overview
A badge component for displaying labels, status indicators, or tags. Supports size variants and sentiment colors. Perfect for use in input prefixes/suffixes, status indicators, or inline labels.

## Layout Behavior

### Container
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width hugs contents, Height hugs contents
- **Overflow**: Visible
- **Padding**: Varies by size
- **Border-radius**: 4px
- **White-space**: Nowrap (prevents text wrapping)

### Content
- **Alignment**: Center-aligned horizontally and vertically
- **Text**: Single line, no wrapping

## Size Variants

### Large (lg)
- **Height**: 48px
- **Padding**: 12px 16px
- **Font-size**: 14px
- Best for prominent displays

### Medium (md) - Default
- **Height**: 40px
- **Padding**: 10px 14px
- **Font-size**: 14px
- Standard size for most use cases

### Small (sm)
- **Height**: 32px
- **Padding**: 8px 12px
- **Font-size**: 12px
- Best for compact displays

### Mini (mini)
- **Height**: 24px
- **Padding**: 6px 10px
- **Font-size**: 12px
- Best for inline text or compact spaces

### Micro (micro)
- **Height**: 20px
- **Padding**: 4px 6px
- **Font-size**: 11px
- Best for very compact spaces or small text

### Icon Variants (Square Badges with Equal Padding)

All icon variants create perfect squares with equal padding on all sides, designed for icon-only badges:

#### Large Icon (lgIcon)
- **Height**: 48px
- **Width**: 48px (fixed square)
- **Padding**: 12px (all sides)
- **Font-size**: 14px
- **Icon size**: 24px × 24px

#### Medium Icon (mdIcon)
- **Height**: 40px
- **Width**: 40px (fixed square)
- **Padding**: 10px (all sides)
- **Font-size**: 14px
- **Icon size**: 20px × 20px

#### Small Icon (smIcon)
- **Height**: 32px
- **Width**: 32px (fixed square)
- **Padding**: 8px (all sides)
- **Font-size**: 12px
- **Icon size**: 16px × 16px

#### Mini Icon (miniIcon)
- **Height**: 24px
- **Width**: 24px (fixed square)
- **Padding**: 6px (all sides)
- **Font-size**: 12px
- **Icon size**: 12px × 12px

#### Micro Icon (microIcon)
- **Height**: 20px
- **Width**: 20px (fixed square)
- **Padding**: 4px (all sides)
- **Font-size**: 11px
- **Icon size**: 12px × 12px

## Sentiment Variants

### Default
- Background: `var(--surface-low)`
- Color: `var(--text)`
- Border: `var(--border)`

### Success
- Background: `var(--success-surface)`
- Color: `var(--success-text)`
- Border: `var(--success-border)`

### Info
- Background: `var(--info-surface)`
- Color: `var(--info-text)`
- Border: `var(--info-border)`

### Danger
- Background: `var(--danger-surface)`
- Color: `var(--danger-text)`
- Border: `var(--danger-border)`

### Warning
- Background: `var(--warning-surface)`
- Color: `var(--warning-text)`
- Border: `var(--warning-border)`

### Neutral
- Background: `var(--neutral-surface)`
- Color: `var(--neutral-text)`
- Border: `var(--neutral-border)`

### Purple
- Background: `var(--purple-surface)`
- Color: `var(--purple-text)`
- Border: `var(--purple-border)`

### Orange
- Background: `var(--orange-surface)`
- Color: `var(--orange-text)`
- Border: `var(--orange-border)`

### Memo
- Background: `var(--memo-surface)`
- Color: `var(--memo-text)`
- Border: `var(--memo-border)`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Badge content (text or custom content). Omit for icon-only badges. |
| `size` | `'lg' \| 'md' \| 'sm' \| 'mini' \| 'micro' \| 'lgIcon' \| 'mdIcon' \| 'smIcon' \| 'miniIcon' \| 'microIcon'` | `'md'` | Size variant |
| `sentiment` | `'default' \| 'success' \| 'info' \| 'danger' \| 'warning' \| 'neutral' \| 'purple' \| 'orange' \| 'memo'` | `'default'` | Sentiment variant |
| `icon` | `React.ReactNode` | - | Icon to display before content |
| `iconRight` | `React.ReactNode` | - | Icon to display after content |
| `className` | `string` | `''` | Additional CSS classes |

## Usage Examples

### Basic Badge
```jsx
<Badge>New</Badge>
<Badge sentiment="success">Active</Badge>
<Badge sentiment="danger">Error</Badge>
```

### Different Sizes
```jsx
<Badge size="lg">Large</Badge>
<Badge size="md">Medium</Badge>
<Badge size="sm">Small</Badge>
<Badge size="mini">Mini</Badge>
<Badge size="micro">Micro</Badge>
```

### Icon-only Badges (Square Variants)
```jsx
<Badge size="lgIcon" icon={<CheckIcon />} sentiment="success" />
<Badge size="mdIcon" icon={<CheckIcon />} sentiment="info" />
<Badge size="smIcon" icon={<CheckIcon />} sentiment="warning" />
<Badge size="miniIcon" icon={<CheckIcon />} sentiment="danger" />
<Badge size="microIcon" icon={<CheckIcon />} sentiment="success" />
```

### With Icons
```jsx
<Badge icon={<CheckIcon />} sentiment="success">Verified</Badge>
<Badge iconRight={<CloseIcon />}>Dismissible</Badge>
```

### In Input Prefix/Suffix
```jsx
<TextInput
  prefix={<Badge size="micro" sentiment="info">USD</Badge>}
  placeholder="0.00"
/>
```

### Status Indicators
```jsx
<Badge sentiment="success">Active</Badge>
<Badge sentiment="warning">Pending</Badge>
<Badge sentiment="danger">Inactive</Badge>
<Badge sentiment="info">Scheduled</Badge>
<Badge sentiment="purple">Highlighted</Badge>
<Badge sentiment="orange">Priority</Badge>
<Badge sentiment="memo">Note</Badge>
<Badge sentiment="neutral">Neutral</Badge>
```

## CSS Implementation

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--surface-low);
  color: var(--text);
}
```

## Edge Cases Tested

- ✅ All size variants render correctly
- ✅ All sentiment variants render correctly
- ✅ With icon before content
- ✅ With icon after content
- ✅ With both icons
- ✅ Long text (nowrap prevents wrapping)
- ✅ Empty content (handled gracefully)
- ✅ Used in input prefix/suffix
- ✅ Used inline with text

## Accessibility

- **Semantic HTML**: Uses `<span>` for inline display
- **Color Contrast**: Sentiment colors maintain proper contrast ratios
- **Screen Readers**: Text content is accessible
- **Icons**: Should have `aria-hidden="true"` when decorative

## Notes

- Uses CSS custom properties exclusively (no hardcoded colors)
- Supports ten size variants: Large (48px), Medium (40px), Small (32px), Mini (24px), Micro (20px), and five icon-only square variants (lgIcon, mdIcon, smIcon, miniIcon, microIcon)
- Supports nine sentiment variants: default, success, info, danger, warning, neutral, purple, orange, memo
- Default size is Medium (md)
- Default sentiment is 'default'
- Text does not wrap (white-space: nowrap)
- Height includes padding and border (box-sizing: border-box)
- Icon variants create perfect squares with equal padding on all sides
- Icons are sized proportionally to badge size
- Perfect for use in input prefixes/suffixes, status indicators, or inline labels

