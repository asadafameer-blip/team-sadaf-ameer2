'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileCheck2, 
  PlusCircle, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  LogOut, 
  GraduationCap,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
        />
      )}

      {/* Responsive Animated Sidebar Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 select-none
        transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Logo & Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wide leading-tight">
                Pacer LMS
              </h1>
              <p className="text-[11px] font-medium text-indigo-400">Instructor Portal</p>
            </div>
          </div>
          {/* Close button for small screens */}
          <button 
            onClick={onClose} 
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Core Modules
            </p>
            <nav className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold shadow-sm transition"
              >
                <LayoutDashboard className="w-4 h-4 text-white" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/quizzes"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
              >
                <FileCheck2 className="w-4 h-4 text-slate-400" />
                <span>All Quizzes</span>
              </Link>

              <Link
                href="/create"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
              >
                <PlusCircle className="w-4 h-4 text-slate-400" />
                <span>Create Quiz</span>
              </Link>
            </nav>
          </div>

          <div>
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Academic Tools
            </p>
            <nav className="space-y-1">
              <Link
                href="/question-bank"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
              >
                <FolderKanban className="w-4 h-4 text-slate-400" />
                <span>Question Bank</span>
              </Link>

              <Link
                href="/analytics"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
              >
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <span>Analytics</span>
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 text-xs font-medium transition"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="p-3 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-lg transition">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}