'use client';

import React from 'react';
import DashboardMetrics from '@/components/DashboardMetrics';
import QuizSettings from '@/components/QuizSettings';
import QuestionEditor from '@/components/QuestionEditor';

export default function Home() {
  return (
    <div className="space-y-10">
      
      {/* 1. Top Metrics Component */}
      <DashboardMetrics />

      {/* 2. Quiz Settings Component */}
      <section className="border-t border-slate-200 pt-8">
        <QuizSettings />
      </section>

      {/* 3. Question Builder Component */}
      <section className="border-t border-slate-200 pt-8">
        <QuestionEditor />
      </section>

    </div>
  );
}