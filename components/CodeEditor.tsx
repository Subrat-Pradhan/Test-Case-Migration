'use client';

import { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Language, getMonacoLanguage } from '@/lib/compatibility';

interface CodeEditorProps {
    value: string;
    onChange?: (value: string) => void;
    language: Language;
    readOnly?: boolean;
    placeholder?: string;
    height?: string;
}

export default function CodeEditor({
    value,
    onChange,
    language,
    readOnly = false,
    placeholder = 'Paste your test code here...',
    height = '400px',
}: CodeEditorProps) {
    const monacoLanguage = getMonacoLanguage(language);

    const handleEditorChange = (value: string | undefined) => {
        if (onChange && value !== undefined) {
            onChange(value);
        }
    };

    return (
        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <Editor
                height={height}
                language={monacoLanguage}
                value={value}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    readOnly,
                    minimap: { enabled: true },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                }}
                loading={
                    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-900">
                        <div className="text-gray-500 dark:text-gray-400">Loading editor...</div>
                    </div>
                }
            />
            {!value && !readOnly && (
                <div className="absolute top-20 left-16 text-gray-400 dark:text-gray-500 pointer-events-none">
                    {placeholder}
                </div>
            )}
        </div>
    );
}
