import { useRef } from 'react';

interface BattleFinishedModalProps {
  isVisible: boolean;
  battleResult: 'win' | 'loss' | null;
  onClose: () => void;
  onReset: () => void;
  battleId: number;
  currentBattleId: number;
}

export function BattleFinishedModal({
  isVisible,
  battleResult,
  onClose,
  onReset,
  battleId,
  currentBattleId,
}: BattleFinishedModalProps) {
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      onReset();
    }
  };

  // Auto-close modal after 8 seconds if it's still the current battle
  if (isVisible && battleResult) {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    resetTimeoutRef.current = setTimeout(() => {
      if (battleId === currentBattleId) {
        onClose();
        onReset();
      }
    }, 8000);
  }

  if (!isVisible || !battleResult) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Battle Finished!</h2>
        <p className="mb-2 text-gray-600">
          {battleResult === 'win' ? 'You won!' : 'You lost!'}
        </p>
        <p className="mb-6">Return to the Pokemons</p>
        <button
          autoFocus
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={handleClose}
        >
          Back to Pokemons
        </button>
      </div>
    </div>
  );
}
