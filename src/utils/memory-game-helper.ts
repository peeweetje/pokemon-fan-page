// Card back designs based on difficulty levels
export const cardBacks = {
  easy: [
    'bg-gradient-to-br from-green-300 to-green-500',
    'bg-gradient-to-br from-green-200 to-green-400',
    'bg-gradient-to-br from-emerald-300 to-emerald-500',
    'bg-gradient-to-br from-emerald-200 to-emerald-400',
  ],
  medium: [
    'bg-gradient-to-br from-orange-200 to-orange-400',
    'bg-gradient-to-br from-orange-100 to-orange-300',
    'bg-gradient-to-br from-amber-200 to-amber-400',
    'bg-gradient-to-br from-amber-100 to-amber-300',
  ],
  hard: [
    'bg-gradient-to-br from-red-300 to-red-500',
    'bg-gradient-to-br from-red-200 to-red-400',
    'bg-gradient-to-br from-rose-300 to-rose-500',
    'bg-gradient-to-br from-rose-200 to-rose-400',
  ],
};

export type Difficulty = 'easy' | 'medium' | 'hard';

// Difficulty settings
export const difficultySettings = {
  easy: { pairs: 6, gridCols: 4 },
  medium: { pairs: 8, gridCols: 4 },
  hard: { pairs: 12, gridCols: 6 },
};

// Play sound if enabled
export const playSound = (
  soundType: 'flip' | 'match' | 'success',
  soundEnabled: boolean,
  audio: {
    flip: HTMLAudioElement;
    match: HTMLAudioElement;
    success: HTMLAudioElement;
  } | null,
) => {
  if (soundEnabled && audio) {
    audio[soundType].play().catch((error) => {
      console.warn('Failed to play sound:', error);
    });
  }
};

// Format time as MM:SS
export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs
    .toString()
    .padStart(2, '0')}`;
};

// Generate random Pokemon IDs for the game
export const generatePokemonIds = (difficulty: Difficulty) => {
  const ids = new Set<number>();
  const { pairs } = difficultySettings[difficulty];
  while (ids.size < pairs) {
    ids.add(Math.floor(Math.random() * 100) + 1);
  }
  return Array.from(ids);
};

// Generate shuffled cards from Pokemon IDs
export const generateCards = (pokemonIds: number[]) => {
  const gameCards: {
    id: number;
    pokemonId: number;
    isFlipped: boolean;
    isMatched: boolean;
  }[] = [];

  // Create pairs of cards with the same pokemonId
  pokemonIds.forEach((pokemonId, index) => {
    // Create two cards with the same pokemonId for matching
    gameCards.push(
      { id: index * 2, pokemonId, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, pokemonId, isFlipped: false, isMatched: false },
    );
  });

  // Shuffle cards
  return gameCards.sort(() => Math.random() - 0.5);
};
