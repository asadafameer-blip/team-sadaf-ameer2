'use client';

import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between shadow-sm shrink-0">
      {/* Left Search and Hamburger Menu Toggle */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden transition"
          aria-label="Toggle Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg w-40 sm:w-60 md:w-72 border border-slate-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search quizzes..."
            className="bg-transparent text-sm focus:outline-none w-full text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right User Badge & Notifications */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full relative transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            SA
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-slate-800 leading-tight">Sadaf Ameer</h4>
            <p className="text-xs text-slate-500">Instructor</p>
          </div>
        </div>
      </div>
    </header>
  );
}