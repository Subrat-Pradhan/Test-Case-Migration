// Auto-detect framework and language from source code

import { Framework, Language } from './compatibility';

interface DetectionResult {
    framework: Framework | null;
    language: Language | null;
    confidence: number;
}

/**
 * Detect framework from code patterns
 */
export function detectFramework(code: string): Framework | null {
    const patterns = {
        selenium: [
            /WebDriver/,
            /driver\.findElement/,
            /driver\.get\(/,
            /new ChromeDriver/,
            /new FirefoxDriver/,
            /@Test/,
            /from selenium import/,
            /using OpenQA\.Selenium/,
        ],
        cypress: [
            /cy\./,
            /Cypress\./,
            /cypress/i,
            /describe\(['"].*?['"],\s*\(\)\s*=>/,
            /it\(['"].*?['"],\s*\(\)\s*=>/,
        ],
        playwright: [
            /import.*playwright/,
            /from playwright/,
            /page\./,
            /test\(['"].*?['"],/,
            /expect\(page/,
            /browser\.newPage/,
            /@playwright\/test/,
        ],
    };

    let maxMatches = 0;
    let detectedFramework: Framework | null = null;

    for (const [framework, regexList] of Object.entries(patterns)) {
        const matches = regexList.filter(regex => regex.test(code)).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedFramework = framework as Framework;
        }
    }

    return maxMatches >= 2 ? detectedFramework : null;
}

/**
 * Detect programming language from code patterns
 */
export function detectLanguage(code: string): Language | null {
    const patterns = {
        java: [
            /public\s+class/,
            /import\s+org\./,
            /@Test/,
            /@Before/,
            /System\.out\.println/,
            /new\s+\w+\(/,
        ],
        python: [
            /def\s+\w+\(/,
            /import\s+\w+/,
            /from\s+\w+\s+import/,
            /self\./,
            /:\s*$/m,
            /__init__/,
        ],
        csharp: [
            /using\s+System/,
            /namespace\s+\w+/,
            /public\s+void/,
            /\[Test\]/,
            /\[SetUp\]/,
            /var\s+\w+\s*=/,
        ],
        typescript: [
            /:\s*(string|number|boolean|void)/,
            /interface\s+\w+/,
            /type\s+\w+\s*=/,
            /import.*from\s+['"].*['"]/,
            /<.*>/,
            /async\s+\(/,
        ],
        javascript: [
            /function\s+\w+\(/,
            /const\s+\w+\s*=/,
            /let\s+\w+\s*=/,
            /=>\s*{/,
            /require\(/,
            /module\.exports/,
        ],
        ruby: [
            /def\s+\w+/,
            /end$/m,
            /require\s+['"].*['"]/,
            /@\w+/,
            /do\s*\|.*\|/,
            /\.each/,
        ],
    };

    // TypeScript has priority over JavaScript if both match
    const tsMatches = patterns.typescript.filter(regex => regex.test(code)).length;
    if (tsMatches >= 2) {
        return 'typescript';
    }

    let maxMatches = 0;
    let detectedLanguage: Language | null = null;

    for (const [language, regexList] of Object.entries(patterns)) {
        if (language === 'typescript') continue; // Already checked
        const matches = regexList.filter(regex => regex.test(code)).length;
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedLanguage = language as Language;
        }
    }

    return maxMatches >= 2 ? detectedLanguage : null;
}

/**
 * Auto-detect both framework and language from code
 */
export function autoDetect(code: string): DetectionResult {
    const framework = detectFramework(code);
    const language = detectLanguage(code);

    // Calculate confidence based on how many patterns matched
    let confidence = 0;
    if (framework) confidence += 0.5;
    if (language) confidence += 0.5;

    return {
        framework,
        language,
        confidence,
    };
}
