import QuizSettings from '@/components/QuizSettings';
import QuestionEditor from '@/components/QuestionEditor';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Quiz Builder Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure your quiz settings and build questions below.
          </p>
        </header>

        {/* 1. Quiz Settings Section */}
        <QuizSettings />

        {/* 2. Question Editor Section */}
        <QuestionEditor />
      </div>
    </main>
  );
}