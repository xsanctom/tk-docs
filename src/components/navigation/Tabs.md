# Tabs Component

A tabs component for organizing content into multiple panels. Includes TabsList, Tab, and TabPanel sub-components.

## Features

- **Body Typography**: Body 1 (16px) and Body 2 (14px) font sizes
- **Flexible Height**: Tabs adapt to content with minimum heights (Body 1: 48px, Body 2: 36px)
- **Variants**: Default (border-bottom indicator), Contained (bordered container)
- **Active State**: Uses purple styling (text and bottom border) like ButtonGroup
- **Accessibility**: ARIA attributes and keyboard navigation support
- **Uncontrolled & Controlled**: Supports both controlled and uncontrolled modes

## Usage

```jsx
import Tabs from '@tablecheck/component-library/components/navigation/Tabs';

// Basic usage (uncontrolled)
<Tabs defaultValue="tab1">
  <Tabs.TabsList>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">
    Content for Tab 1
  </Tabs.TabPanel>
  <Tabs.TabPanel value="tab2">
    Content for Tab 2
  </Tabs.TabPanel>
  <Tabs.TabPanel value="tab3">
    Content for Tab 3
  </Tabs.TabPanel>
</Tabs>

// Controlled
<Tabs value={activeTab} onChange={setActiveTab}>
  <Tabs.TabsList>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">Content 1</Tabs.TabPanel>
  <Tabs.TabPanel value="tab2">Content 2</Tabs.TabPanel>
</Tabs>

// Body 1 (default, 16px, 48px min-height)
<Tabs defaultValue="tab1">
  <Tabs.TabsList>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">Content</Tabs.TabPanel>
  <Tabs.TabPanel value="tab2">Content</Tabs.TabPanel>
</Tabs>

// Body 2 (14px, 36px min-height)
<Tabs defaultValue="tab1">
  <Tabs.TabsList>
    <Tabs.Tab value="tab1" body="body2">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2" body="body2">Tab 2</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">Content</Tabs.TabPanel>
  <Tabs.TabPanel value="tab2">Content</Tabs.TabPanel>
</Tabs>

// Mix Body 1 and Body 2
<Tabs defaultValue="tab1">
  <Tabs.TabsList>
    <Tabs.Tab value="tab1" body="body1">Large Tab</Tabs.Tab>
    <Tabs.Tab value="tab2" body="body2">Small Tab</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">Content</Tabs.TabPanel>
  <Tabs.TabPanel value="tab2">Content</Tabs.TabPanel>
</Tabs>

// Contained variant
<Tabs defaultValue="tab1" variant="contained">
  <Tabs.TabsList>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">Content 1</Tabs.TabPanel>
  <Tabs.TabPanel value="tab2">Content 2</Tabs.TabPanel>
</Tabs>

// Disabled tab
<Tabs defaultValue="tab1">
  <Tabs.TabsList>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2" disabled>Disabled Tab</Tabs.Tab>
  </Tabs.TabsList>
  <Tabs.TabPanel value="tab1">Content</Tabs.TabPanel>
</Tabs>
```

## Components

### Tabs (Container)

The main container component that manages tab state.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | - | Default active tab ID (uncontrolled) |
| `value` | `string` | - | Active tab ID (controlled) |
| `onChange` | `Function` | - | Callback when tab changes `(tabId: string) => void` |
| `variant` | `'default' \| 'contained'` | `'default'` | Visual variant |
| `children` | `React.ReactNode` | - | TabsList and TabPanel components |
| `className` | `string` | `''` | Additional CSS classes |

### TabsList

Container for Tab components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | Tab components |
| `className` | `string` | `''` | Additional CSS classes |

### Tab

Individual tab button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Unique identifier for this tab (required) |
| `body` | `'body1' \| 'body2'` | `'body1'` | Typography variant (Body 1: 16px, Body 2: 14px) |
| `disabled` | `boolean` | `false` | Whether the tab is disabled |
| `children` | `React.ReactNode` | - | Tab label content |
| `className` | `string` | `''` | Additional CSS classes |

### TabPanel

Content panel associated with a tab.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Unique identifier matching a Tab's value (required) |
| `children` | `React.ReactNode` | - | Panel content |
| `className` | `string` | `''` | Additional CSS classes |

## Typography Variants

| Variant | Font Size | Min Height | Padding | Line Height |
|---------|-----------|------------|---------|-------------|
| `body1` | 16px | 48px | 16px 20px | 1.5 |
| `body2` | 14px | 36px | 10px 16px | 1.5 |

**Height Difference**: Body 1 tabs are 48px tall (12px taller than Body 2), making the difference more dramatic.

## Variants

### Default
- Tabs have a bottom border indicator
- Active tab shows purple bottom border (`var(--purple-border)`)
- Tab panels have no border, just padding

### Contained
- Entire tabs container has a border
- Tab panels are also bordered and connected to tabs
- Creates a unified, contained appearance

## States

### Default Tab
- Color: `var(--text-subtle)` (gray)
- Background: Transparent
- Border: Transparent bottom border (2px)

### Hover State
- Color: `var(--text)` (black)
- Background: `var(--surface-hover)` (light gray)

### Active Tab
- Color: `var(--purple-text)` (purple)
- Background: Transparent
- Border: `var(--text)` (black, 2px bottom border)
- Font Weight: 500

### Disabled Tab
- Color: `var(--text-disabled)` (gray)
- Opacity: 0.6
- Cursor: not-allowed
- Pointer events: none

## Visual Design

- **Container**: Full width flex column
- **Tabs List**: Horizontal flex row with border-bottom
- **Tab Buttons**: Rounded corners removed (border-radius: 0)
- **Active Indicator**: 2px bottom border in purple
- **Tab Panel**: 24px padding, matches surface background
- **Font**: IBM Plex Sans

## Accessibility

- Uses `role="tablist"` for tabs container
- Uses `role="tab"` for individual tabs
- Uses `role="tabpanel"` for panels
- `aria-selected` indicates active tab
- `aria-hidden` indicates hidden panels
- `aria-disabled` for disabled tabs
- Keyboard navigation support (arrow keys)
- Focus visible outline for keyboard users

## Notes

- Tab content is unmounted when not active (not just hidden) for performance
- Active state uses purple styling (text and border) consistent with ButtonGroup and Chip
- Tabs list has no gap between items for flush appearance
- Bottom border indicator is 2px for clear visibility
- Tab panels automatically hide/show based on active tab
- Disabled tabs cannot be activated

## Differences from ButtonGroup

- Tabs organize content into panels, ButtonGroup is for selection
- Tabs use bottom border indicator, ButtonGroup uses full border styling
- Tabs have associated content panels, ButtonGroup doesn't
- Tabs can be disabled individually, ButtonGroup handles selection state

