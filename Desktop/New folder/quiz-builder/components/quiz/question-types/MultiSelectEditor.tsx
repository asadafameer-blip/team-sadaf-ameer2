// components/quiz/question-types/MultiSelectEditor.tsx
import React from 'react';

/**
 * Interface representing a single choice option in a multi-select question.
 */
interface Option {
  id: string;
  text: string;
}

/**
 * Props for the MultiSelectEditor component.
 */
interface MultiSelectEditorProps {
  questionData: {
    options?: Option[];
    correctAnswers?: string[];
  };
  onChange: (updatedData: { options: Option[]; correctAnswers: string[] }) => void;
}

export default function MultiSelectEditor({ questionData, onChange }: MultiSelectEditorProps) {
  // Fallback default options and correct answers array if none exist yet
  const options = questionData?.options || [
    { id: 'a', text: '' },
    { id: 'b', text: '' },
    { id: 'c', text: '' },
  ];
  const correctAnswers = questionData?.correctAnswers || [];

  /**
   * Updates the option text for a specific option ID.
   */
  const handleOptionChange = (id: string, text: string) => {
    const updatedOptions = options.map((opt) => (opt.id === id ? { ...opt, text } : opt));
    onChange({ options: updatedOptions, correctAnswers });
  };

  /**
   * Toggles a checkbox option on or off for correct answer validation.
   */
  const handleToggleCorrect = (id: string) => {
    const isCorrect = correctAnswers.includes(id);
    const updatedCorrect = isCorrect
      ? correctAnswers.filter((ansId) => ansId !== id)
      : [...correctAnswers, id];
    
    onChange({ options, correctAnswers: updatedCorrect });
  };

  /**
   * Dynamically adds a new option with the next sequential character ID (a, b, c, d...).
   */
  const handleAddOption = () => {
    const newId = String.fromCharCode(97 + options.length);
    const updatedOptions = [...options, { id: newId, text: '' }];
    
    onChange({ options: updatedOptions, correctAnswers });
  };

  /**
   * Removes an option by its ID and filters it out from correct answers if present.
   */
  const handleRemoveOption = (id: string) => {
    const updatedOptions = options.filter((opt) => opt.id !== id);
    const updatedCorrect = correctAnswers.filter((ansId) => ansId !== id);
    
    onChange({ options: updatedOptions, correctAnswers: updatedCorrect });
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 border rounded-xl bg-white shadow-sm w-full">
      {/* Section Header */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Multi-Select Question Settings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Check all options that apply as correct answers. Multiple selections are permitted.
        </p>
      </div>

      {/* Options & Checkboxes List */}
      <div className="space-y-3">
        <label className="block text-xs sm:text-sm font-medium text-gray-600">Options & Correct Answers</label>
        
        {options.map((option) => (
          <div 
            key={option.id} 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 border sm:border-0 rounded-lg bg-gray-50/50 sm:bg-transparent"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Checkbox for selecting multiple correct answers */}
              <input
                type="checkbox"
                checked={correctAnswers.includes(option.id)}
                onChange={() => handleToggleCorrect(option.id)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                title="Toggle as correct answer"
              />
              <span className="text-sm font-bold uppercase text-gray-500 w-5">{option.id}.</span>
              
              {/* Option Text Input */}
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder={`Option ${option.id.toUpperCase()}`}
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Remove Option Button */}
            <div className="flex justify-end sm:justify-center">
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(option.id)}
                  className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Option Button */}
      <button
        type="button"
        onClick={handleAddOption}
        className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center"
      >
        + Add Option
      </button>
    </div>
  );
}