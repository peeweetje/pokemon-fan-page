import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export default function QuizProgress({
  currentQuestion,
  totalQuestions,
  score,
}: QuizProgressProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-700 text-sm font-semibold">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-700 text-sm font-semibold">
          {/* Star icon */}
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7L5.8 21l1.6-7L2 9.3l7.1-.7z" />
          </svg>
          Score: {score}
        </span>
      </div>
      <Progress
        value={(currentQuestion / totalQuestions) * 100}
        className="h-3 bg-green-100"
        indicatorClassName="bg-linear-to-r from-emerald-400 to-green-500"
      />
      <div className="mt-1.5 text-right text-xs font-medium text-gray-400">
        {Math.round((currentQuestion / totalQuestions) * 100)}%
      </div>
    </div>
  );
}
