'use client';

interface WarningPanelProps {
    warnings: string[];
}

export default function WarningPanel({ warnings }: WarningPanelProps) {
    if (warnings.length === 0) return null;

    return (
        <div className="glass-light rounded-2xl p-4 border-l-4 border-amber-400 shadow-lg animate-fade-in">
            <div className="flex items-start gap-3">
                <span className="text-amber-600 text-xl">⚠️</span>
                <div className="flex-1">
                    <h4 className="font-bold text-amber-800 mb-2">
                        Conversion Warnings
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-800 font-medium">
                        {warnings.map((warning, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="mt-1">•</span>
                                <span>{warning}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
