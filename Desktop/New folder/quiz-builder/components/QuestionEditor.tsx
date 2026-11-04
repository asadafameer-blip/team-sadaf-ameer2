// components/QuestionEditor.tsx
import React, { useState } from 'react';
import MCQEditor from './quiz/question-types/MCQEditor';
import TrueFalseEditor from './quiz/question-types/TrueFalseEditor';
import ShortAnswerEditor from './quiz/question-types/ShortAnswerEditor';
import FillBlankEditor from './quiz/question-types/FillBlankEditor';
import MultiSelectEditor from './quiz/question-types/MultiSelectEditor';
import OrderingEditor from './quiz/question-types/OrderingEditor';
import MatchingEditor from './quiz/question-types/MatchingEditor';

/**
 * Interface representing the complete structure of a Question.
 */
interface Question {
  id?: string;
  text: string;
  description?: string;
  questionType: string;
  points: number;
  data: Record<string, unknown>;
}

/**
 * Props for the QuestionEditor component.
 */
interface QuestionEditorProps {
  question?: Question;
  onSave: (updatedQuestion: Question) => void;
}

export default function QuestionEditor({ question, onSave }: QuestionEditorProps) {
  // Initialize local state with existing question or default values
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    question || {
      text: '',
      description: '',
      questionType: 'mcq',
      points: 1,
      data: {},
    }
  );

  /**
   * Handles question type switching and resets data payload to prevent type mismatch.
   */
  const handleTypeChange = (newType: string) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionType: newType,
      data: {}, // Reset data structure on type switch
    });
  };

  /**
   * Updates question type-specific dynamic data payload.
   */
  const handleDataChange = (newData: Record<string, unknown>) => {
    setCurrentQuestion({
      ...currentQuestion,
      data: newData,
    });
  };

  /**
   * Conditionally renders the appropriate sub-editor component based on the selected question type.
   */
  const renderTypeEditor = () => {
    switch (currentQuestion.questionType) {
      case 'mcq':
        return <MCQEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      case 'true_false':
        return <TrueFalseEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      case 'short_answer':
        return <ShortAnswerEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      case 'fill_blank':
        return <FillBlankEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      case 'multi_select':
        return <MultiSelectEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      case 'ordering':
        return <OrderingEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      case 'matching':
        return <MatchingEditor questionData={currentQuestion.data as any} onChange={handleDataChange} />;
      default:
        return <p className="text-sm text-gray-500 py-4 text-center">Select a question type to configure settings.</p>;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-white border rounded-xl shadow-sm w-full">
      {/* Header and Save Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Question Editor</h2>
          <p className="text-xs text-gray-500">Configure quiz question details and type settings.</p>
        </div>
        <button
          type="button"
          onClick={() => onSave(currentQuestion)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          Save Question
        </button>
      </div>

      {/* Basic Question Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Question Text</label>
          <textarea
            value={currentQuestion.text}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
            placeholder="Enter your question here..."
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Question Type Selector */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Question Type</label>
            <select
              value={currentQuestion.questionType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="mcq">Multiple Choice (MCQ)</option>
              <option value="true_false">True / False</option>
              <option value="short_answer">Short Answer</option>
              <option value="fill_blank">Fill in the Blanks</option>
              <option value="multi_select">Multi-select</option>
              <option value="ordering">Ordering / Sequence</option>
              <option value="matching">Matching Pairs</option>
            </select>
          </div>

          {/* Points Input */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Points</label>
            <input
              type="number"
              min={1}
              value={currentQuestion.points}
              onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Type-Specific Editor Component Container */}
      <div className="pt-2 border-t">
        {renderTypeEditor()}
      </div>
    </div>
  );
}