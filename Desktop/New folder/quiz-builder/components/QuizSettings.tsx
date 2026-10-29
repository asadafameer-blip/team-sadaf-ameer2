'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function QuizSettings() {
  const [quizInfo, setQuizInfo] = useState({
    title: '',
    description: '',
    timeLimit: '30',
    passingScore: '70',
    status: 'Draft',
    randomize: false,
  });

  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl">
      <CardHeader className="pb-4 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900">Quiz Settings</CardTitle>
        <p className="text-xs text-slate-500">Configure global rules and properties for this quiz.</p>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div>
          <Label className="text-xs font-semibold text-slate-700">Quiz Title</Label>
          <Input 
            placeholder="e.g., JavaScript & React Fundamentals"
            value={quizInfo.title}
            onChange={(e) => setQuizInfo({ ...quizInfo, title: e.target.value })}
            className="mt-1 bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div>
          <Label className="text-xs font-semibold text-slate-700">Description</Label>
          <textarea
            rows={3}
            placeholder="Provide a brief description of what this quiz covers..."
            value={quizInfo.description}
            onChange={(e) => setQuizInfo({ ...quizInfo, description: e.target.value })}
            className="mt-1 w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-semibold text-slate-700">Time Limit (Minutes)</Label>
            <Input 
              type="number"
              value={quizInfo.timeLimit}
              onChange={(e) => setQuizInfo({ ...quizInfo, timeLimit: e.target.value })}
              className="mt-1 bg-white border-slate-300 text-slate-900"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-700">Passing Score (%)</Label>
            <Input 
              type="number"
              value={quizInfo.passingScore}
              onChange={(e) => setQuizInfo({ ...quizInfo, passingScore: e.target.value })}
              className="mt-1 bg-white border-slate-300 text-slate-900"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}