# Component Validation Checklist

Use this checklist to validate each component before marking it as complete.

## Layout Validation

- [ ] Constraints match JSON specification
  - [ ] Horizontal constraint (left/center/right) correctly implemented
  - [ ] Vertical constraint (top/center/bottom) correctly implemented
  - [ ] Width mode (hug-contents/fill-container/fixed) works correctly
  - [ ] Height mode (hug-contents/fill-container/fixed) works correctly

- [ ] Width/height modes work correctly
  - [ ] `hug-contents` → width/height fits content
  - [ ] `fill-container` → width/height fills parent (100%)
  - [ ] `fixed` → width/height matches specified value
  - [ ] Min/max constraints enforced when specified

## Text Handling

- [ ] Text truncation works at all breakpoints
  - [ ] Ellipsis truncation works for single-line text
  - [ ] Multi-line clamp works for specified max-lines
  - [ ] Text wraps correctly when truncation is "none"
  - [ ] Overflow-wrap works for long words

- [ ] Flex children truncate properly
  - [ ] `min-width: 0` applied to flex children that need truncation
  - [ ] Text truncates within flex container
  - [ ] Icons/fixed elements don't shrink when text truncates

## Overflow Behavior

- [ ] Overflow behavior matches specification
  - [ ] `visible` → content visible outside bounds
  - [ ] `hidden` → content clipped at bounds
  - [ ] `scroll` → scrollbars appear when content overflows
  - [ ] `auto` → scrollbars appear only when needed
  - [ ] Horizontal and vertical overflow handled independently

## Layout Properties

- [ ] Auto-layout padding/gap matches specification
  - [ ] Padding values match JSON (top, right, bottom, left)
  - [ ] Gap between children matches specification
  - [ ] Padding responds correctly to container size

- [ ] Alignment works correctly
  - [ ] Children alignment (start/center/end/space-between) works
  - [ ] Self alignment (for nested components) works
  - [ ] Stretch alignment works when specified

## Responsive Behavior

- [ ] Responsive behavior at different container sizes
  - [ ] Component works at small container widths (< 320px)
  - [ ] Component works at medium container widths (320px - 768px)
  - [ ] Component works at large container widths (> 768px)
  - [ ] Component works at very large container widths (> 1200px)

## Edge Cases

- [ ] Very long text (truncation)
  - [ ] Text truncates with ellipsis when very long
  - [ ] Component doesn't break layout with long text
  - [ ] Icons/fixed elements maintain size with long text

- [ ] Very short text (hugging)
  - [ ] Component hugs content when text is short
  - [ ] Component maintains minimum size when specified
  - [ ] No unnecessary spacing with short content

- [ ] Container size changes
  - [ ] Component adapts to container width changes
  - [ ] Component adapts to container height changes
  - [ ] Constraints maintained during resize

- [ ] Nested flex containers
  - [ ] Nested flex containers work correctly
  - [ ] Truncation works in nested flex contexts
  - [ ] Constraints propagate correctly

- [ ] Missing content
  - [ ] Component handles missing optional content (icons, labels)
  - [ ] Component maintains layout without optional elements
  - [ ] No layout shifts when content appears/disappears

## CSS Implementation

- [ ] CSS custom properties used exclusively (no hardcoded colors)
- [ ] Layout utility classes used where appropriate
- [ ] Flex properties correctly applied
- [ ] No conflicting styles
- [ ] Browser compatibility considered

## Accessibility

- [ ] ARIA labels provided where needed
- [ ] Keyboard navigation works
- [ ] Focus states visible and accessible
- [ ] Screen reader compatibility tested

## Component Functionality

- [ ] All props work as expected
- [ ] Variants render correctly
- [ ] States (hover, active, disabled, focus) work correctly
- [ ] Event handlers fire correctly
- [ ] Component integrates with form validation if applicable

## Documentation

- [ ] `[Component].json` layout specification complete
- [ ] `[Component].md` documentation complete
- [ ] Layout behavior documented
- [ ] Edge cases documented
- [ ] CSS implementation notes included

## Notes

Document any issues found or deviations from specification:

- 


