import React from 'react';
import { Share2, RotateCcw, Download } from 'lucide-react';
import { useCalculatorStore } from '../store/calculatorStore';

export function ActionButtons() {
  const { shareResults, reset } = useCalculatorStore();
  
  const handleShare = () => {
    shareResults();
    // Show toast notification (could add a toast library later)
    alert('Results copied to clipboard!');
  };
  
  const handleExport = () => {
    // Future enhancement: export to PDF or Excel
    alert('Export feature coming soon!');
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        Share Summary
      </button>
      
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
      
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  );
}