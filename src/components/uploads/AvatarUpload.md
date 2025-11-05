# AvatarUpload Component

A specialized image upload component for user avatars with square preview (8px border radius), single file support, and default fallback icon. Click anywhere on avatar to upload, edit icon overlay on hover. Includes remove button when image is uploaded.

## Features

- **Square Preview**: Square avatar with 8px border radius and proper image cropping (object-fit: cover)
- **Default Icon**: Shows user icon when no image is uploaded
- **Edit Overlay**: Edit icon appears on hover when no image is present (optional)
- **Remove Button**: X icon button appears in top-right corner when image is uploaded
- **Size Variants**: Two sizes: md (64px), lg (96px)
- **File Validation**: Validates file type (images only) and size
- **Accessibility**: Full keyboard navigation and ARIA support

## Usage

```jsx
import { AvatarUpload } from '../lib/components';

// Basic avatar upload
<AvatarUpload 
  value={avatarFile}
  onChange={(file) => setAvatarFile(file)}
/>

// Different sizes
<AvatarUpload 
  value={avatarFile}
  onChange={(file) => setAvatarFile(file)}
  size="lg"
/>

// Without edit overlay
<AvatarUpload 
  value={avatarFile}
  onChange={(file) => setAvatarFile(file)}
  showEditOverlay={false}
/>

// With error handling
<AvatarUpload 
  value={avatarFile}
  onChange={(file) => setAvatarFile(file)}
  onError={(error) => console.error(error)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `File \| string` | - | Current file (File object) or image URL (string) - controlled mode |
| `defaultValue` | `File \| string` | - | Default file or image URL - uncontrolled mode |
| `onChange` | `(file: File \| null, event: Event) => void` | - | Change handler. Called with File object |
| `onError` | `(error: string) => void` | - | Error handler for validation errors |
| `disabled` | `boolean` | `false` | Whether the upload is disabled |
| `size` | `'md' \| 'lg'` | `'md'` | Size variant |
| `accept` | `string` | `'image/*'` | File types to accept (e.g., 'image/*', '.jpg,.png') |
| `maxSize` | `number` | `5242880` | Maximum file size in bytes (5MB default) |
| `showEditOverlay` | `boolean` | `true` | Whether to show edit icon overlay on hover |
| `name` | `string` | - | Name attribute for form submission |
| `id` | `string` | - | Unique ID (auto-generated if not provided) |
| `className` | `string` | - | Additional CSS classes |
| `aria-label` | `string` | - | Accessible label (required if no visible label) |

## Size Variants

- **md**: 64px × 64px (default)
- **lg**: 96px × 96px

## File Validation

The component automatically validates:
- **File Type**: Must be an image (MIME type starts with 'image/')
- **File Size**: Must be less than `maxSize` (default: 5MB)

Invalid files will:
- Call `onError` callback if provided
- Not trigger `onChange` callback

## Preview

- Preview appears after a valid image is selected
- Image is displayed in a square container with 8px border radius
- Uses `object-fit: cover` to fill the square properly
- Default user icon is shown when no image is uploaded

## Edit Overlay

When `showEditOverlay` is `true` (default) and no image is uploaded:
- Edit icon appears in center of avatar on hover
- Semi-transparent dark overlay covers avatar
- Icon size scales with avatar size
- Helps indicate that the avatar is clickable/editable

## Remove Button

When an image is uploaded:
- Remove button (X icon) appears in the top-right corner
- Clicking the remove button clears the uploaded image
- Button uses danger color scheme for visibility
- Works in both controlled and uncontrolled modes
- Button prevents event propagation to avoid triggering file input

## Accessibility

- Full keyboard navigation support
- ARIA labels for screen readers
- Focus states with visible focus ring
- Enter/Space key triggers file selection dialog
- Error messages announced to screen readers

