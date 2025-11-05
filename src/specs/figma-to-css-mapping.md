# Figma to CSS Property Mapping

## Constraints → CSS

### Horizontal Constraints
- `left` → `margin-right: auto` (or `align-self: flex-start`)
- `center` → `margin: 0 auto` (or `align-self: center`)
- `right` → `margin-left: auto` (or `align-self: flex-end`)
- `left-right` → `width: 100%` (constrained to parent)
- `scale` → `width: 100%` (scales proportionally)

### Vertical Constraints
- `top` → `margin-bottom: auto` (or `align-self: flex-start`)
- `center` → `margin: auto 0` (or `align-self: center`)
- `bottom` → `margin-top: auto` (or `align-self: flex-end`)
- `top-bottom` → `height: 100%` (constrained to parent)
- `scale` → `height: 100%` (scales proportionally)

## Width/Height Modes → CSS

### Width Mode
- `hug-contents` → `width: fit-content` or `width: auto`
- `fixed` → `width: {value}px`
- `fill-container` → `width: 100%` with `min-width: {min}` and `max-width: {max}`

### Height Mode
- `hug-contents` → `height: fit-content` or `height: auto`
- `fixed` → `height: {value}px`
- `fill-container` → `height: 100%` with `min-height: {min}` and `max-height: {max}`

## Overflow → CSS

```css
/* Overflow mapping */
overflow-x: {horizontal}; /* visible | hidden | scroll | auto */
overflow-y: {vertical};
overflow: {combined}; /* shorthand */
clip-path: {if clipping enabled};
```

## Text Truncation → CSS

```css
/* Ellipsis truncation */
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0; /* Critical for flex children */
}

/* Multi-line truncation */
.text-clamp-base {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-clamp-1 { -webkit-line-clamp: 1; }
.text-clamp-2 { -webkit-line-clamp: 2; }
.text-clamp-3 { -webkit-line-clamp: 3; }

/* Clip truncation */
.text-clip {
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
}

/* Wrap */
.text-wrap {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

## Auto-Layout → Flexbox/Grid

### Direction
- `horizontal` → `flex-direction: row`
- `vertical` → `flex-direction: column`

### Alignment
- `"start"` → `align-items: flex-start` | `justify-content: flex-start`
- `"center"` → `align-items: center` | `justify-content: center`
- `"end"` → `align-items: flex-end` | `justify-content: flex-end`
- `"space-between"` → `justify-content: space-between`
- `"stretch"` → `align-items: stretch`

### Padding
- Padding values map directly: `padding: {top}px {right}px {bottom}px {left}px`
- Or use shorthand: `padding: {top}px {right}px;`

### Gap
- `gap: {value}px` for flexbox
- Use `gap` property directly

## Flex Properties

### Flex Children
- `flex: 0 0 auto` → Fixed size, no grow/shrink (for icons, fixed elements)
- `flex: 1 1 0` → Flexible, can grow/shrink (for text, flexible content)
- Always add `min-width: 0` to flex children that need truncation

## Example Mapping

```json
{
  "layout": {
    "type": "auto-layout",
    "direction": "horizontal",
    "alignment": {
      "children": "center"
    },
    "padding": {
      "top": 12,
      "right": 16,
      "bottom": 12,
      "left": 16
    },
    "gap": 8
  },
  "constraints": {
    "width": {
      "mode": "hug-contents",
      "min": null,
      "max": null
    },
    "height": {
      "mode": "fixed",
      "min": 40,
      "value": null
    }
  },
  "text": {
    "truncation": "ellipsis",
    "whiteSpace": "nowrap"
  }
}
```

Becomes:

```css
.component {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: fit-content;
  min-height: 40px;
  overflow: hidden;
}

.component-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
```

