'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';
import { z } from 'zod';

// Zod Schema for Questions Validation
const questionSchema = z.object({
  questionText: z.string().min(3, 'Question text must be at least 3 characters'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).min(2, 'At least 2 options are required'),
  correctOption: z.number().min(0),
});

export default function QuestionEditor() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: '',
      options: ['', '', '', ''],
      correctOption: 0,
    },
  ]);

  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  // Question Text Change Handler
  const handleQuestionChange = (id: number, text: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, questionText: text } : q))
    );
  };

  // Option Change Handler
  const handleOptionChange = (qId: number, optIndex: number, text: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === qId) {
          const newOptions = [...q.options];
          newOptions[optIndex] = text;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  // Correct Option Selection Handler
  const handleCorrectOptionChange = (qId: number, optIndex: number) => {
    setQuestions(
      questions.map((q) => (q.id === qId ? { ...q, correctOption: optIndex } : q))
    );
  };

  // Add Question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        questionText: '',
        options: ['', '', '', ''],
        correctOption: 0,
      },
    ]);
  };

  // Delete Question
  const handleDeleteQuestion = (id: number) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Validate Questions
  const handleValidate = () => {
    const newErrors: { [key: number]: string } = {};

    questions.forEach((q) => {
      const result = questionSchema.safeParse(q);
      if (!result.success) {
        newErrors[q.id] = result.error.issues[0].message;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('All questions validated successfully with Zod!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Quiz Questions Builder</h2>
        <div className="flex gap-2">
          <Button onClick={handleValidate} variant="outline" className="border-indigo-600 text-indigo-600">
            Validate Zod
          </Button>
          <Button onClick={handleAddQuestion} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
            <PlusCircle className="w-4 h-4" /> Add Question
          </Button>
        </div>
      </div>

      {questions.map((q, qIndex) => (
        <Card key={q.id} className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Question #{qIndex + 1}
            </CardTitle>
            {questions.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteQuestion(q.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs text-slate-600">Question Statement</Label>
              <Input
                placeholder="Enter your question here..."
                value={q.questionText}
                onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-600">Options & Correct Answer</Label>
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={`correct-${q.id}`}
                    checked={q.correctOption === optIndex}
                    onChange={() => handleCorrectOptionChange(q.id, optIndex)}
                    className="w-4 h-4 text-indigo-600 cursor-pointer"
                  />
                  <Input
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(q.id, optIndex, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>

            {errors[q.id] && (
              <p className="text-xs text-red-500 font-medium">{errors[q.id]}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}