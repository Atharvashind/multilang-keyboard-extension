# Implementation Plan: MultiLang Keyboard Refinements

## Overview

Incremental refinements to `content.js`, `styles.css`, and `manifest.json` — no new source files. Tasks are ordered so each step is independently testable and builds on the previous one.

## Tasks

- [x] 1. Extract all inline styles to styles.css and update manifest.json
  - [x] 1.1 Add all `mlk-*` CSS classes to `styles.css` covering every element currently styled via `style.cssText` in `content.js` (panel, floating button, language buttons, key buttons, action buttons, toast, active-target outline)
    - Classes to add: `#mlk-floating-btn`, `#mlk-keyboard-panel`, `.mlk-btn-visible`, `.mlk-btn-pressed`, `.mlk-panel-open`, `.mlk-lang-btn`, `.mlk-lang-btn--active`, `.mlk-key`, `.mlk-key--space`, `.mlk-key--action`, `.mlk-key--shift`, `.mlk-key--shift-active`, `.mlk-action-btn`, `.mlk-toast`, `.mlk-active-target`
    - _Requirements: 2.1_
  - [x] 1.2 Replace all `element.style.cssText = ...` assignments in `content.js` with `classList.add/remove/toggle` calls using the new class names
    - _Requirements: 2.1_
  - [x] 1.3 Add `"css": ["styles.css"]` to the `content_scripts` entry in `manifest.json` and add `"storage"` to the `permissions` array
    - _Requirements: 2.2, 6.3_
  - [ ]* 1.4 Write property test for CSS class coverage (Property 3)
    - **Property 3: CSS classes cover all keyboard elements**
    - For each language in LAYOUTS, call `buildKeyboard()` and assert every keyboard element has at least one `mlk-*` class and no non-empty inline `style` attribute (excluding drag `left`/`top`)
    - **Validates: Requirements 2.1, 2.2**
    - `// Feature: multilang-keyboard-refinements, Property 3: CSS classes cover all keyboard elements`

- [x] 2. Fix focusout hiding the floating button when clicking the keyboard panel
  - [x] 2.1 Update the `focusout` listener to check `panel.contains(document.activeElement)` inside the `setTimeout` callback; if true, return early without hiding the button or clearing `currentInput`
    - _Requirements: 1.3_
  - [ ]* 2.2 Write unit test for focusout panel-click guard
    - Simulate `focusin` on an input, then `focusout` while `document.activeElement` is a button inside the panel; assert the floating button remains visible and `currentInput` is unchanged
    - _Requirements: 1.3_

- [x] 3. Implement TargetInputManager with stale-reference guard and active-target class
  - [x] 3.1 Introduce a `targetManager` object (or equivalent functions `setTarget`, `clearTarget`, `isValid`) that adds `mlk-active-target` on `setTarget`, removes it on `clearTarget`, and checks `document.contains` in `isValid`
    - _Requirements: 1.4, 4.3, 4.4_
  - [x] 3.2 Replace direct `currentInput = e.target` assignments with `targetManager.setTarget(e.target)` and add `if (!targetManager.isValid()) return;` guards at the top of every key-click handler
    - _Requirements: 1.4_
  - [ ]* 3.3 Write property test for active-target class round-trip (Property 7)
    - **Property 7: Active-target class round-trip**
    - For random input/textarea/contenteditable elements, simulate `focusin` → assert `mlk-active-target` present; simulate `focusout` to non-panel element → assert class removed
    - **Validates: Requirements 4.3, 4.4**
    - `// Feature: multilang-keyboard-refinements, Property 7: Active-target class round-trip`

- [x] 4. Fix contenteditable caret-aware insertion and deletion
  - [x] 4.1 Implement `insertAtCaret(el, text)` using `window.getSelection()` / `Range` API: get selection, guard for null/rangeCount === 0, collapse to caret, insert a text node, advance the range
    - _Requirements: 1.1_
  - [x] 4.2 Implement `deleteBeforeCaret(el)` using `window.getSelection()` / `Range` API: get selection, guard for null, extend range one character backwards, delete contents
    - _Requirements: 1.2_
  - [x] 4.3 Update the `←` key handler to call `deleteBeforeCaret` for contenteditable targets instead of slicing `textContent`
    - _Requirements: 1.2_
  - [x] 4.4 Update `insertText` to call `insertAtCaret` for contenteditable targets instead of appending to `textContent`
    - _Requirements: 1.1_
  - [ ]* 4.5 Write property test for contenteditable insertion (Property 1)
    - **Property 1: contenteditable caret-aware insertion**
    - Generate random strings and caret offsets; call `insertAtCaret`; verify inserted text appears at exactly that offset with surrounding characters unchanged
    - **Validates: Requirements 1.1**
    - `// Feature: multilang-keyboard-refinements, Property 1: contenteditable caret-aware insertion`
  - [ ]* 4.6 Write property test for contenteditable deletion (Property 2)
    - **Property 2: contenteditable caret-aware deletion**
    - Generate random non-empty strings and caret offsets > 0; call `deleteBeforeCaret`; verify character at `caretOffset - 1` is removed and all others are unchanged
    - **Validates: Requirements 1.2**
    - `// Feature: multilang-keyboard-refinements, Property 2: contenteditable caret-aware deletion`

- [x] 5. Checkpoint — Ensure all tests pass, ask the user if questions arise.

