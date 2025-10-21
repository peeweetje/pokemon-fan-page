import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useReducedMotion } from 'framer-motion';
import {
  Difficulty,
  playSound,
  formatTime,
  generatePokemonIds,
  generateCards,
  cardBacks,
} from '@/utils/memory-game-helper';

export { formatTime };

interface CardState {
  id: number;
  pokemonId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

interface HighScore {
  moves: number;
  time: number;
  date: string;
  difficulty: string;
}

export function useMemoryGame() {
  const prefersReducedMotion: boolean | undefined =
    useReducedMotion() ?? undefined;

  // Game state
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Settings state
  const [highScores, setHighScores] = useLocalStorage<HighScore[]>(
    'pokemon-memory-highscores',
    [],
  );
  const [selectedCardBack, setSelectedCardBack] = useState(0);
  const [soundEnabled, setSoundEnabled] = useLocalStorage(
    'pokemon-memory-sound',
    true,
  );
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorage(
    'pokemon-memory-animations',
    !prefersReducedMotion,
  );
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>(
    'pokemon-memory-difficulty',
    'medium',
  );

  // Audio state
  const [audio, setAudio] = useState<{
    flip: HTMLAudioElement;
    match: HTMLAudioElement;
    success: HTMLAudioElement;
  } | null>(null);

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const flipSound = new Audio('./sounds/flip.mp3');
      const matchSound = new Audio('./sounds/match.mp3');
      const successSound = new Audio('./sounds/success.mp3');

      // Preload audio
      flipSound.load();
      matchSound.load();
      successSound.load();

      setAudio({
        flip: flipSound,
        match: matchSound,
        success: successSound,
      });

      return () => {
        // Cleanup audio elements
        flipSound.pause();
        matchSound.pause();
        successSound.pause();
      };
    }
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    setIsLoading(true);
    const pokemonIds = generatePokemonIds(difficulty);
    const shuffledCards = generateCards(pokemonIds);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setIsLoading(false);
    setTimer(0);
    setIsTimerRunning(false);
  }, [difficulty]);

  // Initialize game on mount and difficulty change
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isTimerRunning && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, gameOver]);

  // Handle card click
  const handleCardClick = (clickedId: number) => {
    // Start timer on first card click
    if (!isTimerRunning && flippedCards.length === 0 && timer === 0) {
      setIsTimerRunning(true);
    }

    // Don't allow clicking if:
    // - Two cards are already flipped
    // - The card is already matched
    // - The card is already flipped
    const clickedCardIndex = cards.findIndex((card) => card.id === clickedId);
    if (
      flippedCards.length === 2 ||
      cards[clickedCardIndex].isMatched ||
      cards[clickedCardIndex].isFlipped
    ) {
      return;
    }

    playSound('flip', soundEnabled, audio);

    // Flip the clicked card
    const newCards = cards.map((card) =>
      card.id === clickedId ? { ...card, isFlipped: true } : card,
    );
    setCards(newCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, clickedId];
    setFlippedCards(newFlippedCards);

    // If this is the second card
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCardIndex = newCards.findIndex((card) => card.id === firstId);
      const secondCardIndex = newCards.findIndex(
        (card) => card.id === secondId,
      );
      const firstCard = newCards[firstCardIndex];
      const secondCard = newCards[secondCardIndex];

      // Check if the cards match (same pokemonId)
      if (firstCard.pokemonId === secondCard.pokemonId) {
        playSound('match', soundEnabled, audio);
        // Mark both cards as matched
        setCards(
          newCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card,
          ),
        );
        setFlippedCards([]);

        // Check if all cards are matched
        const allMatched = newCards.every(
          (card) =>
            card.id === firstId || card.id === secondId || card.isMatched,
        );
        if (allMatched) {
          playSound('success', soundEnabled, audio);
          setIsTimerRunning(false);
          setGameOver(true);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds

          // Update high scores
          const newScore: HighScore = {
            moves: moves + 1,
            time: timer,
            date: new Date().toLocaleDateString(),
            difficulty: difficulty,
          };
          setHighScores((prev) => {
            const scoresForDifficulty = prev.filter(
              (score) => score.difficulty === difficulty,
            );
            const otherScores = prev.filter(
              (score) => score.difficulty !== difficulty,
            );
            const newScoresForDifficulty = [...scoresForDifficulty, newScore]
              .sort((a, b) => a.moves - b.moves)
              .slice(0, 5);
            return [...otherScores, ...newScoresForDifficulty];
          });
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards(
            newCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card,
            ),
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Reset game
  const resetGame = () => {
    setIsLoading(true);
    const pokemonIds = generatePokemonIds(difficulty);
    const shuffledCards = generateCards(pokemonIds);
    setCards(shuffledCards);
    setIsLoading(false);
    setTimer(0);
    setIsTimerRunning(false);
    setFlippedCards([]);
    setMoves(0);
    setGameOver(false);
    setSelectedCardBack((prev) => (prev + 1) % cardBacks[difficulty].length);
  };

  // Computed values
  const shouldAnimate = animationsEnabled && !prefersReducedMotion;
  const formattedTime = formatTime(timer);

  return {
    // Game state
    cards,
    flippedCards,
    moves,
    gameOver,
    isLoading,
    timer,
    isTimerRunning,
    showConfetti,
    formattedTime,

    // Settings
    difficulty,
    setDifficulty,
    soundEnabled,
    setSoundEnabled,
    animationsEnabled,
    setAnimationsEnabled,
    selectedCardBack,
    highScores,

    // Computed
    shouldAnimate,
    prefersReducedMotion,

    // Actions
    handleCardClick,
    resetGame,
    initializeGame,
  };
}
