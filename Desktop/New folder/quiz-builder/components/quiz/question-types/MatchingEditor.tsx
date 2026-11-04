// components/quiz/question-types/MatchingEditor.tsx
import React from 'react';

/**
 * Interface representing a single matching pair (Premise and Target).
 */
interface MatchPair {
  id: string;
  premise: string;
  target: string;
}

/**
 * Props for the MatchingEditor component.
 */
interface MatchingEditorProps {
  questionData: {
    pairs?: MatchPair[];
  };
  onChange: (updatedData: { pairs: MatchPair[] }) => void;
}

export default function MatchingEditor({ questionData, onChange }: MatchingEditorProps) {
  // Fallback to default two pairs if none are provided yet
  const pairs = questionData?.pairs || [
    { id: '1', premise: '', target: '' },
    { id: '2', premise: '', target: '' },
  ];

  /**
   * Handles updating either the premise or the target text for a specific pair ID.
   */
  const handlePairChange = (id: string, field: 'premise' | 'target', value: string) => {
    const updatedPairs = pairs.map((pair) => 
      pair.id === id ? { ...pair, [field]: value } : pair
    );
    onChange({ pairs: updatedPairs });
  };

  /**
   * Adds a brand new blank matching pair row.
   */
  const handleAddPair = () => {
    const newPair = { id: String(pairs.length + 1), premise: '', target: '' };
    onChange({ pairs: [...pairs, newPair] });
  };

  /**
   * Removes an existing matching pair row by its ID.
   */
  const handleRemovePair = (id: string) => {
    const updatedPairs = pairs.filter((pair) => pair.id !== id);
    onChange({ pairs: updatedPairs });
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 border rounded-xl bg-white shadow-sm w-full">
      {/* Section Header */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Matching Pairs Settings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Define premises (left column) and their correct matching targets (right column).
        </p>
      </div>

      <div className="space-y-3">
        {/* Table Headings (Hidden on very small screens, stacked gracefully) */}
        <div className="hidden sm:grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 px-1">
          <div className="col-span-5">Premise (Item)</div>
          <div className="col-span-6">Correct Match (Target)</div>
          <div className="col-span-1"></div>
        </div>

        {/* Dynamic Pairs List */}
        {pairs.map((pair, index) => (
          <div 
            key={pair.id} 
            className="flex flex-col sm:grid sm:grid-cols-12 gap-2 items-stretch sm:items-center p-3 sm:p-0 border sm:border-0 rounded-lg bg-gray-50/50 sm:bg-transparent"
          >
            {/* Premise Input Field */}
            <div className="sm:col-span-5">
              <label className="block sm:hidden text-xs font-medium text-gray-500 mb-1">
                Premise {index + 1}
              </label>
              <input
                type="text"
                value={pair.premise}
                onChange={(e) => handlePairChange(pair.id, 'premise', e.target.value)}
                placeholder={`Premise ${index + 1}`}
                className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Matching Target Input Field */}
            <div className="sm:col-span-6 mt-2 sm:mt-0">
              <label className="block sm:hidden text-xs font-medium text-gray-500 mb-1">
                Matching Target {index + 1}
              </label>
              <input
                type="text"
                value={pair.target}
                onChange={(e) => handlePairChange(pair.id, 'target', e.target.value)}
                placeholder={`Matching target ${index + 1}`}
                className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Remove Action Button */}
            <div className="sm:col-span-1 flex justify-end sm:justify-center mt-2 sm:mt-0">
              {pairs.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemovePair(pair.id)}
                  className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Pair Button */}
      <button
        type="button"
        onClick={handleAddPair}
        className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center"
      >
        + Add Matching Pair
      </button>
    </div>
  );
}