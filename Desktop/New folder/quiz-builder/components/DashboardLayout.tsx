'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Mobile sidebar open/close state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden w-full">
      {/* Sidebar Component with Mobile State Props */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Right Side Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar with Hamburger Toggle */}
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Central Scrollable Dashboard View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <div className="max-w-4xl mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}