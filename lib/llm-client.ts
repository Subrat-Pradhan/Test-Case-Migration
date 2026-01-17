// Google Gemini API client for code conversion

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Framework, Language } from './compatibility';
import { generateConversionPrompt, getSystemMessage } from './prompts';

export interface ConversionOptions {
    sourceCode: string;
    sourceFramework: Framework;
    sourceLanguage: Language;
    targetFramework: Framework;
    targetLanguage: Language;
    apiKey: string;
    model?: string;
    onProgress?: (chunk: string) => void;
}

export interface ConversionResult {
    convertedCode: string;
    tokensUsed?: number;
    error?: string;
}

export interface GeminiModel {
    name: string;
    version: string;
    displayName: string;
}

/**
 * Available Gemini models
 */
export const GEMINI_MODELS: GeminiModel[] = [
    { name: 'gemini-2.5-pro-latest', version: 'v1beta', displayName: 'Gemini 2.5 Pro (Latest)' },
    { name: 'gemini-2.5-flash', version: 'v1beta', displayName: 'Gemini 2.5 Flash' },
    { name: 'gemini-pro', version: 'v1', displayName: 'Gemini Pro' },
    { name: 'gemini-1.5-flash', version: 'v1beta', displayName: 'Gemini 1.5 Flash' },
];

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Convert code using Google Gemini API with retry logic
 */
export async function convertCode(
    options: ConversionOptions
): Promise<ConversionResult> {
    const {
        sourceCode,
        sourceFramework,
        sourceLanguage,
        targetFramework,
        targetLanguage,
        apiKey,
        model = 'gemini-2.5-flash', // Default to fastest model
        onProgress,
    } = options;

    if (!apiKey) {
        return {
            convertedCode: '',
            error: 'API key is required',
        };
    }

    const maxRetries = 3;
    let lastError: any = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const genModel = genAI.getGenerativeModel({
                model: model,
                generationConfig: {
                    temperature: 0.2,
                    maxOutputTokens: 8192,
                },
            });

            const prompt = generateConversionPrompt(
                sourceCode,
                sourceFramework,
                sourceLanguage,
                targetFramework,
                targetLanguage
            );

            const systemInstruction = getSystemMessage();
            const fullPrompt = `${systemInstruction}\n\n${prompt}`;

            const result = await genModel.generateContentStream(fullPrompt);

            let convertedCode = '';

            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                convertedCode += chunkText;

                if (onProgress) {
                    onProgress(chunkText);
                }
            }

            // Clean up the output - remove markdown code blocks if present
            convertedCode = cleanCodeOutput(convertedCode);

            return {
                convertedCode,
            };
        } catch (error: any) {
            lastError = error;
            console.error(`Conversion attempt ${attempt + 1} failed:`, error);

            // Check if it's a rate limit error (429)
            const is429Error = error.message?.includes('429') ||
                error.message?.includes('Too Many Requests') ||
                error.message?.includes('RESOURCE_EXHAUSTED') ||
                error.status === 429;

            if (is429Error && attempt < maxRetries - 1) {
                // Exponential backoff: 2s, 4s, 8s
                const delayMs = Math.pow(2, attempt + 1) * 1000;
                console.log(`Rate limit hit. Retrying in ${delayMs / 1000}s...`);

                if (onProgress) {
                    onProgress(`\n\n⏳ Rate limit reached. Retrying in ${delayMs / 1000} seconds...\n\n`);
                }

                await sleep(delayMs);
                continue;
            }

            // If not a rate limit error or we've exhausted retries, break
            break;
        }
    }

    // All retries failed
    const errorMessage = getErrorMessage(lastError);
    return {
        convertedCode: '',
        error: errorMessage,
    };
}

/**
 * Get user-friendly error message
 */
function getErrorMessage(error: any): string {
    const message = error?.message || '';

    if (message.includes('429') || message.includes('Too Many Requests') || message.includes('RESOURCE_EXHAUSTED') || error?.status === 429) {
        return 'Rate limit exceeded. Please wait a few minutes before trying again. Consider upgrading your API plan for higher limits.';
    }

    if (message.includes('API key') || message.includes('API_KEY_INVALID')) {
        return 'Invalid API key. Please check your Google Gemini API key.';
    }

    if (message.includes('quota') || message.includes('QUOTA_EXCEEDED')) {
        return 'API quota exceeded. Please check your Google Cloud billing or wait until quota resets.';
    }

    if (message.includes('not found') || message.includes('model')) {
        return 'Model not available. Please try a different model or check your API access.';
    }

    return message || 'Failed to convert code. Please try again.';
}

/**
 * Clean up LLM output to extract only code
 */
function cleanCodeOutput(output: string): string {
    // Remove markdown code blocks
    let cleaned = output.replace(/```[\w]*\n/g, '').replace(/```$/g, '');

    // Trim whitespace
    cleaned = cleaned.trim();

    return cleaned;
}

/**
 * Validate API key format (Gemini keys start with 'AIza')
 */
export function validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('AIza') && apiKey.length > 20;
}

/**
 * Test API connection
 */
export async function testApiConnection(apiKey: string): Promise<boolean> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Make a minimal API call to test connection
        await model.generateContent('test');

        return true;
    } catch (error) {
        console.error('API connection test failed:', error);
        return false;
    }
}
