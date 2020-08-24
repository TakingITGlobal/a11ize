# a11ize

A React-based accessibility toolkit for creating accessible websites.

## Features

- Text Sizing
- Font Style
  - Bundles Open Dyslexic by default
- Line Spacing
- Word Spacing
- Custom high-contrast colour filters
- Enhanced Inputs
- Table of Contents
  - Dynamically generated from semantic HTML

## Usage notes

- Ensure that text sizes are defined in `rem`s

### React usage

Wrap the content you want to be modified by a11ize in the `AccessibilityButton`
tag.

```jsx
  import AccessibilityButton from 'a11ize';
  ...
  <AccessibilityButton {...options}>
    Site content here.
  </AccessibilityButton>
```

### Non-React usage

```js
import AccessibilityButton from "a11ize/dist/no-react";
AccessibilityButton.createButton("#accessible-content", options);
```

```html
<div id="accessible-content">
  Site content here.
</div>
```

## Font Usage

a11y-button bundles the Open Dyslexic font face by default. Please make sure to
abide by their licensing rules if you choose to use Open Dyslexic in your own
projects.
