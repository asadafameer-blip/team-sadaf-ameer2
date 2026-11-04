// components/quiz/question-types/MCQEditor.tsx
import React from 'react';

/**
 * Interface representing a single option in an MCQ question.
 */
interface Option {
  id: string;
  text: string;
}

/**
 * Props for the MCQEditor component.
 */
interface MCQEditorProps {
  questionData: {
    options?: Option[];
    correctAnswer?: string;
  };
  onChange: (updatedData: { options: Option[]; correctAnswer: string }) => void;
}

export default function MCQEditor({ questionData, onChange }: MCQEditorProps) {
  // Fallback to default options if none exist yet
  const options = questionData?.options || [
    { id: 'a', text: '' },
    { id: 'b', text: '' },
  ];
  const correctAnswer = questionData?.correctAnswer || 'a';

  /**
   * Handles text changes for a specific option identifier.
   */
  const handleOptionChange = (id: string, text: string) => {
    const updatedOptions = options.map((opt) => (opt.id === id ? { ...opt, text } : opt));
    onChange({ options: updatedOptions, correctAnswer });
  };

  /**
   * Dynamically generates the next alphabet key (a, b, c, d...) and adds a new option.
   */
  const handleAddOption = () => {
    const newId = String.fromCharCode(97 + options.length); // a, b, c, d...
    const updatedOptions = [...options, { id: newId, text: '' }];
    onChange({ options: updatedOptions, correctAnswer });
  };

  /**
   * Removes an option by its ID and ensures state sync.
   */
  const handleRemoveOption = (id: string) => {
    const updatedOptions = options.filter((opt) => opt.id !== id);
    
    // Fallback correct answer if the removed option was selected as correct
    let updatedCorrect = correctAnswer;
    if (correctAnswer === id && updatedOptions.length > 0) {
      updatedCorrect = updatedOptions[0].id;
    }

    onChange({ options: updatedOptions, correctAnswer: updatedCorrect });
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 border rounded-xl bg-white shadow-sm w-full">
      {/* Section Header */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Multiple Choice Question (MCQ) Settings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Provide options and select the radio button next to the correct answer.
        </p>
      </div>
      
      {/* Options Configuration List */}
      <div className="space-y-3">
        <label className="block text-xs sm:text-sm font-medium text-gray-600">Options & Correct Answer</label>
        
        {options.map((option) => (
          <div 
            key={option.id} 
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-0 border sm:border-0 rounded-lg bg-gray-50/50 sm:bg-transparent"
          >
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Radio button to select correct answer */}
              <input
                type="radio"
                name="correctAnswer"
                checked={correctAnswer === option.id}
                onChange={() => onChange({ options, correctAnswer: option.id })}
                className="w-4 h-4 text-blue-600 cursor-pointer"
                title="Mark as correct answer"
              />
              <span className="text-sm font-bold uppercase text-gray-500 w-5">{option.id}.</span>
              
              {/* Option text input */}
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(option.id, e.target.value)}
                placeholder={`Option ${option.id.toUpperCase()}`}
                className="flex-1 px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Remove option button */}
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