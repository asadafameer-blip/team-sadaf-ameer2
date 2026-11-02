'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Layers, 
  Trash2, 
  Edit, 
  BookOpen,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuestionItem {
  id: string;
  topic: string;
  course: string;
  marks: number;
  questionType: string;
}

export default function QuestionBankPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Client requirements ke mutabiq Question & Topic management data
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: 'QB-01',
      topic: 'React Hooks & State Management',
      course: 'Frontend Web Development',
      marks: 5,
      questionType: 'Multiple Choice',
    },
    {
      id: 'QB-02',
      topic: 'Responsive Flexbox Layouts in Tailwind',
      course: 'UI/UX Styling',
      marks: 10,
      questionType: 'Practical / Coding',
    },
    {
      id: 'QB-03',
      topic: 'Next.js 14 App Router Navigation',
      course: 'Advanced Frontend',
      marks: 5,
      questionType: 'True / False',
    },
    {
      id: 'QB-04',
      topic: 'Database Schema & Relational Queries',
      course: 'Backend Architecture',
      marks: 15,
      questionType: 'Descriptive',
    },
  ]);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'All' || q.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      
      {/* Instructor Portal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Layers className="h-6 w-6 text-indigo-600" />
            Instructor Question Bank
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, organize, and add specific course topics & questions for student quizzes.
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 shadow-sm rounded-lg px-4 py-2">
          <Plus className="h-4 w-4" />
          Add Topic & Question
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Questions</p>
              <h3 className="text-2xl font-bold text-slate-800">{questions.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Courses</p>
              <h3 className="text-2xl font-bold text-slate-800">3</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Portal Status</p>
              <h3 className="text-2xl font-bold text-slate-800">Synced to PR</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Course Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search topics or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white text-slate-800 text-sm rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          {['All', 'Frontend Web Development', 'UI/UX Styling', 'Advanced Frontend', 'Backend Architecture'].map((course) => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCourse === course
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {course}
            </button>
          ))}
        </div>
      </div>

      {/* Topics & Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item) => (
            <Card key={item.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {item.id}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                      {item.course}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {item.marks} Marks
                    </span>
                    <span className="text-xs text-slate-400">
                      Type: <strong className="text-slate-600">{item.questionType}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-800 leading-snug">
                    Topic: {item.topic}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Button variant="outline" size="sm" className="h-9 px-3 text-slate-600 border-slate-200 hover:bg-slate-50">
                    <Edit className="h-4 w-4 mr-1 text-slate-500" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 px-3 text-rose-600 border-rose-200 hover:bg-rose-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <h3 className="text-lg font-semibold text-slate-700">No topics found</h3>
            <p className="text-sm text-slate-400 mt-1">
              Add new topics and questions matching your course requirements.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}