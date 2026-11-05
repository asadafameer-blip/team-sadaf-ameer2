// components/QuestionEditor.tsx
import React, { useState } from 'react';
import MCQEditor from './quiz/question-types/MCQEditor';
import TrueFalseEditor from './quiz/question-types/TrueFalseEditor';
import ShortAnswerEditor from './quiz/question-types/ShortAnswerEditor';
import FillBlankEditor from './quiz/question-types/FillBlankEditor';
import MultiSelectEditor from './quiz/question-types/MultiSelectEditor';
import OrderingEditor from './quiz/question-types/OrderingEditor';
import MatchingEditor from './quiz/question-types/MatchingEditor';

export interface Question {
  id?: string;
  text: string;
  description?: string;
  questionType: string;
  points: number;
  data: Record<string, unknown>;
}

export type QuestionData = Question;

interface QuestionEditorProps {
  question?: Question;
  onSave?: (updatedQuestion: Question) => void;
  onUpdateQuestion?: (updatedQuestion: Question) => void;
  onDeleteQuestion?: (id: string) => void;
}

export default function QuestionEditor({ 
  question, 
  onSave, 
  onUpdateQuestion, 
  onDeleteQuestion 
}: QuestionEditorProps) {
  // Yahan useEffect ko hata kar lazy initializer mein direct safe ID generate kar li hai
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => {
    return question || {
      id: 'q_' + Math.random().toString(36).substring(2, 9),
      text: '',
      description: '',
      questionType: 'mcq',
      points: 1,
      data: { correctAnswer: 'true' },
    };
  });

  const handleTypeChange = (newType: string) => {
    let defaultData: Record<string, unknown> = {};
    if (newType === 'true_false') {
      defaultData = { correctAnswer: 'true' };
    } else if (newType === 'mcq') {
      defaultData = { options: ['', ''], correctAnswer: '' };
    }

    const updated = {
      ...currentQuestion,
      questionType: newType,
      data: defaultData,
    };
    setCurrentQuestion(updated);
    if (onUpdateQuestion) onUpdateQuestion(updated);
  };

  const handleDataChange = (newData: Record<string, unknown>) => {
    const updated = {
      ...currentQuestion,
      data: newData,
    };
    setCurrentQuestion(updated);
    if (onUpdateQuestion) onUpdateQuestion(updated);
  };

  const handleTextChange = (text: string) => {
    const updated = { ...currentQuestion, text };
    setCurrentQuestion(updated);
    if (onUpdateQuestion) onUpdateQuestion(updated);
  };

  const handlePointsChange = (points: number) => {
    const updated = { ...currentQuestion, points };
    setCurrentQuestion(updated);
    if (onUpdateQuestion) onUpdateQuestion(updated);
  };

  const renderTypeEditor = () => {
    const dataPayload = (currentQuestion.data || {}) as Record<string, unknown>;
    switch (currentQuestion.questionType) {
      case 'mcq':
        return <MCQEditor questionData={dataPayload} onChange={handleDataChange} />;
      case 'true_false':
        return <TrueFalseEditor questionData={dataPayload as { correctAnswer: "true" | "false" }} onChange={handleDataChange} />;
      case 'short_answer':
        return <ShortAnswerEditor questionData={dataPayload} onChange={handleDataChange} />;
      case 'fill_blank':
        return <FillBlankEditor questionData={dataPayload} onChange={handleDataChange} />;
      case 'multi_select':
        return <MultiSelectEditor questionData={dataPayload} onChange={handleDataChange} />;
      case 'ordering':
        return <OrderingEditor questionData={dataPayload} onChange={handleDataChange} />;
      case 'matching':
        return <MatchingEditor questionData={dataPayload} onChange={handleDataChange} />;
      default:
        return <p className="text-sm text-gray-500 py-4 text-center">Select a question type to configure settings.</p>;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-white border rounded-xl shadow-sm w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Question Editor</h2>
          <p className="text-xs text-gray-500">Configure quiz question details and type settings.</p>
        </div>
        <div className="flex items-center gap-2">
          {onSave && (
            <button
              type="button"
              onClick={() => onSave(currentQuestion)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            >
              Save Question
            </button>
          )}
          {onDeleteQuestion && currentQuestion.id && (
            <button
              type="button"
              onClick={() => onDeleteQuestion(currentQuestion.id!)}
              className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-medium rounded-lg transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Question Text</label>
          <textarea
            value={currentQuestion.text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your question here..."
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Question Type</label>
            <select
              value={currentQuestion.questionType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
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

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Points</label>
            <input
              type="number"
              min={1}
              value={currentQuestion.points}
              onChange={(e) => handlePointsChange(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 border-t">
        {renderTypeEditor()}
      </div>
    </div>
  );
}