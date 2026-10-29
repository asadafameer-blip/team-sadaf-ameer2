'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, Users, Trophy } from 'lucide-react';

export default function DashboardMetrics() {
  // Mock summary metrics for the instructor dashboard overview
  const stats = [
    { label: 'Total Quizzes', value: '12', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Quizzes', value: '8', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Students Attempted', value: '342', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg. Completion Rate', value: '84%', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">Instructor Dashboard</h2>
        <p className="text-xs text-slate-500">Quick overview of your active quizzes and student participation.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white border-slate-200 shadow-sm rounded-2xl">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}