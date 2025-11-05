# ImageUpload Component

A file upload component for images with drag & drop support, preview functionality, and file validation. Supports single file upload.

## Features

- **Drag & Drop**: Drag and drop images onto the upload area
- **Preview**: Shows image preview after selection (200x200px default)
- **File Validation**: Validates file type (images only) and size
- **Error Handling**: Displays error messages for invalid files
- **Remove Functionality**: Clear selected image with remove button
- **Accessibility**: Full keyboard navigation and ARIA support

## Usage

```jsx
import { ImageUpload } from '../lib/components';

// Basic image upload
<ImageUpload 
  value={imageFile}
  onChange={(file) => setImageFile(file)}
/>

// With custom preview size
<ImageUpload 
  value={imageFile}
  onChange={(file) => setImageFile(file)}
  previewSize={300}
/>

// With custom file size limit
<ImageUpload 
  value={imageFile}
  onChange={(file) => setImageFile(file)}
  maxSize={10 * 1024 * 1024} // 10MB
/>

// With error handling
<ImageUpload 
  value={imageFile}
  onChange={(file) => setImageFile(file)}
  onError={(error) => console.error(error)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `File \| string` | - | Current file (File object) or image URL (string) - controlled mode |
| `defaultValue` | `File \| string` | - | Default file or image URL - uncontrolled mode |
| `onChange` | `(file: File \| null, event: Event) => void` | - | Change handler. Called with File object or null when removed |
| `onError` | `(error: string) => void` | - | Error handler for validation errors |
| `disabled` | `boolean` | `false` | Whether the upload is disabled |
| `accept` | `string` | `'image/*'` | File types to accept (e.g., 'image/*', '.jpg,.png') |
| `maxSize` | `number` | `5242880` | Maximum file size in bytes (5MB default) |
| `previewSize` | `number` | `200` | Preview image size in pixels |
| `placeholder` | `string` | `'Click to upload or drag and drop'` | Placeholder text |
| `hint` | `string` | `'PNG, JPG, GIF up to 5MB'` | Hint text below placeholder |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## File Validation

The component automatically validates:
- **File Type**: Must be an image (MIME type starts with 'image/')
- **File Size**: Must be less than `maxSize` (default: 5MB)

Invalid files will:
- Show an error message below the upload area
- Call `onError` callback if provided
- Not trigger `onChange` callback

## Preview

- Preview appears after a valid image is selected
- Image is displayed at the specified `previewSize` (default: 200x200px)
- Uses `object-fit: contain` to preserve aspect ratio
- Remove button appears in top-right corner on hover

## Drag & Drop

- Drag files over the upload area to highlight it
- Drop files to upload (validates same as click upload)
- Drag leave clears highlight

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- Focus states with visible focus ring
- Enter/Space key triggers file selection dialog
- Error messages announced to screen readers

