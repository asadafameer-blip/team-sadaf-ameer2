'use client';

import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  ArrowUpRight,
  PieChart,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
            Instructor Performance Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time student progress, completion rates, and visual performance charts.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-200">
          <TrendingUp className="h-4 w-4" /> +18.4% Overall Growth
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Quiz Attempts</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">2,450</h3>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="h-3 w-3" /> +12% this week
              </span>
            </div>
            {/* Circular Mini Chart Graphic */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#e2e8f0" strokeWidth="5" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#4f46e5" strokeWidth="5" fill="transparent" strokeDasharray={138} strokeDashoffset={30} strokeLinecap="round" />
              </svg>
              <span className="absolute text-[10px] font-bold text-indigo-600">78%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Average Score</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">86.4%</h3>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="h-3 w-3" /> +4.2% passing rate
              </span>
            </div>
            {/* Circular Mini Chart Graphic */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="22" stroke="#e2e8f0" strokeWidth="5" fill="transparent" />
                <circle cx="28" cy="28" r="22" stroke="#10b981" strokeWidth="5" fill="transparent" strokeDasharray={138} strokeDashoffset={18} strokeLinecap="round" />
              </svg>
              <span className="absolute text-[10px] font-bold text-emerald-600">86%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Students</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">1,120</h3>
              <span className="text-xs text-indigo-600 font-medium flex items-center gap-0.5 mt-1">
                Active Enrolled
              </span>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Quizzes Published</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">34</h3>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-0.5 mt-1">
                Across 4 Courses
              </span>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <BookOpen className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Graphical Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Graph Section (CSS Bar Visuals) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Weekly Quiz Activity</h3>
              <p className="text-xs text-slate-400">Student submissions over the last 7 days</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-md font-medium">Last 7 Days</span>
          </div>

          {/* Graphical Bar Representation */}
          <div className="h-56 flex items-end justify-between gap-2 pt-8 pb-2 border-b border-slate-100">
            {[
              { day: 'Mon', height: '60%', value: '320' },
              { day: 'Tue', height: '85%', value: '450' },
              { day: 'Wed', height: '45%', value: '240' },
              { day: 'Thu', height: '95%', value: '510' },
              { day: 'Fri', height: '75%', value: '390' },
              { day: 'Sat', height: '30%', value: '180' },
              { day: 'Sun', height: '50%', value: '280' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.value}
                </span>
                <div 
                  className="w-full max-w-[36px] bg-indigo-500 hover:bg-indigo-600 rounded-t-md transition-all duration-300" 
                  style={{ height: bar.height }}
                ></div>
                <span className="text-xs text-slate-500 font-medium">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Progress & Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-indigo-600" />
            Grade Distribution
          </h3>

          {/* Big Center Circle Chart */}
          <div className="flex flex-col items-center justify-center my-4">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="54" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle cx="72" cy="72" r="54" stroke="#4f46e5" strokeWidth="12" fill="transparent" strokeDasharray={339} strokeDashoffset={80} strokeLinecap="round" />
                <circle cx="72" cy="72" r="54" stroke="#10b981" strokeWidth="12" fill="transparent" strokeDasharray={339} strokeDashoffset={240} strokeLinecap="round" />
              </svg>
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-slate-800">86%</span>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Passed</p>
              </div>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span> Grade A (80%-100%)
              </span>
              <span className="font-bold text-slate-800">62%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Grade B (60%-79%)
              </span>
              <span className="font-bold text-slate-800">24%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> Needs Improvement
              </span>
              <span className="font-bold text-slate-800">14%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}