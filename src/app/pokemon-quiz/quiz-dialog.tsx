import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuizDialogProps {
  open: boolean;
  onOpenChange: () => void;
  score: number;
  totalQuestions: number;
}

export function QuizDialog({
  open,
  onOpenChange,
  score,
  totalQuestions,
}: QuizDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        {/* Decorative gradient banner */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-red-500 via-amber-400 to-green-500" />
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-100/60 blur-2xl" />

        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800">
            Quiz Completed!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your score: {score} out of {totalQuestions}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center">
          <p className="text-gray-600 mb-6 font-medium">
            {score === totalQuestions
              ? "Perfect score! You're a Pokemon Master! 🏆"
              : score >= totalQuestions * 0.5
              ? 'Great job! You know your Pokemon! 🌟'
              : "Keep studying! You'll be a Pokemon Master soon! 💪"}
          </p>
          <Button
            onClick={onOpenChange}
            className="w-full bg-linear-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-500 hover:via-orange-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
