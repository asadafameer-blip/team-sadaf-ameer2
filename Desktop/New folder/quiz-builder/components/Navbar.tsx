'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Search, LogOut } from 'lucide-react';

export default function HeaderNavbar() {
  const [userName, setUserName] = useState('Sadaf Ameer');
  const [userRole, setUserRole] = useState('Instructor');

  // LocalStorage se data read karna aur event listen karna
  useEffect(() => {
    const syncProfile = () => {
      const saved = localStorage.getItem('user_profile');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.fullName) setUserName(data.fullName);
        if (data.designation) setUserRole(data.designation);
      }
    };

    // First load par sync karein
    syncProfile();

    // Jab Settings page save ho toh instant update ho
    window.addEventListener('profileUpdated', syncProfile);
    return () => window.removeEventListener('profileUpdated', syncProfile);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
      {/* Search Input */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search quizzes..." 
          className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right User Controls */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* Dynamic Name & Avatar synced with Settings */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
            {userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'SA'}
          </div>
          <div className="text-left hidden sm:block">
            <h4 className="text-xs font-bold text-slate-800">{userName}</h4>
            <p className="text-[10px] text-slate-400">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}