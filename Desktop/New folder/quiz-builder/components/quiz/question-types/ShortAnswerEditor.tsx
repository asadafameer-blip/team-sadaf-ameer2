// components/quiz/question-types/ShortAnswerEditor.tsx
import React from 'react';

/**
 * Props for the ShortAnswerEditor component.
 */
interface ShortAnswerEditorProps {
  questionData: {
    acceptedAnswers?: string[];
    caseSensitive?: boolean;
  };
  onChange: (updatedData: { acceptedAnswers: string[]; caseSensitive: boolean }) => void;
}

export default function ShortAnswerEditor({ questionData, onChange }: ShortAnswerEditorProps) {
  // Fallback default accepted answers and case-sensitivity flag
  const acceptedAnswers = questionData?.acceptedAnswers || [''];
  const caseSensitive = questionData?.caseSensitive || false;

  /**
   * Handles updating a specific accepted answer text based on its index.
   */
  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...acceptedAnswers];
    updated[index] = value;
    onChange({ acceptedAnswers: updated, caseSensitive });
  };

  /**
   * Adds a new empty accepted answer field.
   */
  const handleAddAnswer = () => {
    onChange({ acceptedAnswers: [...acceptedAnswers, ''], caseSensitive });
  };

  /**
   * Removes an accepted answer field by its index.
   */
  const handleRemoveAnswer = (index: number) => {
    const updated = acceptedAnswers.filter((_, i) => i !== index);
    onChange({ acceptedAnswers: updated, caseSensitive });
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 border rounded-xl bg-white shadow-sm w-full">
      {/* Section Header */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Short Answer Settings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Provide acceptable textual answers that students might type.
        </p>
      </div>

      {/* Accepted Answers List Container */}
      <div className="space-y-2">
        <label className="block text-xs sm:text-sm font-medium text-gray-600">Accepted Answers</label>
        
        {acceptedAnswers.map((ans, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3 sm:p-0 border sm:border-0 rounded-lg bg-gray-50/50 sm:bg-transparent"
          >
            {/* Input field for accepted answer */}
            <input
              type="text"
              value={ans}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Accepted answer ${index + 1}`}
              className="flex-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            
            {/* Remove button */}
            <div className="flex justify-end sm:justify-center">
              {acceptedAnswers.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAnswer(index)}
                  className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Accepted Answer Button */}
      <button
        type="button"
        onClick={handleAddAnswer}
        className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center"
      >
        + Add Accepted Answer
      </button>

      {/* Case Sensitivity Checkbox Setting */}
      <div className="flex items-center gap-2.5 pt-2 border-t">
        <input
          type="checkbox"
          id="caseSensitive"
          checked={caseSensitive}
          onChange={(e) => onChange({ acceptedAnswers, caseSensitive: e.target.checked })}
          className="w-4 h-4 text-blue-600 rounded cursor-pointer"
        />
        <label htmlFor="caseSensitive" className="text-xs sm:text-sm text-gray-700 cursor-pointer font-medium">
          Case-sensitive evaluation (e.g., &apos;Paris&apos; != &apos;paris&apos;)
        </label>
      </div>
    </div>
  );
}