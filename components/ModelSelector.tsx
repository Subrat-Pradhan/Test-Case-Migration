'use client';

import { useState } from 'react';
import { GEMINI_MODELS, GeminiModel } from '@/lib/llm-client';

interface ModelSelectorProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
    disabled?: boolean;
}

export default function ModelSelector({
    selectedModel,
    onModelChange,
    disabled = false,
}: ModelSelectorProps) {
    return (
        <div className="glass-light rounded-xl p-4">
            <label className="text-sm font-bold text-gray-800 mb-2 block">
                🤖 AI Model
            </label>
            <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                disabled={disabled}
                className="w-full px-4 py-2 glass rounded-lg text-gray-800 font-semibold
                   focus:ring-2 focus:ring-purple-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 text-sm"
            >
                {GEMINI_MODELS.map((model) => (
                    <option key={model.name} value={model.name}>
                        {model.displayName}
                    </option>
                ))}
            </select>
            <p className="text-xs text-gray-600 mt-2 font-medium">
                Recommended: Gemini 2.5 Flash for speed, Gemini 2.5 Pro for accuracy
            </p>
        </div>
    );
}
