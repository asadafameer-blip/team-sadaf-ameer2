// components/quiz/question-types/FillBlankEditor.tsx
import React from 'react';

/**
 * Interface representing a single blank item and its accepted alternative answers.
 */
interface BlankAnswer {
  blankId: string;
  acceptedAnswers: string[];
}

/**
 * Props for the FillBlankEditor component.
 */
interface FillBlankEditorProps {
  questionData: {
    blanks?: BlankAnswer[];
  };
  onChange: (updatedData: { blanks: BlankAnswer[] }) => void;
}

export default function FillBlankEditor({ questionData, onChange }: FillBlankEditorProps) {
  // Fallback to a default single blank if none are provided yet
  const blanks = questionData?.blanks || [{ blankId: '1', acceptedAnswers: [''] }];

  /**
   * Handles updating a specific accepted answer text for a particular blank.
   */
  const handleBlankAnswerChange = (blankIndex: number, ansIndex: number, value: string) => {
    const updatedBlanks = [...blanks];
    const updatedAnswers = [...updatedBlanks[blankIndex].acceptedAnswers];
    updatedAnswers[ansIndex] = value;
    updatedBlanks[blankIndex].acceptedAnswers = updatedAnswers;
    
    onChange({ blanks: updatedBlanks });
  };

  /**
   * Adds a new alternative accepted answer input field to a specific blank.
   */
  const handleAddAnswerToBlank = (blankIndex: number) => {
    const updatedBlanks = [...blanks];
    updatedBlanks[blankIndex].acceptedAnswers.push('');
    
    onChange({ blanks: updatedBlanks });
  };

  /**
   * Adds a brand new blank item to the question configuration.
   */
  const handleAddBlank = () => {
    const newBlankId = String(blanks.length + 1);
    const updatedBlanks = [...blanks, { blankId: newBlankId, acceptedAnswers: [''] }];
    
    onChange({ blanks: updatedBlanks });
  };

  /**
   * Removes an existing blank item from the list.
   */
  const handleRemoveBlank = (blankIndex: number) => {
    const updatedBlanks = blanks.filter((_, i) => i !== blankIndex);
    
    onChange({ blanks: updatedBlanks });
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 border rounded-xl bg-white shadow-sm w-full">
      {/* Section Header */}
      <div>
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">Fill in the Blanks Settings</h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Define accepted answers for each blank in your question text.
        </p>
      </div>

      {/* Blanks Configuration List Container */}
      <div className="space-y-3">
        {blanks.map((blank, bIndex) => (
          <div key={blank.blankId} className="p-3 sm:p-4 border rounded-lg bg-gray-50/70 space-y-3">
            
            {/* Blank Item Header & Remove Option */}
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-gray-700">
                Blank #{bIndex + 1}
              </span>
              {blanks.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveBlank(bIndex)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                >
                  Remove Blank
                </button>
              )}
            </div>

            {/* Accepted Answers List for the current blank */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-gray-600">
                Accepted Answers for this blank:
              </label>

              {blank.acceptedAnswers.map((ans, aIndex) => (
                <div key={aIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ans}
                    onChange={(e) => handleBlankAnswerChange(bIndex, aIndex, e.target.value)}
                    placeholder={`Accepted answer ${aIndex + 1}`}
                    className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              ))}

              {/* Add alternative option button */}
              <button
                type="button"
                onClick={() => handleAddAnswerToBlank(bIndex)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium pt-1 block transition-colors"
              >
                + Add alternative answer for Blank #{bIndex + 1}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Global Add Another Blank Button */}
      <button
        type="button"
        onClick={handleAddBlank}
        className="w-full sm:w-auto px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-center"
      >
        + Add Another Blank
      </button>
    </div>
  );
}