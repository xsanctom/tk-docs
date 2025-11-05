# Modal Component

A flexible Modal/Dialog component with 4 size variants for different use cases. Includes overlay, header with close button, scrollable body, and optional footer.

## Features

- **4 Size Variants**: Fullscreen, Item Editor (976px), Medium (600px), Small (400px)
- **Overlay/Backdrop**: Semi-transparent overlay with click-to-close (configurable)
- **Keyboard Navigation**: ESC key to close (configurable)
- **Focus Management**: Focus trap and body scroll lock
- **Smooth Animations**: Fade in overlay, slide in modal
- **Accessibility**: Full ARIA support, focus management

## Size Variants

1. **Fullscreen** - Takes up entire viewport (100vw × 100vh)
2. **Item Editor** - 976px max-width, for editing items/forms
3. **Medium** - 600px max-width, for simple forms
4. **Small** - 400px max-width, for confirm dialogs

## Usage

### Basic Modal
```jsx
import { Modal } from '../lib/components';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <Modal.Body>
    <p>Modal content goes here</p>
  </Modal.Body>
</Modal>
```

### With Footer Actions
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="small"
>
  <Modal.Body>
    <p>Are you sure you want to archive this item?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleArchive}>
      Archive
    </Button>
  </Modal.Footer>
</Modal>
```

### Item Editor Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Item"
  size="item-editor"
>
  <Modal.Body>
    <form>
      {/* Form fields */}
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>
```

### Fullscreen Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Full Screen View"
  size="fullscreen"
>
  <Modal.Body>
    {/* Full screen content */}
  </Modal.Body>
</Modal>
```

### Custom Header
```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  <Modal.Header>
    <h2>Custom Header</h2>
    <span>Additional info</span>
  </Modal.Header>
  <Modal.Body>
    Content
  </Modal.Body>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the modal is open |
| `onClose` | `Function` | - | Callback function called when modal should close |
| `size` | `'fullscreen' \| 'item-editor' \| 'medium' \| 'small'` | `'medium'` | Size variant |
| `title` | `string` | - | Title text displayed in header |
| `showCloseButton` | `boolean` | `true` | Whether to show close button in header |
| `closeOnOverlayClick` | `boolean` | `true` | Whether clicking overlay closes modal |
| `closeOnEscape` | `boolean` | `true` | Whether ESC key closes modal |
| `className` | `string` | - | Additional CSS classes for modal container |

## Sub-Components

### Modal.Header
Custom header content. If not provided and `title` prop is set, a default header is rendered.

```jsx
<Modal.Header>
  Custom header content
</Modal.Header>
```

### Modal.Body
Main content area. Scrollable if content exceeds available height.

```jsx
<Modal.Body>
  Main content
</Modal.Body>
```

### Modal.Footer
Footer area for actions/buttons. Typically contains buttons aligned to the right.

```jsx
<Modal.Footer>
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Modal.Footer>
```

## Accessibility

- **ARIA Labels**: Proper `role="dialog"` and `aria-modal="true"`
- **Focus Management**: Focuses first focusable element when opened, restores focus when closed
- **Keyboard Navigation**: ESC key closes modal
- **Focus Trap**: Keeps focus within modal (via first/last focusable elements)
- **Body Scroll Lock**: Prevents background scrolling when modal is open

## Implementation Details

- Uses fixed positioning for overlay and modal container
- Overlay has semi-transparent black background (rgba(0, 0, 0, 0.5))
- Modal container has white background, border-radius, and shadow
- Body scrolls independently if content exceeds available height
- Fullscreen variant removes border-radius and padding
- Animations: fade in overlay (0.2s), slide in modal (0.3s)

