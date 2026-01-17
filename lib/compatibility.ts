// Framework-language compatibility matrix and validation

export type Framework = 'selenium' | 'cypress' | 'playwright';
export type Language = 'java' | 'python' | 'csharp' | 'javascript' | 'typescript' | 'ruby';

export interface FrameworkLanguageMap {
    [key: string]: Language[];
}

/**
 * Defines which languages are supported by each framework
 */
export const FRAMEWORK_LANGUAGES: FrameworkLanguageMap = {
    selenium: ['java', 'python', 'csharp', 'javascript', 'ruby'],
    cypress: ['javascript', 'typescript'],
    playwright: ['javascript', 'typescript', 'python', 'java', 'csharp'],
};

/**
 * Framework display names for UI
 */
export const FRAMEWORK_NAMES: Record<Framework, string> = {
    selenium: 'Selenium WebDriver',
    cypress: 'Cypress',
    playwright: 'Playwright',
};

/**
 * Language display names for UI
 */
export const LANGUAGE_NAMES: Record<Language, string> = {
    java: 'Java',
    python: 'Python',
    csharp: 'C#',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    ruby: 'Ruby',
};

/**
 * Check if a framework-language combination is valid
 */
export function isValidCombination(framework: Framework, language: Language): boolean {
    return FRAMEWORK_LANGUAGES[framework]?.includes(language) ?? false;
}

/**
 * Get available languages for a specific framework
 */
export function getAvailableLanguages(framework: Framework): Language[] {
    return FRAMEWORK_LANGUAGES[framework] || [];
}

/**
 * Get all supported frameworks
 */
export function getAllFrameworks(): Framework[] {
    return Object.keys(FRAMEWORK_LANGUAGES) as Framework[];
}

/**
 * Get all supported languages
 */
export function getAllLanguages(): Language[] {
    return ['java', 'python', 'csharp', 'javascript', 'typescript', 'ruby'];
}

/**
 * Get Monaco editor language ID for syntax highlighting
 */
export function getMonacoLanguage(language: Language): string {
    const monacoMap: Record<Language, string> = {
        java: 'java',
        python: 'python',
        csharp: 'csharp',
        javascript: 'javascript',
        typescript: 'typescript',
        ruby: 'ruby',
    };
    return monacoMap[language] || 'plaintext';
}
