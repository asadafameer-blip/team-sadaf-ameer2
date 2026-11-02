'use client';

import React, { useState, useEffect } from 'react';
import { LogOut, LogIn, User } from 'lucide-react';

export default function SidebarAccountSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Sadaf Ameer');

  useEffect(() => {
    // Sync with saved settings
    const loadProfile = () => {
      const saved = localStorage.getItem('user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        setUserName(parsed.fullName || 'Sadaf Ameer');
      }
    };

    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    return () => window.removeEventListener('profileUpdated', loadProfile);
  }, []);

  const handleAuthToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="p-4 border-t border-slate-800 text-white mt-auto">
      {isLoggedIn ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
              {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold truncate">{userName}</p>
              <p className="text-[10px] text-slate-400">Instructor</p>
            </div>
          </div>
          <button 
            onClick={handleAuthToggle} 
            title="Log Out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button 
          onClick={handleAuthToggle}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
        >
          <LogIn className="h-4 w-4" /> Log In
        </button>
      )}
    </div>
  );
}