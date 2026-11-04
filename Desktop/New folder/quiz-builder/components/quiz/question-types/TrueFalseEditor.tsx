// components/quiz/question-types/TrueFalseEditor.tsx
import React from 'react';

interface TrueFalseEditorProps {
  questionData: {
    correctAnswer: 'true' | 'false';
  };
 onChange: (updatedData: { correctAnswer: 'true' | 'false' }) => void
}

export default function TrueFalseEditor({ questionData, onChange }: TrueFalseEditorProps) {
  const correctAnswer = questionData?.correctAnswer || 'true';

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-gray-700">True / False Settings</h3>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-600 block">Select Correct Answer</label>
        
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-md hover:bg-gray-50">
            <input
              type="radio"
              name="tfCorrectAnswer"
              value="true"
              checked={correctAnswer === 'true'}
              onChange={() => onChange({ ...questionData, correctAnswer: 'true' })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">True</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-md hover:bg-gray-50">
            <input
              type="radio"
              name="tfCorrectAnswer"
              value="false"
              checked={correctAnswer === 'false'}
              onChange={() => onChange({ ...questionData, correctAnswer: 'false' })}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">False</span>
          </label>
        </div>
      </div>
    </div>
  );
}