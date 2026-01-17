'use client';

import { useState, useEffect } from 'react';
import FrameworkSelector from '@/components/FrameworkSelector';
import CodeEditor from '@/components/CodeEditor';
import ApiKeyConfig from '@/components/ApiKeyConfig';
import ConversionPresets from '@/components/ConversionPresets';
import OutputControls from '@/components/OutputControls';
import WarningPanel from '@/components/WarningPanel';
import ModelSelector from '@/components/ModelSelector';
import { Framework, Language } from '@/lib/compatibility';
import { autoDetect } from '@/lib/detection';
import { convertCode } from '@/lib/llm-client';
import { getPreferences, savePreferences } from '@/lib/storage';
import { PresetConversion } from '@/types';

export default function Home() {
    // State
    const [apiKey, setApiKey] = useState<string>('');
    const [selectedModel, setSelectedModel] = useState<string>('gemini-2.5-flash');
    const [sourceFramework, setSourceFramework] = useState<Framework>('selenium');
    const [sourceLanguage, setSourceLanguage] = useState<Language>('java');
    const [targetFramework, setTargetFramework] = useState<Framework>('playwright');
    const [targetLanguage, setTargetLanguage] = useState<Language>('typescript');
    const [sourceCode, setSourceCode] = useState<string>('');
    const [convertedCode, setConvertedCode] = useState<string>('');
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [warnings, setWarnings] = useState<string[]>([]);

    // Load preferences on mount
    useEffect(() => {
        const prefs = getPreferences();
        if (prefs.lastSourceFramework) setSourceFramework(prefs.lastSourceFramework as Framework);
        if (prefs.lastSourceLanguage) setSourceLanguage(prefs.lastSourceLanguage as Language);
        if (prefs.lastTargetFramework) setTargetFramework(prefs.lastTargetFramework as Framework);
        if (prefs.lastTargetLanguage) setTargetLanguage(prefs.lastTargetLanguage as Language);
    }, []);

    // Auto-detect framework and language when source code changes
    useEffect(() => {
        if (sourceCode.trim().length > 50) {
            const detected = autoDetect(sourceCode);
            if (detected.framework && detected.confidence > 0.5) {
                setSourceFramework(detected.framework);
            }
            if (detected.language && detected.confidence > 0.5) {
                setSourceLanguage(detected.language);
            }
        }
    }, [sourceCode]);

    // Save preferences when selections change
    useEffect(() => {
        savePreferences({
            lastSourceFramework: sourceFramework,
            lastSourceLanguage: sourceLanguage,
            lastTargetFramework: targetFramework,
            lastTargetLanguage: targetLanguage,
        });
    }, [sourceFramework, sourceLanguage, targetFramework, targetLanguage]);

    const handleConvert = async () => {
        if (!apiKey) {
            setError('Please configure your API key first');
            return;
        }

        if (!sourceCode.trim()) {
            setError('Please enter source code to convert');
            return;
        }

        setIsConverting(true);
        setError(null);
        setWarnings([]);
        setConvertedCode('');

        try {
            const result = await convertCode({
                sourceCode,
                sourceFramework,
                sourceLanguage,
                targetFramework,
                targetLanguage,
                apiKey,
                model: selectedModel,
                onProgress: (chunk) => {
                    setConvertedCode((prev) => prev + chunk);
                },
            });

            if (result.error) {
                setError(result.error);
            } else {
                setConvertedCode(result.convertedCode);

                // Add warnings for complex conversions
                const newWarnings: string[] = [];
                if (sourceCode.includes('PageObject') || sourceCode.includes('BasePage')) {
                    newWarnings.push('Page Object Model detected - please review the converted structure');
                }
                if (sourceCode.length > 1000) {
                    newWarnings.push('Large test file - consider breaking into smaller tests');
                }
                setWarnings(newWarnings);
            }
        } catch (err: any) {
            setError(err.message || 'Conversion failed');
        } finally {
            setIsConverting(false);
        }
    };

    const handlePresetSelect = (preset: PresetConversion) => {
        setSourceFramework(preset.sourceFramework as Framework);
        setSourceLanguage(preset.sourceLanguage as Language);
        setTargetFramework(preset.targetFramework as Framework);
        setTargetLanguage(preset.targetLanguage as Language);
    };

    return (
        <main className="min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-3 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-black gradient-text animate-float">
                        🔄 Test Case Migration Tool
                    </h1>
                    <p className="text-lg text-gray-800 font-semibold glass-light rounded-full px-6 py-2 inline-block">
                        Convert automated tests between Selenium, Cypress, and Playwright with AI-powered accuracy
                    </p>
                </div>

                {/* API Key Configuration */}
                <ApiKeyConfig onApiKeyChange={setApiKey} />

                {/* Model Selection */}
                <div className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
                    <ModelSelector
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
                        disabled={isConverting}
                    />
                </div>

                {/* Quick Presets */}
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <ConversionPresets onPresetSelect={handlePresetSelect} disabled={isConverting} />
                </div>
                {/* Main Conversion Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {/* Source */}
                    <div className="glass-strong rounded-2xl p-6 shadow-xl">
                        <div className="mb-4">
                            <h2 className="text-2xl font-black text-gray-800 mb-4">
                                📝 Source Code
                            </h2>
                            <FrameworkSelector
                                type="source"
                                framework={sourceFramework}
                                language={sourceLanguage}
                                onFrameworkChange={setSourceFramework}
                                onLanguageChange={setSourceLanguage}
                                disabled={isConverting}
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <CodeEditor
                                value={sourceCode}
                                onChange={setSourceCode}
                                language={sourceLanguage}
                                placeholder="Paste your test code here..."
                                height="500px"
                            />
                        </div>
                    </div>

                    {/* Target */}
                    <div className="glass-strong rounded-2xl p-6 shadow-xl">
                        <div className="mb-4">
                            <h2 className="text-2xl font-black text-gray-800 mb-4">
                                ✨ Converted Code
                            </h2>
                            <FrameworkSelector
                                type="target"
                                framework={targetFramework}
                                language={targetLanguage}
                                onFrameworkChange={setTargetFramework}
                                onLanguageChange={setTargetLanguage}
                                disabled={isConverting}
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <CodeEditor
                                value={convertedCode}
                                language={targetLanguage}
                                readOnly
                                placeholder="Converted code will appear here..."
                                height="500px"
                            />
                        </div>
                        <div className="mt-4">
                            <OutputControls code={convertedCode} disabled={isConverting} />
                        </div>
                    </div>
                </div>

                {/* Convert Button */}
                <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <button
                        onClick={handleConvert}
                        disabled={isConverting || !apiKey || !sourceCode.trim()}
                        className="px-10 py-5 btn-glass text-white text-xl font-black rounded-2xl
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-3 shadow-2xl"
                    >
                        {isConverting ? (
                            <>
                                <span className="animate-spin">⚙️</span>
                                <span>Converting...</span>
                            </>
                        ) : (
                            <>
                                <span>🚀</span>
                                <span>Convert Code</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="glass-light rounded-2xl p-4 border-l-4 border-red-400 shadow-lg animate-fade-in">
                        <div className="flex items-start gap-2">
                            <span className="text-red-600 text-xl">❌</span>
                            <div className="text-red-800 font-semibold">
                                <strong>Error:</strong> {error}
                            </div>
                        </div>
                    </div>
                )}

                {/* Warnings */}
                <WarningPanel warnings={warnings} />

                {/* Footer */}
                <div className="text-center text-sm text-gray-800 pt-8 glass-light rounded-2xl p-4 font-medium">
                    <p>
                        Built for professional QA engineers and SDETs. Your API key and code never leave your browser.
                    </p>
                    <p className="mt-2 font-bold">
                        Powered by Google Gemini 2.0 • Open Source • Privacy-First
                    </p>
                </div>
            </div>
        </main>
    );
}
