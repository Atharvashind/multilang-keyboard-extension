# MultiLang Keyboard Extension

A browser extension that enables typing in multiple Indian languages (Hindi, Marathi, Telugu, Tamil, Bengali) plus English on any website using a virtual keyboard interface.

## Features

- **Virtual Keyboard**: Click the floating keyboard icon (⌨️) that appears on text input fields
- **Multi-Language Support**: Switch between 6 languages instantly
- **Intuitive Interface**: Visual keyboard with proper layouts for each language
- **Text Manipulation**: Backspace, Enter, Space, Shift functionality
- **Clipboard Integration**: Copy text to clipboard directly from the keyboard
- **Clear Function**: Quickly clear all text in the input field
- **Responsive Design**: Works on any website with text inputs

## Supported Languages

- 🇺🇸 English
- 🇮🇳 हिन्दी (Hindi)
- 🇮🇳 मराठी (Marathi)
- 🇮🇳 తెలుగు (Telugu)
- 🇮🇳 தமிழ் (Tamil)
- 🇮🇳 বাংলা (Bengali)

## Installation

### Chrome/Edge
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will be installed and ready to use

### Firefox
1. Download or clone this repository
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" in the sidebar
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension folder
6. The extension will be temporarily installed

## Usage

1. Navigate to any website with text input fields
2. Click on a text input (input, textarea, or contenteditable element)
3. A floating keyboard button (⌨️) will appear in the bottom-right corner
4. Click the keyboard button to open the virtual keyboard
5. Select your desired language from the top row
6. Type using the virtual keys
7. Use special keys:
   - **Shift**: Toggle uppercase/lowercase
   - **←**: Backspace
   - **Enter**: New line
   - **␣**: Space
   - **📋 Copy**: Copy text to clipboard
   - **🗑️ Clear**: Clear all text
   - **✕ Close**: Close keyboard

## Permissions

The extension requires the following permissions:
- `activeTab`: To interact with the current tab
- `clipboardWrite`: To copy text to clipboard
- `<all_urls>`: To work on any website

## Files Structure

- `manifest.json`: Extension manifest file
- `content.js`: Main extension logic and keyboard implementation
- `popup.html`: Extension popup interface
- `styles.css`: Additional styling

## Development

To modify the extension:
1. Make changes to the source files
2. Reload the extension in the browser's extension manager
3. Test on various websites

### Adding New Languages

To add support for additional languages:
1. Add a new layout object in `LAYOUTS` in `content.js`
2. Define `normal` and `shift` key arrays
3. Update the language selection buttons

## Browser Compatibility

- Chrome 88+
- Edge 88+
- Firefox 109+ (with manifest v3 support)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is open source. Please check the license file for details.