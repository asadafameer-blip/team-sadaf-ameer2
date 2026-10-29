'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Eye, Edit, Trash2, FileText, Clock, HelpCircle, Award, X } from 'lucide-react';
import Link from 'next/link';

// Define explicit Quiz type interface to fix TypeScript 'any' warnings
interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: number;
  duration: string;
  status: string;
  attempts: number;
  date: string;
}

export default function AllQuizzesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Quiz list state
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    { id: 1, title: 'JavaScript & React Fundamentals', description: 'Covers core concepts of modern JavaScript and React component lifecycles.', questions: 15, duration: '30 mins', status: 'Active', attempts: 120, date: 'Oct 24, 2026' },
    { id: 2, title: 'Mathematics & Linear Algebra Test', description: 'Test containing matrices, vectors, and fundamental equations.', questions: 20, duration: '45 mins', status: 'Active', attempts: 95, date: 'Oct 22, 2026' },
    { id: 3, title: 'HTML & CSS Responsive Layouts', description: 'Flexbox, Grid, and mobile-first media queries evaluation.', questions: 10, duration: '20 mins', status: 'Draft', attempts: 0, date: 'Oct 20, 2026' },
    { id: 4, title: 'Node.js & Express API Development', description: 'Backend routing, middleware integration, and REST APIs.', questions: 12, duration: '25 mins', status: 'Active', attempts: 64, date: 'Oct 18, 2026' },
  ]);

  // Modals state using typed Quiz interface
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'preview' | 'edit'>('preview');

  // Edit fields state
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Delete handler
  const handleDelete = (id: number) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  // Open Preview Modal
  const handlePreview = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setModalMode('preview');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleEdit = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setEditTitle(quiz.title);
    setEditDesc(quiz.description);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  // Save Edited Quiz
  const handleSaveEdit = () => {
    if (!selectedQuiz) return;
    setQuizzes(quizzes.map(q => q.id === selectedQuiz.id ? { ...q, title: editTitle, description: editDesc } : q));
    setIsModalOpen(false);
  };

  // Filter quizzes by search query
  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quiz Management Directory</h2>
          <p className="text-xs text-slate-500 mt-1">Browse, test preview, update or remove your instructor quiz modules.</p>
        </div>
        <Link href="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 font-medium shadow-sm shadow-indigo-500/20">
            <PlusCircle className="w-4 h-4" /> Create New Quiz
          </Button>
        </Link>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        <Input 
          placeholder="Search quiz by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none focus-visible:ring-0 text-slate-800 text-sm placeholder:text-slate-400 p-0 h-auto"
        />
      </div>

      {/* Modern Grid Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="bg-white border-slate-200 shadow-sm hover:shadow-md transition rounded-2xl flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                
                {/* Card Top: Title & Status Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">{quiz.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{quiz.description}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                    quiz.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {quiz.status}
                  </span>
                </div>

                {/* Card Stats Chips */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{quiz.questions} Qs</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{quiz.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{quiz.attempts} Std</span>
                  </div>
                </div>

              </CardContent>

              {/* Card Footer Actions */}
              <div className="px-6 py-3 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Created: {quiz.date}</span>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handlePreview(quiz)}
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 h-8 px-2.5 gap-1.5 font-medium"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(quiz)}
                    className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 h-8 px-2.5 gap-1.5 font-medium"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(quiz.id)}
                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 h-8 px-2.5 gap-1.5 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-2 bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-400">No quizzes found matching your search query.</p>
          </div>
        )}
      </div>

      {/* Interactive Modal for Preview & Edit */}
      {isModalOpen && selectedQuiz && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {modalMode === 'preview' ? 'Quiz Preview Details' : 'Edit Quiz Information'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalMode === 'preview' ? (
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Title</span>
                  <p className="font-semibold text-slate-900 text-base">{selectedQuiz.title}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Description</span>
                  <p className="text-slate-600 mt-0.5">{selectedQuiz.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-xs text-slate-400">Total Questions</span>
                    <p className="font-bold text-slate-800">{selectedQuiz.questions} Questions</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <span className="text-xs text-slate-400">Time Duration</span>
                    <p className="font-bold text-slate-800">{selectedQuiz.duration}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Quiz Title</label>
                  <Input 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="mt-1 bg-white border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Description</label>
                  <textarea 
                    rows={3}
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="mt-1 w-full p-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSaveEdit} className="bg-indigo-600 hover:bg-indigo-700 text-white">Save Changes</Button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}