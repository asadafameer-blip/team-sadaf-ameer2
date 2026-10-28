'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { Save } from 'lucide-react';

// Zod Schema Definition
const quizFormSchema = z.object({
  title: z.string().min(3, 'Quiz title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  category: z.string().optional(),
  timeLimit: z.number().min(1, 'Time limit must be at least 1 minute'),
  passingScore: z.number().min(1).max(100, 'Passing score must be between 1 and 100'),
  randomizeQuestions: z.boolean(),
  randomizeOptions: z.boolean(),
  status: z.enum(['draft', 'published', 'archived']),
});

type QuizFormData = z.infer<typeof quizFormSchema>;

export default function QuizSettings() {
  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    description: '',
    category: '',
    timeLimit: 30,
    passingScore: 70,
    randomizeQuestions: false,
    randomizeOptions: false,
    status: 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = attrTarget(e.target);

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'timeLimit' || name === 'passingScore') {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Helper to safely get target attributes
  const attrTarget = (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)) => {
    return {
      name: target.name,
      value: target.value,
      type: target.type,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg('');

    // Zod Validation Check
    const result = quizFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Success state
    console.log('Valid Quiz Data:', result.data);
    setSuccessMsg('Quiz settings validated and saved successfully!');
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Quiz Settings</h2>

      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200 font-medium">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., JavaScript & React Fundamentals"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {errors.title && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Provide a brief description of what this quiz covers..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          {errors.description && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.description}</p>}
        </div>

        {/* Responsive Grid for Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time Limit (Minutes)</label>
            <input
              type="number"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.timeLimit && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.timeLimit}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Passing Score (%)</label>
            <input
              type="number"
              name="passingScore"
              value={formData.passingScore}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.passingScore && <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.passingScore}</p>}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              name="randomizeQuestions"
              checked={formData.randomizeQuestions}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            Randomize Questions Order
          </label>

          <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              name="randomizeOptions"
              checked={formData.randomizeOptions}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            Randomize Options Order
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            <Save className="w-4 h-4" /> Save Quiz Settings
          </button>
        </div>
      </form>
    </div>
  );
}