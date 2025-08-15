import React from 'react';
import { Info } from 'lucide-react';

interface InputCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function InputCard({ title, children, className = '' }: InputCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'currency' | 'percentage';
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  tooltip?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'number',
  suffix,
  min,
  max,
  step = 1,
  tooltip
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  const formatValue = (val: number) => {
    if (type === 'currency') return val.toFixed(2);
    if (type === 'percentage') return val.toFixed(2);
    return val.toString();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {tooltip && (
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {type === 'currency' && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
        )}
        <input
          type="number"
          value={formatValue(value)}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            type === 'currency' ? 'pl-8' : ''
          }`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  tooltip?: string;
}

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix = '%',
  tooltip
}: SliderFieldProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {tooltip && (
            <div className="group relative">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-blue-600">
          {value.toFixed(1)}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}{suffix}</span>
        <span>{max}{suffix}</span>
      </div>
    </div>
  );
}