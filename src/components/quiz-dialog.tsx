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
      <DialogContent className="sm:max-w-md">
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
              : score >= totalQuestions * 0.7
              ? 'Great job! You know your Pokemon! 🌟'
              : "Keep studying! You'll be a Pokemon Master soon! 💪"}
          </p>
          <Button
            onClick={onOpenChange}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
