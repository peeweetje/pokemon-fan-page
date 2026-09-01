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
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="text-sm font-medium text-gray-600">
          Score: {score}
        </span>
      </div>
      <Progress
        value={(currentQuestion / totalQuestions) * 100}
        className="bg-gray-300 [&>div]:bg-green-500"
      />
    </div>
  );
}
