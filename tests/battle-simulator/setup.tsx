import { vi } from 'vitest';

// Mock the useBattleSimulator hook
vi.mock('@/hooks/use-battle-simulator', () => ({
  useBattleSimulator: vi.fn(() => ({
    battleState: {
      playerPokemon: null,
      opponentPokemon: null,
      playerHP: 100,
      opponentHP: 100,
      battleLog: [],
      isPlayerTurn: true,
    },
    showBattleFinishedModal: false,
    setShowBattleFinishedModal: vi.fn(),
    battleId: 1,
    resetBattle: vi.fn(),
    startBattle: vi.fn(),
    handleMove: vi.fn(),
  })),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock components
vi.mock('@/app/battle-simulator/battle-finished-modal', () => ({
  BattleFinishedModal: ({ isVisible, onClose, onReset }: any) => 
    isVisible ? (
      <div data-testid="battle-finished-modal">
        <button onClick={onClose}>Close</button>
        <button onClick={onReset}>Reset</button>
      </div>
    ) : null,
}));

vi.mock('@/app/battle-simulator/pokemon-battle-details', () => ({
  PokemonBattleDetails: ({ pokemon, hp, isOpponent }: any) => 
    pokemon ? (
      <div data-testid={`pokemon-details-${isOpponent ? 'opponent' : 'player'}`}>
        <span>{pokemon.name}</span>
        <span>HP: {hp}</span>
      </div>
    ) : null,
}));

vi.mock('@/app/battle-simulator/pokemon-selection-screen', () => ({
  PokemonSelectionScreen: ({ pokemonList, onPokemonSelect }: any) => (
    <div data-testid="pokemon-selection-screen">
      <button onClick={() => onPokemonSelect(pokemonList[0])}>
        Select {pokemonList[0]?.name}
      </button>
    </div>
  ),
}));

// Shared test data
export const mockPokemonList = [
  {
    id: 1,
    name: 'bulbasaur',
    sprite: 'https://example.com/bulbasaur.png',
    types: ['grass', 'poison'],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      'special-attack': 65,
      'special-defense': 65,
      speed: 45,
    },
    moves: [
      { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
      { name: 'vine-whip', type: 'grass', power: 45, accuracy: 100 },
    ],
  },
  {
    id: 4,
    name: 'charmander',
    sprite: 'https://example.com/charmander.png',
    types: ['fire'],
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      'special-attack': 60,
      'special-defense': 50,
      speed: 65,
    },
    moves: [
      { name: 'scratch', type: 'normal', power: 40, accuracy: 100 },
      { name: 'ember', type: 'fire', power: 40, accuracy: 100 },
    ],
  },
];