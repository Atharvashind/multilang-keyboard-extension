# MultiLang Keyboard Extension

A free, open-source browser extension that lets you type in 7 Indian languages on any website using a floating virtual keyboard.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Supported Languages

| Language | Script |
|---|---|
| English | Latin |
| हिन्दी (Hindi) | Devanagari |
| मराठी (Marathi) | Devanagari |
| తెలుగు (Telugu) | Telugu |
| தமிழ் (Tamil) | Tamil |
| বাংলা (Bengali) | Bengali |
| ગુજરાતી (Gujarati) | Gujarati |
| ਪੰਜਾਬੀ (Punjabi) | Gurmukhi |
| ಕನ್ನಡ (Kannada) | Kannada |

## Features

- **Floating keyboard button** — always visible, drag it anywhere on screen, snaps to the nearest edge
- **Virtual keyboard** — full layout with Shift, Backspace, Space, and Enter support
- **Language selector** — clean dropdown to switch between 7 languages instantly
- **Draggable & resizable panel** — move the keyboard anywhere, resize it by dragging the corner
- **Persistent state** — remembers your last language, panel position, and panel size across pages
- **Works everywhere** — inputs, textareas, contenteditable elements, Gmail, YouTube, and more
- **Framework compatible** — works with React, Vue, Angular apps via native input value setter
- **Clipboard support** — copy typed text with one click, with execCommand fallback
- **Open/close animation** — smooth slide-in/out transitions
- **Active input highlight** — blue outline shows which field is targeted

## Installation

### Chrome / Edge (Developer Mode)
1. Download or clone this repository
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the extension folder

### Firefox
1. Go to `about:debugging` → **This Firefox**
2. Click **Load Temporary Add-on**
3. Select `manifest.json` from the extension folder

## Usage

1. Go to any website with a text field
2. Click the **⌨️ floating button** (bottom-right by default)
3. The keyboard panel opens — select your language from the dropdown
4. Type using the virtual keys
5. Use **📋 Copy** to copy text, **🗑️ Clear** to clear, **✕ Close** to dismiss

### Tips
- Drag the ⌨️ button to reposition it — it snaps to the left or right edge
- Drag the `· · · · ·` handle at the top of the keyboard to move the panel
- Drag the bottom-right corner of the panel to resize it
- Your language choice and panel position are saved automatically

## Permissions

| Permission | Reason |
|---|---|
| `activeTab` | Interact with the current tab |
| `clipboardWrite` | Copy text to clipboard |
| `storage` | Save language preference and panel position |
| `<all_urls>` | Work on any website |

## Project Structure

```
├── manifest.json      # Extension manifest (MV3)
├── content.js         # All keyboard logic injected into pages
├── styles.css         # All UI styles (injected as content script CSS)
├── popup.html         # Extension popup
├── icon16.png
├── icon48.png
├── icon128.png
└── LICENSE
```

## Adding a New Language

1. Open `content.js`
2. Add a new entry to the `LAYOUTS` object:
```js
yourlang: {
  name: 'Display Name',
  normal: [/* rows of keys */],
  shift:  [/* rows of keys in shift state */]
}
```
3. Each row is an array of key strings. Use `'←'`, `'Enter'`, `'Shift'`, `'Space'` for special keys.

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Firefox 109+

## Contributing

Contributions are welcome. Feel free to open issues or pull requests for:
- New language layouts
- Bug fixes
- UI improvements

## Images
<img width="953" height="445" alt="extenction1" src="https://github.com/user-attachments/assets/50929bc6-bb1d-4666-9a11-7657f20998ba" />

<img width="647" height="299" alt="extenction2" src="https://github.com/user-attachments/assets/9e9a68a5-26c1-4bb1-9be5-28767c6623c1" />



## License

MIT — see [LICENSE](LICENSE)
