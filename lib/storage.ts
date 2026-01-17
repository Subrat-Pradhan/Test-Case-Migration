// localStorage utilities for API key and preferences

const API_KEY_STORAGE_KEY = 'test-migration-api-key';
const PREFERENCES_STORAGE_KEY = 'test-migration-preferences';

export interface UserPreferences {
    theme?: 'light' | 'dark';
    editorFontSize?: number;
    autoFormat?: boolean;
    lastSourceFramework?: string;
    lastSourceLanguage?: string;
    lastTargetFramework?: string;
    lastTargetLanguage?: string;
}

/**
 * Save API key to localStorage
 */
export function saveApiKey(apiKey: string): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    } catch (error) {
        console.error('Failed to save API key:', error);
    }
}

/**
 * Get API key from localStorage
 */
export function getApiKey(): string | null {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(API_KEY_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to get API key:', error);
        return null;
    }
}

/**
 * Clear API key from localStorage
 */
export function clearApiKey(): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear API key:', error);
    }
}

/**
 * Save user preferences to localStorage
 */
export function savePreferences(preferences: UserPreferences): void {
    if (typeof window === 'undefined') return;
    try {
        const existing = getPreferences();
        const updated = { ...existing, ...preferences };
        localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Failed to save preferences:', error);
    }
}

/**
 * Get user preferences from localStorage
 */
export function getPreferences(): UserPreferences {
    if (typeof window === 'undefined') return {};
    try {
        const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to get preferences:', error);
        return {};
    }
}

/**
 * Clear all stored data
 */
export function clearAllData(): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
        localStorage.removeItem(PREFERENCES_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear data:', error);
    }
}
