// LLM prompt templates for code conversion

import { Framework, Language, FRAMEWORK_NAMES, LANGUAGE_NAMES } from './compatibility';

/**
 * Generate conversion prompt for LLM
 */
export function generateConversionPrompt(
    sourceCode: string,
    sourceFramework: Framework,
    sourceLanguage: Language,
    targetFramework: Framework,
    targetLanguage: Language
): string {
    const sourceFrameworkName = FRAMEWORK_NAMES[sourceFramework];
    const targetFrameworkName = FRAMEWORK_NAMES[targetFramework];
    const sourceLangName = LANGUAGE_NAMES[sourceLanguage];
    const targetLangName = LANGUAGE_NAMES[targetLanguage];

    const frameworkSpecificRules = getFrameworkSpecificRules(
        sourceFramework,
        targetFramework,
        targetLanguage
    );

    return `You are an expert test automation engineer specializing in ${sourceFrameworkName}, ${targetFrameworkName}, and modern testing best practices.

**TASK**: Convert the following ${sourceFrameworkName} ${sourceLangName} test code to ${targetFrameworkName} ${targetLangName}.

**CRITICAL RULES**:
1. Use ONLY modern, current syntax (no deprecated APIs)
2. Follow official ${targetFrameworkName} best practices
3. Use idiomatic ${targetLangName} code style
4. Preserve all test logic and assertions
5. Convert waits to native ${targetFrameworkName} patterns
6. Use appropriate locator strategies for ${targetFrameworkName}
7. Maintain proper async/await handling
8. Keep test structure and organization
9. Output ONLY the converted code - NO explanations, comments, or markdown

**FRAMEWORK-SPECIFIC RULES**:
${frameworkSpecificRules}

**SOURCE CODE**:
\`\`\`${sourceLanguage}
${sourceCode}
\`\`\`

**CONVERTED CODE** (output ONLY code, no markdown, no explanations):`;
}

/**
 * Get framework-specific conversion rules
 */
function getFrameworkSpecificRules(
    sourceFramework: Framework,
    targetFramework: Framework,
    targetLanguage: Language
): string {
    const rules: string[] = [];

    // Selenium → Playwright
    if (sourceFramework === 'selenium' && targetFramework === 'playwright') {
        rules.push('- Convert WebDriver methods to Playwright page methods');
        rules.push('- Replace explicit waits with expect() assertions (auto-waiting)');
        rules.push('- Use page.locator() with best-practice selectors');
        rules.push('- Convert driver.findElement() to page.locator()');
        rules.push('- Use test() instead of @Test annotations');
        if (targetLanguage === 'typescript' || targetLanguage === 'javascript') {
            rules.push('- Import from @playwright/test');
            rules.push('- Use async/await for all page interactions');
        }
    }

    // Selenium → Cypress
    if (sourceFramework === 'selenium' && targetFramework === 'cypress') {
        rules.push('- Convert WebDriver commands to cy.* commands');
        rules.push('- Remove all explicit waits (Cypress auto-waits)');
        rules.push('- Use cy.get() for element selection');
        rules.push('- Convert assertions to .should() syntax');
        rules.push('- Use describe() and it() for test structure');
        rules.push('- Remove async/await (Cypress handles it automatically)');
    }

    // Cypress → Playwright
    if (sourceFramework === 'cypress' && targetFramework === 'playwright') {
        rules.push('- Convert cy.* commands to page.* methods');
        rules.push('- Convert .should() assertions to expect()');
        rules.push('- Add async/await to test functions');
        rules.push('- Import test and expect from @playwright/test');
        rules.push('- Use page fixture in test functions');
        rules.push('- Convert cy.visit() to page.goto()');
    }

    // Playwright → Cypress
    if (sourceFramework === 'playwright' && targetFramework === 'cypress') {
        rules.push('- Convert page.* methods to cy.* commands');
        rules.push('- Convert expect() to .should() assertions');
        rules.push('- Remove async/await (not needed in Cypress)');
        rules.push('- Remove page fixture parameter');
        rules.push('- Convert page.goto() to cy.visit()');
    }

    // Playwright → Selenium
    if (sourceFramework === 'playwright' && targetFramework === 'selenium') {
        rules.push('- Convert page.* methods to WebDriver commands');
        rules.push('- Add explicit waits using WebDriverWait');
        rules.push('- Use driver.findElement() for locators');
        rules.push('- Add proper driver initialization and teardown');
        if (targetLanguage === 'java') {
            rules.push('- Use @Test, @Before, @After annotations');
            rules.push('- Add proper exception handling');
        }
    }

    // Cypress → Selenium
    if (sourceFramework === 'cypress' && targetFramework === 'selenium') {
        rules.push('- Convert cy.* commands to WebDriver methods');
        rules.push('- Add explicit waits for element visibility');
        rules.push('- Use driver.findElement() for selectors');
        rules.push('- Add driver setup and teardown');
        rules.push('- Convert .should() to appropriate assertions');
    }

    // Language-specific rules
    if (targetLanguage === 'typescript') {
        rules.push('- Add proper type annotations');
        rules.push('- Use interfaces for complex objects');
    }

    if (targetLanguage === 'java') {
        rules.push('- Use proper Java naming conventions (camelCase for methods)');
        rules.push('- Add appropriate imports');
        rules.push('- Use proper exception handling');
    }

    if (targetLanguage === 'python') {
        rules.push('- Use snake_case for function names');
        rules.push('- Follow PEP 8 style guidelines');
        rules.push('- Use proper Python imports');
    }

    if (targetLanguage === 'csharp') {
        rules.push('- Use PascalCase for method names');
        rules.push('- Add proper using statements');
        rules.push('- Use [Test] attributes for test methods');
    }

    return rules.join('\n');
}

/**
 * Generate system message for the LLM
 */
export function getSystemMessage(): string {
    return `You are an expert test automation engineer with deep knowledge of Selenium WebDriver, Cypress, and Playwright frameworks. You specialize in converting test code between frameworks while maintaining best practices and idiomatic code style. You always output clean, production-ready code without explanations.`;
}
