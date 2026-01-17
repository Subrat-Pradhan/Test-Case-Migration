'use client';

import { useState, useEffect } from 'react';
import {
    Framework,
    Language,
    getAllFrameworks,
    getAvailableLanguages,
    isValidCombination,
    FRAMEWORK_NAMES,
    LANGUAGE_NAMES,
} from '@/lib/compatibility';

interface FrameworkSelectorProps {
    type: 'source' | 'target';
    framework: Framework;
    language: Language;
    onFrameworkChange: (framework: Framework) => void;
    onLanguageChange: (language: Language) => void;
    disabled?: boolean;
}

export default function FrameworkSelector({
    type,
    framework,
    language,
    onFrameworkChange,
    onLanguageChange,
    disabled = false,
}: FrameworkSelectorProps) {
    const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);

    useEffect(() => {
        const languages = getAvailableLanguages(framework);
        setAvailableLanguages(languages);

        // If current language is not available, select the first available one
        if (!languages.includes(language) && languages.length > 0) {
            onLanguageChange(languages[0]);
        }
    }, [framework, language, onLanguageChange]);

    const handleFrameworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFrameworkChange(e.target.value as Framework);
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onLanguageChange(e.target.value as Language);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-800">
                    {type === 'source' ? 'Source' : 'Target'} Framework
                </label>
            </div>

            <select
                value={framework}
                onChange={handleFrameworkChange}
                disabled={disabled}
                className="w-full px-4 py-3 glass rounded-xl text-gray-800 font-semibold
                   focus:ring-2 focus:ring-purple-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
            >
                {getAllFrameworks().map((fw) => (
                    <option key={fw} value={fw}>
                        {FRAMEWORK_NAMES[fw]}
                    </option>
                ))}
            </select>

            <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-800">
                    Language
                </label>
            </div>

            <select
                value={language}
                onChange={handleLanguageChange}
                disabled={disabled}
                className="w-full px-4 py-3 glass rounded-xl text-gray-800 font-semibold
                   focus:ring-2 focus:ring-purple-400
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
            >
                {availableLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                        {LANGUAGE_NAMES[lang]}
                    </option>
                ))}
            </select>
        </div>
    );
}
