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
  import A11yWrapper from 'a11ize';
  ...
  <A11yWrapper {...options}>
    Site content here.
  </A11yWrapper>
```

### Non-React usage

Add the id of `accessible-content` to an element so that it wraps the content you want a11ize to affect (generally the entire page).

```js
import AccessibilityButton from 'a11ize/dist/no-react';
AccessibilityButton.createButton('#accessible-content', options);
```

```html
<div id="accessible-content">
  Site content here.
</div>
<script src="https://cdn.jsdelivr.net/npm/@takingitglobal/a11ize@1.0.0-alpha.9/dist/no-react/index.js">
```

## Font Usage

a11ize bundles the Open Dyslexic font face by default. Please make sure to
abide by their licensing rules if you choose to use Open Dyslexic in your own
projects.

## To-do
- [ ] ~~Split React and No-react into different packages~~
- [ ] Write tests
- [ ] Add CSS color parameters
