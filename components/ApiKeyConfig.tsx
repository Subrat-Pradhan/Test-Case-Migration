'use client';

import { useState } from 'react';
import { saveApiKey, getApiKey, clearApiKey } from '@/lib/storage';
import { validateApiKey } from '@/lib/llm-client';

interface ApiKeyConfigProps {
    onApiKeyChange: (apiKey: string) => void;
}

export default function ApiKeyConfig({ onApiKeyChange }: ApiKeyConfigProps) {
    const [apiKey, setApiKey] = useState<string>('');
    const [showKey, setShowKey] = useState(false);
    const [saved, setSaved] = useState(false);

    // Load API key on mount
    useState(() => {
        const stored = getApiKey();
        if (stored) {
            setApiKey(stored);
            onApiKeyChange(stored);
            setSaved(true);
        }
    });

    const handleSave = () => {
        if (!apiKey.trim()) {
            alert('Please enter an API key');
            return;
        }

        if (!validateApiKey(apiKey)) {
            alert('Invalid API key format. Google Gemini keys should start with "AIza"');
            return;
        }

        saveApiKey(apiKey);
        onApiKeyChange(apiKey);
        setSaved(true);
    };

    const handleClear = () => {
        clearApiKey();
        setApiKey('');
        onApiKeyChange('');
        setSaved(false);
    };

    return (
        <div className="glass-strong rounded-2xl p-6 shadow-xl animate-slide-up">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        🔑 API Configuration
                    </h3>
                    <p className="text-sm text-gray-700 mt-1 font-medium">
                        Provide your Google Gemini API key to enable code conversion
                    </p>
                </div>
            </div>

            <div className="glass-light rounded-xl p-4 mb-4 border-l-4 border-amber-400">
                <div className="flex items-start gap-2">
                    <span className="text-amber-600 text-lg">⚠️</span>
                    <div className="text-sm text-gray-800 font-medium">
                        <strong>Privacy Notice:</strong> Your API key is stored only in your browser's local storage
                        and never transmitted to any backend server. All API calls are made directly from your browser
                        to Google Gemini.
                    </div>
                </div>
            </div>

            <div className="glass-light rounded-xl p-4 mb-4 border-l-4 border-blue-400">
                <div className="flex items-start gap-2">
                    <span className="text-blue-600 text-lg">💡</span>
                    <div className="text-sm text-gray-800 font-medium">
                        <strong>Rate Limits:</strong> Free tier has limited requests per minute. If you get a 429 error,
                        wait a few minutes or upgrade to a paid plan for higher limits.
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <input
                            type={showKey ? 'text' : 'password'}
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIza..."
                            className="w-full px-4 py-3 glass rounded-xl text-gray-800 font-medium
                         focus:ring-2 focus:ring-purple-400 transition-all duration-200
                         placeholder-gray-500"
                        />
                        <button
                            onClick={() => setShowKey(!showKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 text-xl"
                        >
                            {showKey ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <button
                        onClick={handleSave}
                        className="px-6 py-3 btn-glass text-white font-bold rounded-xl"
                    >
                        Save
                    </button>

                    {saved && (
                        <button
                            onClick={handleClear}
                            className="px-4 py-3 glass hover:bg-red-100 text-red-600 font-bold rounded-xl
                         transition-all duration-200"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {saved && (
                    <div className="flex items-center gap-2 text-green-700 text-sm font-semibold glass-light rounded-lg px-4 py-2">
                        <span>✓</span>
                        <span>API key saved successfully</span>
                    </div>
                )}

                <div className="text-sm text-gray-700 font-medium">
                    Don't have an API key?{' '}
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-800 font-bold hover:underline"
                    >
                        Get one from Google AI Studio
                    </a>
                    {' • '}
                    <a
                        href="https://ai.google.dev/pricing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-bold hover:underline"
                    >
                        View pricing & limits
                    </a>
                </div>
            </div>
        </div>
    );
}
