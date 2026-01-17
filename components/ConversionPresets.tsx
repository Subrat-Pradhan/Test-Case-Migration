'use client';

import { Framework, Language } from '@/lib/compatibility';
import { CONVERSION_PRESETS, PresetConversion } from '@/types';

interface ConversionPresetsProps {
    onPresetSelect: (preset: PresetConversion) => void;
    disabled?: boolean;
}

export default function ConversionPresets({
    onPresetSelect,
    disabled = false,
}: ConversionPresetsProps) {
    return (
        <div className="glass-strong rounded-2xl p-6 shadow-xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                ⚡ Quick Presets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {CONVERSION_PRESETS.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => onPresetSelect(preset)}
                        disabled={disabled}
                        className="px-4 py-3 btn-glass text-white font-bold rounded-xl
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-sm transform transition-all duration-200"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>

            <p className="text-xs text-gray-700 mt-4 font-medium">
                Click a preset to quickly set up a common conversion path
            </p>
        </div>
    );
}
