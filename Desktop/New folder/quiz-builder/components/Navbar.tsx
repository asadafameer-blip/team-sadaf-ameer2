'use client';

import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg w-72 border border-slate-200">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search quizzes, students..."
          className="bg-transparent text-sm focus:outline-none w-full text-slate-700"
        />
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full relative transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
            SA
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Sadaf Ameer</h4>
            <p className="text-xs text-slate-500">Instructor</p>
          </div>
        </div>
      </div>
    </header>
  );
}