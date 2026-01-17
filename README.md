# Test Case Migration Tool

A powerful browser-based tool for converting automated test code between Selenium WebDriver, Cypress, and Playwright frameworks with AI-powered accuracy.

## 🚀 Features

- **Multi-Framework Support**: Convert between Selenium, Cypress, and Playwright
- **Multi-Language Support**: Java, Python, C#, JavaScript, TypeScript, Ruby
- **Intelligent Auto-Detection**: Automatically detects framework and language from pasted code
- **AI-Powered Conversion**: Uses Google Gemini 2.0 for accurate, idiomatic code conversion
- **Privacy-First**: Your API key and code never leave your browser
- **Modern Glassmorphism UI**: Beautiful bright design with blur effects and vibrant gradients
- **Monaco Editor**: Professional code editing experience with syntax highlighting
- **Quick Presets**: One-click conversion for common migration paths

## 🛠️ Supported Conversions

### Framework-Language Matrix

| Framework | Supported Languages |
|-----------|-------------------|
| **Selenium WebDriver** | Java, Python, C#, JavaScript, Ruby |
| **Cypress** | JavaScript, TypeScript |
| **Playwright** | JavaScript, TypeScript, Python, Java, C# |

### Common Migration Paths

- Selenium Java → Playwright TypeScript
- Selenium Python → Playwright Python
- Cypress JavaScript → Playwright TypeScript
- Playwright TypeScript → Cypress TypeScript
- Selenium C# → Playwright C#

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

## 🏃 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Test-Case-Migration
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Configure your API key**
   - Enter your Google Gemini API key in the configuration panel
   - Your key is stored securely in browser localStorage only

## 💡 How to Use

1. **Enter API Key**: Configure your Google Gemini API key in the configuration panel
2. **Select**: Choose source/target frameworks and languages (or use quick presets)
3. **Paste**: Add your test code in the left editor
4. **Convert**: Click the convert button
5. **Copy**: Use the copy/download buttons for the converted code

The application is ready for professional use by QA engineers and SDETs!

## 🔒 Privacy & Security

- **Client-Side Only**: All processing happens in your browser
- **No Backend**: No server, database, or external storage
- **API Key Security**: Stored only in browser localStorage
- **Direct API Calls**: Communicates directly with OpenAI from your browser

## 🏗️ Project Structure

```
test-case-migration/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main application page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── FrameworkSelector.tsx
│   ├── CodeEditor.tsx
│   ├── ApiKeyConfig.tsx
│   ├── ConversionPresets.tsx
│   ├── OutputControls.tsx
│   └── WarningPanel.tsx
├── lib/                   # Core libraries
│   ├── compatibility.ts   # Framework-language matrix
│   ├── detection.ts       # Auto-detection logic
│   ├── llm-client.ts      # OpenAI API client
│   ├── prompts.ts         # Conversion prompts
│   └── storage.ts         # localStorage utilities
└── types/                 # TypeScript definitions
    └── index.ts
```

## 🧪 Conversion Capabilities

The tool intelligently converts:

- **Browser Setup**: Driver initialization, browser configuration
- **Locators**: CSS selectors, XPath, ID, role-based selectors
- **User Interactions**: Click, type, keyboard/mouse actions, file uploads
- **Wait Strategies**: Explicit waits, implicit waits, auto-waiting
- **Assertions**: Framework-specific assertion patterns
- **Test Structure**: Hooks, test blocks, suite organization

## 🎯 Best Practices

- Review converted code before using in production
- Test converted code thoroughly
- Page Object Models may require manual adjustment
- Custom helper functions should be reviewed
- Framework-specific plugins need manual migration

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ for QA Engineers and SDETs • Powered by Google Gemini 2.0