- [x] 6. Split renderKeyboard() into buildKeyboard() and updateShiftState()
  - [x] 6.1 Implement `buildKeyboard(lang, isShift)` that constructs the full panel DOM (language bar, key rows, action buttons) and attaches all event listeners; call it when the panel is first opened and on language change
    - _Requirements: 3.1, 3.2_
  - [x] 6.2 Implement `updateShiftState(isShift)` that iterates existing `button[data-key]` nodes and updates only their `textContent` and CSS classes (`mlk-key--shift-active`) without touching the DOM structure; call it on Shift toggle instead of `buildKeyboard`
    - _Requirements: 3.1_
  - [x] 6.3 Update `toggleKeyboard` and the language-button click handler to call `buildKeyboard` / `updateShiftState` appropriately; remove the old `renderKeyboard` function
    - _Requirements: 3.1, 3.2_
  - [ ]* 6.4 Write property test for Shift toggle DOM node reuse (Property 4)
    - **Property 4: Shift toggle reuses existing DOM nodes**
    - Build keyboard, capture `button[data-key]` node references, toggle Shift, assert the set of node references is identical
    - **Validates: Requirements 3.1**
    - `// Feature: multilang-keyboard-refinements, Property 4: Shift toggle reuses existing DOM nodes`
  - [ ]* 6.5 Write property test for language change rebuilds key layout (Property 5)
    - **Property 5: Language change rebuilds key layout**
    - For each pair of distinct languages A and B, call `updateLanguage(B)` from state A; assert all `button[data-key]` elements reflect language B's normal-state characters
    - **Validates: Requirements 3.2**
    - `// Feature: multilang-keyboard-refinements, Property 5: Language change rebuilds key layout`

- [x] 7. Add drag support for the keyboard panel
  - [x] 7.1 Add a drag-handle element at the top of the panel (built inside `buildKeyboard`); implement `attachDrag(panel, handle)` that stores mouse offset on `mousedown`, updates `panel.style.left`/`top` on `mousemove`, clamps to viewport bounds, and removes listeners on `mouseup`
    - _Requirements: 4.1_
  - [x] 7.2 Store drag position in module-level `panelX`/`panelY` variables; apply them when reopening the panel so position is preserved across open/close cycles
    - _Requirements: 4.1_
  - [ ]* 7.3 Write property test for drag viewport clamping (Property 6)
    - **Property 6: Drag repositions panel within viewport bounds**
    - Generate random sequences of `mousemove` coordinates; assert panel `left` and `top` always satisfy `0 <= left <= viewport.width - panel.width` and `0 <= top <= viewport.height - panel.height`
    - **Validates: Requirements 4.1**
    - `// Feature: multilang-keyboard-refinements, Property 6: Drag repositions panel within viewport bounds`

- [x] 8. Add open/close CSS animations
  - [x] 8.1 Add `@keyframes mlk-slide-in` and `@keyframes mlk-slide-out` to `styles.css`; apply `mlk-slide-in` via `mlk-panel-open` and trigger `mlk-slide-out` on close; listen for `animationend` to remove `mlk-panel-open` after the close animation
    - _Requirements: 4.2_
  - [ ]* 8.2 Write unit test for panel open/close class toggling
    - Call `toggleKeyboard()` to open; assert `mlk-panel-open` is present. Trigger close; assert `mlk-slide-out` is added and `mlk-panel-open` is removed after `animationend`
    - _Requirements: 4.2_

- [x] 9. Implement clipboard error handling with execCommand fallback
  - [x] 9.1 Replace the inline `navigator.clipboard.writeText(...).then(...)` call with an `async copyToClipboard(text)` function that wraps `navigator.clipboard.writeText` in `try/catch` and falls back to a hidden `<textarea>` + `document.execCommand('copy')` on failure; call `showToast('Copied!')` in both paths
    - _Requirements: 5.1, 5.2_
  - [ ]* 9.2 Write unit tests for clipboard handling
    - Test 1: `navigator.clipboard.writeText` resolves → toast shown
    - Test 2: `navigator.clipboard.writeText` rejects → `execCommand` called, toast still shown
    - _Requirements: 5.1, 5.2_

- [x] 10. Add persistent language preference via chrome.storage.sync
  - [x] 10.1 On language selection, call `chrome.storage.sync.set({ mlkLang: lang })` guarded by `if (typeof chrome !== 'undefined' && chrome.storage?.sync)`
    - _Requirements: 6.1_
  - [x] 10.2 On initialisation, call `chrome.storage.sync.get('mlkLang', ...)` with the same guard; restore `currentLang` only if the stored value is a key in `LAYOUTS`, otherwise keep `'english'`
    - _Requirements: 6.2_
  - [ ]* 10.3 Write property test for language persistence round-trip (Property 8)
    - **Property 8: Language persistence round-trip**
    - For each language identifier in LAYOUTS, call the storage-set path then the storage-get restore path; assert `currentLang` equals the originally selected language
    - **Validates: Requirements 6.1, 6.2**
    - `// Feature: multilang-keyboard-refinements, Property 8: Language persistence round-trip`
  - [ ]* 10.4 Write unit test for unknown language fallback
    - Store an unrecognised language string; run the restore path; assert `currentLang` remains `'english'`
    - _Requirements: 6.2_

- [x] 11. Final checkpoint — Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use **fast-check** and must run a minimum of 100 iterations each
- All property tests must include the comment tag `// Feature: multilang-keyboard-refinements, Property N: ...`
- All changes are confined to `content.js`, `styles.css`, and `manifest.json`
