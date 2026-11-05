'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, PlusCircle, Clock, BookOpen, Layers } from 'lucide-react';
import QuestionEditor, { QuestionData } from '@/components/QuestionEditor';

export default function CreateQuizPage() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [durationMins, setDurationMins] = useState(30);
  const [category, setCategory] = useState('Web Development');

  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      id: '1',
      text: '',
      description: '',
      questionType: 'mcq',
      points: 5,
      data: {},
    },
  ]);

  const handleAddNewQuestion = () => {
    const newQ: QuestionData = {
      id: Date.now().toString(),
      text: '',
      description: '',
      questionType: 'mcq',
      points: 5,
      data: {},
    };
    setQuestions([...questions, newQ]);
  };

  const handleUpdateQuestion = (updatedQ: QuestionData) => {
    setQuestions(questions.map((q) => (q.id === updatedQ.id ? updatedQ : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length === 1) {
      alert('Quiz must contain at least one question!');
      return;
    }
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle.trim()) {
      alert('Please enter a quiz title');
      return;
    }

    const quizPayload = {
      title: quizTitle,
      description: quizDescription,
      duration: durationMins,
      category,
      questions,
      createdAt: new Date().toISOString(),
    };

    console.log('Quiz Saved Successfully:', quizPayload);
    alert('Quiz created successfully! (Check console for payload)');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/quizzes">
            <Button type="button" variant="outline" size="sm" className="h-9 w-9 p-0 rounded-xl">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">Create New Quiz</h1>
            <p className="text-xs text-slate-500">Configure quiz metadata and build dynamic questions.</p>
          </div>
        </div>

        <Button 
          type="button"
          onClick={handleSaveQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 text-xs sm:text-sm font-medium shadow-sm shadow-indigo-500/20"
        >
          <Save className="w-4 h-4" /> Save & Publish Quiz
        </Button>
      </div>

      <form onSubmit={handleSaveQuiz} className="space-y-6">
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> General Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quiz Title <span className="text-rose-500">*</span>
                </label>
                <Input
                  required
                  placeholder="e.g. Advanced TypeScript & Next.js Masterclass"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="bg-white border-slate-300 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Write clear instructions for students taking this quiz..."
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" /> Duration (Minutes)
                </label>
                <Input
                  type="number"
                  min={1}
                  value={durationMins}
                  onChange={(e) => setDurationMins(parseInt(e.target.value) || 10)}
                  className="bg-white border-slate-300 text-xs sm:text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-slate-500" /> Subject Category
                </label>
                <Input
                  placeholder="e.g. Frontend Development, Mathematics"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-white border-slate-300 text-xs sm:text-sm text-slate-900"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Quiz Questions ({questions.length})
            </h2>
            <Button
              type="button"
              onClick={handleAddNewQuestion}
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 text-xs gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Add Question
            </Button>
          </div>

          {questions.map((q) => (
            <QuestionEditor
              key={q.id}
              question={q}
              onUpdateQuestion={handleUpdateQuestion}
            />
          ))}
        </div>
      </form>
    </div>
  );
}