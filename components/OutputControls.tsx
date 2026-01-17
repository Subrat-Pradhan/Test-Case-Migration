'use client';

import { useState } from 'react';

interface OutputControlsProps {
    code: string;
    onFormat?: () => void;
    disabled?: boolean;
}

export default function OutputControls({
    code,
    onFormat,
    disabled = false,
}: OutputControlsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-test.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex items-center gap-2 justify-end">
            <button
                onClick={handleCopy}
                disabled={disabled || !code}
                className="px-4 py-2 glass hover:bg-green-100 text-green-700 font-bold rounded-xl
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-2 shadow-lg"
            >
                {copied ? (
                    <>
                        <span>✓</span>
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <span>📋</span>
                        <span>Copy Code</span>
                    </>
                )}
            </button>

            <button
                onClick={handleDownload}
                disabled={disabled || !code}
                className="px-4 py-2 glass hover:bg-blue-100 text-blue-700 font-bold rounded-xl
                   transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center gap-2 shadow-lg"
            >
                <span>⬇️</span>
                <span>Download</span>
            </button>
        </div>
    );
}
