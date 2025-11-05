# Component Library Conversion - Essential Context

## Project Goal
Convert the menu management project into a reusable component library with precise layout specifications, proper constraints, text truncation, overflow handling, and flex behaviors.

## Key Decisions Made

### 1. Project Structure
- **Quarantine**: Move entire existing project to `quarantine/` folder for reference
- **Build**: Pure library build only - focus on `dist/` with simple demo app in `examples/` for testing
- **No app maintenance**: Existing app is backed up, no need to keep it running

### 2. Component Development Approach
- **Order**: Foundation → Utilities → Create JSON specs for one category → Implement that category completely → Move to next
- **Process per component**: Create JSON spec → Analyze existing patterns → Apply ideals if improvements → Implement CSS → Write component → Validate → Document
- **Validation**: Validate each component before moving to next (don't batch)
- **Documentation**: Document as we go (spec → CSS → JS → docs)
- **Ideals**: Analyze existing patterns first, then apply improvements immediately if non-breaking (document in `IDEALS.md`)

### 3. Component Development Workflow
For each component:
1. Create `[Component].json` layout specification
2. Analyze existing patterns in `quarantine/src/styles.css` and related components
3. Document any ideals/improvements in `IDEALS.md`
4. Apply ideals if they're improvements (non-breaking)
5. Implement `[Component].css` following specification
6. Implement `[Component].jsx` component
7. Validate against checklist (constraints, truncation, overflow, responsive)
8. Create `[Component].md` documentation
9. **ASK QUESTIONS** before committing if anything is unclear

### 4. Critical Requirements

#### Layout Specifications
- Every component must have a `[Component].json` file with:
  - Component structure (variants, layout type)
  - Layout properties (direction, alignment, padding, gap)
  - Constraints (horizontal, vertical, width, height modes)
  - Overflow settings
  - Text properties (truncation, white-space, max-lines)
  - Children definitions with flex properties

#### CSS Implementation
- Use CSS custom properties exclusively (no hardcoded colors)
- Follow layout specification JSON exactly
- Use layout utility classes from `tokens/layout-utilities.css`
- Ensure flex children have `min-width: 0` for truncation
- Map constraints properly (left/center/right → margin/align-self)
- Map width/height modes (hug → fit-content, fill → 100%, fixed → px)
- **IMPORTANT - Padding for Flexbox Components**: When using flexbox layout with icons/elements as flex children, use standard padding (e.g., `12px` on both sides). Do NOT add extra padding for icons - they are flex children and will position themselves within the padding area. Only use extra padding when icons are positioned via CSS background-image (not as separate DOM elements).
- **Standard Padding Pattern**: Input/select components should match TextInput padding: `mini: 6px 12px`, `sm: 7px 12px`, `md: 8px 12px`, `lg: 10px 12px`. TextInput uses dynamic padding only when badges are present (via JavaScript measurement), not in base CSS.

### 4. Critical Requirements

#### Layout Specifications
- Every component must have a `[Component].json` file with:
  - Component structure (variants, layout type)
  - Layout properties (direction, alignment, padding, gap)
  - Constraints (horizontal, vertical, width, height modes)
  - Overflow settings
  - Text properties (truncation, white-space, max-lines)
  - Children definitions with flex properties

#### CSS Implementation
- Use CSS custom properties exclusively (no hardcoded colors)
- Follow layout specification JSON exactly
- Use layout utility classes from `tokens/layout-utilities.css`
- Ensure flex children have `min-width: 0` for truncation
- Map constraints properly (left/center/right → margin/align-self)
- Map width/height modes (hug → fit-content, fill → 100%, fixed → px)
- **IMPORTANT - Padding for Flexbox Components**: When using flexbox layout with icons/elements as flex children, use standard padding (e.g., `12px` on both sides). Do NOT add extra padding for icons - they are flex children and will position themselves within the padding area. Only use extra padding when icons are positioned via CSS background-image (not as separate DOM elements).
- **Standard Padding Pattern**: Input/select components should match TextInput padding: `mini: 6px 12px`, `sm: 7px 12px`, `md: 8px 12px`, `lg: 10px 12px`. TextInput uses dynamic padding only when badges are present (via JavaScript measurement), not in base CSS.

#### Validation Checklist (for each component)
- [ ] Constraints match JSON specification
- [ ] Width/height modes (hug/fill/fixed) work correctly
- [ ] Text truncation works at all breakpoints
- [ ] Overflow behavior (scroll/hidden/visible) matches
- [ ] Flex children truncate properly (min-width: 0 on flex children)
- [ ] Auto-layout padding/gap matches specification
- [ ] Min/max widths/heights enforced
- [ ] Responsive behavior at different container sizes tested
- [ ] **For grouped components**: Container clearly visible as single unit, items flush, selected state uses purple sentiment
- [ ] **For grouped components**: Text hugs content or centers appropriately, no inappropriate truncation
- [ ] Edge cases tested: Very long text, very short text, all items disabled, single item, many items

#### Design System Rules
- Always use CSS custom properties (var()) for colors
- Use semantic color tokens (--text, --surface, --border, etc.)
- Never use hardcoded hex values
- Border radius: Default 4px, Large elements 8px
- Follow existing design token patterns from `design-tokens.css`

#### Component Group Patterns (for ButtonGroup, Tabs, segmented controls, etc.)
- **Container**: Single visible border around entire group, border-radius on container only
- **Children**: Flush with no gaps (gap: 0), no border-radius on sides that meet neighbors
- **Text Handling**: 
  - Segmented variant: Text hugs content (no truncation), buttons size to text
  - Full-width variant: Buttons stretch to fill container, text stays centered
- **Selected/Active State**: Use purple sentiment styling:
  - Background: `var(--purple-surface)`
  - Text: `var(--purple-text)`
  - Border: `var(--purple-border)` (on active item and adjacent borders)
- **Border Between Items**: Visible divider (1px border-right on all except last)
- **Overflow**: Hidden on container to clip border-radius properly

### 5. Important Reminders

- **Ask questions** during each component development to avoid committing to poor patterns
- **Document ideals** as we find them in `IDEALS.md` and apply immediately if improvements
- **Validate each component** before moving to next (don't batch)
- **Reference quarantine** folder when analyzing existing patterns
- **Test edge cases**: Very long text, very short text, container size changes, nested flex containers
- **Maintain accessibility**: ARIA labels, keyboard navigation, focus states

### 6. File Structure

```
src/
  components/
    [category]/
      [Component].jsx
      [Component].css
      [Component].json  # Layout specification
      [Component].md    # Documentation
  patterns/
  tokens/
    design-tokens.css
    layout-utilities.css
  specs/
    component-schema.json
    figma-to-css-mapping.md
    validation-checklist.md
  utils/
    layout-utils.js
  examples/  # Demo app for testing
  lib/       # Library entry points
  IDEALS.md # Document improvements/ideals found
quarantine/ # Original project for reference
```

### 7. Layout Utility Classes Reference

```css
/* Truncation */
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.text-clamp-1 { -webkit-line-clamp: 1; }
.text-clamp-2 { -webkit-line-clamp: 2; }
.text-clamp-3 { -webkit-line-clamp: 3; }

/* Overflow */
.overflow-visible { overflow: visible; }
.overflow-hidden { overflow: hidden; }
.overflow-scroll { overflow: scroll; }
.overflow-auto { overflow: auto; }

/* Flex Constraints */
.flex-hug { width: fit-content; }
.flex-fill { flex: 1 1 0; min-width: 0; }
.flex-fixed { flex: 0 0 auto; }

/* Constraints */
.constraint-left { margin-right: auto; }
.constraint-center { margin: 0 auto; }
.constraint-right { margin-left: auto; }
.constraint-fill-width { width: 100%; }
.constraint-fill-height { height: 100%; }
```

### 8. Component Categories & Order

1. **Buttons** (foundation components)
   - Button
   - IconButton
   - ButtonGroup

2. **Form Inputs** (build on buttons)
   - Checkbox
   - Radio, RadioGroup
   - RadioCard, RadioCardGroup
   - Toggle
   - TextInput
   - NumberInput
   - CurrencyInput
   - TextArea
   - PasswordInput
   - PhoneInput
   - InputGroup

3. **Selects** (build on inputs)
   - Select
   - MultiSelect
   - SelectOption
   - SelectGroup

4. **Feedback** (build on inputs/buttons)
   - Alert
   - Toast, ToastContainer
   - InputAlert
   - Badge
   - Chip
   - Tooltip

5. **Data Display** (more complex)
   - Card
   - Table, TableRow, TableCell
   - List
   - Accordion

6. **Navigation** (layout components)
   - Tabs, Tab, TabPanel
   - NavItem
   - NavSection
   - NavMenu

7. **Layout** (container components)
   - Modal
   - Dialog
   - Sidebar

8. **Advanced** (specialized)
   - DatePicker, TimePicker, DateRangePicker
   - ImageUpload, AvatarUpload
   - StarRating

9. **Patterns** (composed)
   - FormField
   - AddressInput
   - TableControlBar
   - LeftNavigation

### 9. Questions to Ask During Development

- Does this component handle edge cases properly?
- Are the constraints correctly implemented?
- Is text truncation working as expected?
- Are there any accessibility concerns?
- Should we apply any ideals/improvements from existing patterns?
- Does this match the layout specification exactly?
- Are there any responsive behavior issues?
- Should this component be split into smaller components?
- Is the API/props design intuitive?
- Are there any performance concerns?
- **For grouped/segmented components**: Is the container clearly visible as single unit? Are items flush? Does selected state use purple sentiment?
- **For text in groups**: Does text hug content or center when stretched? Is truncation appropriate for the variant?

### 10. Demo App Patterns

#### Label-Component Spacing Pattern

**Rule**: Any component displayed with a label in the demo app must be wrapped in a `demo-labeled-input` container to ensure consistent 8px spacing.

**Implementation**:
- Wrap label and component together: `<div className="demo-labeled-input">`
  - Label (using `demo-label`, `demo-label-large`, or `demo-subheading`)
  - Component (Button, TextInput, Select, Card, RadioGroup, ButtonGroup, etc.)
- CSS class `.demo-labeled-input` provides: `display: flex; flex-direction: column; gap: 8px`
- Labels inside automatically get `margin-bottom: 0` (overrides any default margins)
- Component wrappers inside automatically get `margin-top: 0; padding-top: 0` (no interfering spacing)

**Current Approach**: Uses `gap: 8px` on flex container
- Pros: More semantic, single source of truth, spacing controlled by container
- Cons: Only works within the container

**Alternative Consideration**: Using `margin-bottom: 8px` on labels instead
- Pros: Would work even outside containers
- Cons: Less flexible, needs coordination to remove when inside containers

**Example**:
```jsx
<div className="demo-labeled-input">
  <p className="demo-label-large">Label Text</p>
  <TextInput placeholder="Enter text..." />
</div>
```

**Note**: This pattern applies to ALL components when displayed with labels in the demo app, regardless of component type.

## Reference Files

- `quarantine/src/styles.css` - Original component styles
- `quarantine/src/design-tokens.css` - Design system tokens
- `quarantine/src/components/` - Original components for pattern analysis
- `specs/component-schema.json` - Layout specification template
- `specs/figma-to-css-mapping.md` - Mapping guide
- `specs/validation-checklist.md` - Validation checklist

