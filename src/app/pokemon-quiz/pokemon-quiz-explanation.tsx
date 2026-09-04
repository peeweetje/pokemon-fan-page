'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PokemonQuizExplanationProps {
  explanation: string;
  show: boolean;
  hasNext: boolean;
  onNext: () => void;
}

export function PokemonQuizExplanation({
  explanation,
  show,
  hasNext,
  onNext,
}: PokemonQuizExplanationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border border-rose-200 shadow-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3"
          >
            <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-orange-500 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-rose-500 mb-1">
                Explanation
              </p>
              <p className="text-gray-700 leading-relaxed">{explanation}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              className="mt-5 w-full bg-linear-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-500 hover:via-orange-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
              onClick={onNext}
            >
              {hasNext ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
