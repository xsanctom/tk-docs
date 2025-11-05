# ButtonGroup Component

## Overview
A group of buttons that work together, typically for selecting a single option. Perfect for segmented controls, view toggles, and similar selection patterns.

## Layout Behavior

### Container
- **Type**: Auto-layout (Horizontal)
- **Constraints**: Width hugs contents (segmented) or fills container (full-width)
- **Padding**: 0
- **Gap**: 0 (buttons are flush with no gap)
- **Border**: 1px solid border around entire container
- **Border-radius**: 4px on container only (not individual buttons)
- **Overflow**: Hidden (to clip border radius)

### Button Children
- **Constraints**: Stretch vertically, hug content horizontally (segmented) or fill container (full-width)
- **Border**: Right border on all buttons except last
- **Border-radius**: 0 (flush with neighbors)
- **Content**: Centered icon and/or text
- **Text**: No truncation - hugs text or centers in stretched container

## Variants

### Segmented (Default)
- Buttons hug their content (width: auto, min-width: fit-content)
- Text determines button width
- Buttons are flush with no gaps
- Container has visible border

### Full-width
- Buttons stretch to fill container equally (`flex: 1 1 0`)
- Text remains centered in stretched buttons
- Still flush with no gaps
- Container fills available width

## Selected State
- Uses purple sentiment styling:
  - Background: `var(--purple-surface)`
  - Text: `var(--purple-text)`
  - Border: `var(--purple-border)` (on active button and adjacent borders)

## Edge Cases Tested

- ✅ Container clearly visible as single unit with border
- ✅ Adjoining buttons are flush (no gap, no border-radius between them)
- ✅ Labels hug text content in segmented variant
- ✅ Labels centered in stretched buttons in full-width variant
- ✅ Text does not truncate - button expands or text centers
- ✅ Selected state uses purple sentiment styling
- ✅ Border between buttons clearly visible
- ✅ Last button has no right border
- ✅ Active button borders use purple color
- ✅ Adjacent buttons to active button get purple border on shared side
- ✅ Single selection works correctly
- ✅ Disabled buttons don't trigger onChange
- ✅ Hover states work correctly
- ✅ Focus states visible for accessibility (inside container)
- ✅ Works with icon-only buttons
- ✅ Works with text-only buttons
- ✅ Works with icon + text buttons
- ✅ Works with varying text lengths
- ✅ Container maintains border even with all buttons disabled
- ✅ Works at different container sizes
- ✅ Responsive behavior tested

## Usage Examples

### Icon-only Segmented Control
```jsx
<ButtonGroup
  options={[
    { value: 'table', icon: <TableIcon /> },
    { value: 'cards', icon: <CardsIcon /> }
  ]}
  value={viewMode}
  onChange={setViewMode}
/>
```

### Full-width Text Buttons
```jsx
<ButtonGroup
  variant="full-width"
  options={[
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  value={filter}
  onChange={setFilter}
/>
```

### Mixed Icon + Text
```jsx
<ButtonGroup
  options={[
    { value: 'list', icon: <ListIcon />, label: 'List' },
    { value: 'grid', icon: <GridIcon />, label: 'Grid' }
  ]}
  value={layout}
  onChange={setLayout}
/>
```

## Accessibility

- Uses `role="group"` on container
- Each button has `aria-pressed` based on active state
- Keyboard navigation supported (Arrow keys could be added)
- Focus states visible with `--focus` color
- Disabled buttons prevent interaction

## Notes

- All colors use CSS custom properties
- ButtonGroup is single-selection by default
- Active button has elevated appearance (background + shadow)
- Container has subtle background to group buttons visually
- Gap of 2px creates visual separation between buttons

