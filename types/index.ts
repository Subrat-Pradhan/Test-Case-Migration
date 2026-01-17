// TypeScript type definitions

export interface ConversionState {
    sourceFramework: string;
    sourceLanguage: string;
    targetFramework: string;
    targetLanguage: string;
    sourceCode: string;
    convertedCode: string;
    isConverting: boolean;
    error: string | null;
    warnings: string[];
}

export interface PresetConversion {
    id: string;
    label: string;
    sourceFramework: string;
    sourceLanguage: string;
    targetFramework: string;
    targetLanguage: string;
}

export const CONVERSION_PRESETS: PresetConversion[] = [
    {
        id: 'selenium-java-to-playwright-ts',
        label: 'Selenium Java → Playwright TS',
        sourceFramework: 'selenium',
        sourceLanguage: 'java',
        targetFramework: 'playwright',
        targetLanguage: 'typescript',
    },
    {
        id: 'selenium-python-to-playwright-python',
        label: 'Selenium Python → Playwright Python',
        sourceFramework: 'selenium',
        sourceLanguage: 'python',
        targetFramework: 'playwright',
        targetLanguage: 'python',
    },
    {
        id: 'cypress-js-to-playwright-ts',
        label: 'Cypress JS → Playwright TS',
        sourceFramework: 'cypress',
        sourceLanguage: 'javascript',
        targetFramework: 'playwright',
        targetLanguage: 'typescript',
    },
    {
        id: 'playwright-ts-to-cypress-ts',
        label: 'Playwright TS → Cypress TS',
        sourceFramework: 'playwright',
        sourceLanguage: 'typescript',
        targetFramework: 'cypress',
        targetLanguage: 'typescript',
    },
    {
        id: 'selenium-csharp-to-playwright-csharp',
        label: 'Selenium C# → Playwright C#',
        sourceFramework: 'selenium',
        sourceLanguage: 'csharp',
        targetFramework: 'playwright',
        targetLanguage: 'csharp',
    },
];
