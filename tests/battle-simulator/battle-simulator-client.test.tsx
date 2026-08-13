import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import './setup';
import { BattleSimulatorClient } from '@/app/battle-simulator/battle-simulator-client';
import { useBattleSimulator } from '@/hooks/use-battle-simulator';
import { mockPokemonList } from './setup';
import type { Pokemon } from '@/utils/battle-simulator-utils';

type BattleSimulatorHookState = {
  battleState: {
    playerPokemon: Pokemon | null;
    opponentPokemon: Pokemon | null;
    playerHP: number;
    opponentHP: number;
    battleLog: string[];
    isPlayerTurn: boolean;
  };
  showBattleFinishedModal: boolean;
  setShowBattleFinishedModal: (show: boolean) => void;
  battleId: number;
  resetBattle: () => void;
  startBattle: (pokemon: Pokemon) => void;
  handleMove: (move: Pokemon['moves'][number]) => void;
};

function defaultHookState(): BattleSimulatorHookState {
  return {
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
    battleId: 0,
    resetBattle: vi.fn(),
    startBattle: vi.fn(),
    handleMove: vi.fn(),
  };
}

type HookOverrides = Partial<Omit<BattleSimulatorHookState, 'battleState'>> & {
  battleState?: Partial<BattleSimulatorHookState['battleState']>;
};

function createHookState(overrides: HookOverrides = {}): BattleSimulatorHookState {
  const base = defaultHookState();
  return {
    ...base,
    ...overrides,
    battleState: {
      ...base.battleState,
      ...(overrides.battleState ?? {}),
    },
  };
}

// The imported `useBattleSimulator` is the mocked function defined in ./setup,
// so we cast it to a small helper to reconfigure its return value per test.
const mockedUseBattleSimulator = useBattleSimulator as unknown as {
  mockReturnValue: (state: BattleSimulatorHookState) => void;
  mockImplementation: (impl: () => BattleSimulatorHookState) => void;
};

describe('BattleSimulatorClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseBattleSimulator.mockImplementation(() => defaultHookState());
  });

  describe('selection screen', () => {
    test('renders without crashing', () => {
      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      expect(screen.getByTestId('pokemon-selection-screen')).toBeInTheDocument();
      // Battle finished modal is hidden by default
      expect(screen.queryByTestId('battle-finished-modal')).not.toBeInTheDocument();
    });

    test('renders PokemonSelectionScreen when no player Pokemon is selected', () => {
      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      expect(screen.getByTestId('pokemon-selection-screen')).toBeInTheDocument();
      // Battle screen (moves) should not be rendered
      expect(screen.queryByText(/Power:/)).not.toBeInTheDocument();
    });

    test('calls startBattle with the selected Pokemon when a Pokemon is chosen', () => {
      const startBattle = vi.fn();
      mockedUseBattleSimulator.mockReturnValue(createHookState({ startBattle }));

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      fireEvent.click(screen.getByRole('button', { name: /select bulbasaur/i }));

      expect(startBattle).toHaveBeenCalledTimes(1);
      expect(startBattle).toHaveBeenCalledWith(mockPokemonList[0]);
    });
  });

  describe('battle screen', () => {
    test('renders the battle screen once a player Pokemon is selected', () => {
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      // Selection screen is replaced by the battle screen
      expect(screen.queryByTestId('pokemon-selection-screen')).not.toBeInTheDocument();
      expect(screen.getByTestId('pokemon-details-player')).toBeInTheDocument();
      expect(screen.getByTestId('pokemon-details-opponent')).toBeInTheDocument();
    });

    test('renders player and opponent battle details with the correct HP', () => {
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            playerHP: 75,
            opponentHP: 40,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      expect(screen.getByText('HP: 75')).toBeInTheDocument();
      expect(screen.getByText('HP: 40')).toBeInTheDocument();
    });

    test('renders all of the player’s available moves with their stats', () => {
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      mockPokemonList[0].moves.forEach((move) => {
        expect(
          screen.getByRole('button', { name: new RegExp(move.name, 'i') }),
        ).toBeInTheDocument();
        expect(
          screen.getByText(`Power: ${move.power} | Acc: ${move.accuracy}%`),
        ).toBeInTheDocument();
      });
    });

    test('calls handleMove with the selected move when it is the player’s turn', () => {
      const handleMove = vi.fn();
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          handleMove,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            isPlayerTurn: true,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      fireEvent.click(screen.getByRole('button', { name: /tackle/i }));

      expect(handleMove).toHaveBeenCalledTimes(1);
      expect(handleMove).toHaveBeenCalledWith(mockPokemonList[0].moves[0]);
    });

    test('disables move buttons and does not call handleMove when it is not the player’s turn', () => {
      const handleMove = vi.fn();
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          handleMove,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            isPlayerTurn: false,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      const moveButton = screen.getByRole('button', { name: /tackle/i });
      expect(moveButton).toBeDisabled();

      fireEvent.click(moveButton);

      expect(handleMove).not.toHaveBeenCalled();
    });

    test('renders the battle log entries', () => {
      const battleLog = [
        'A wild charmander appeared!',
        'bulbasaur used tackle!',
        'charmander used ember!',
      ];
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            battleLog,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      battleLog.forEach((entry) => {
        expect(screen.getByText(entry)).toBeInTheDocument();
      });
    });
  });

  describe('battle finished modal', () => {
    test('shows a win modal when the opponent HP reaches 0', () => {
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          showBattleFinishedModal: true,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            opponentHP: 0,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      const modal = screen.getByTestId('battle-finished-modal');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('data-result', 'win');
      expect(screen.getByText('Result: win')).toBeInTheDocument();
    });

    test('shows a loss modal when the opponent is still alive', () => {
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          showBattleFinishedModal: true,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            opponentHP: 25,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      const modal = screen.getByTestId('battle-finished-modal');
      expect(modal).toHaveAttribute('data-result', 'loss');
      expect(screen.getByText('Result: loss')).toBeInTheDocument();
    });

    test('passes the battleId to the battle finished modal', () => {
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          showBattleFinishedModal: true,
          battleId: 7,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            opponentHP: 0,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      const modal = screen.getByTestId('battle-finished-modal');
      expect(modal).toHaveAttribute('data-battle-id', '7');
      expect(modal).toHaveAttribute('data-current-battle-id', '7');
    });

    test('closing the modal calls setShowBattleFinishedModal(false)', () => {
      const setShowBattleFinishedModal = vi.fn();
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          showBattleFinishedModal: true,
          setShowBattleFinishedModal,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            opponentHP: 0,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      fireEvent.click(screen.getByRole('button', { name: /close/i }));

      expect(setShowBattleFinishedModal).toHaveBeenCalledTimes(1);
      expect(setShowBattleFinishedModal).toHaveBeenCalledWith(false);
    });

    test('resetting from the modal calls resetBattle', () => {
      const resetBattle = vi.fn();
      mockedUseBattleSimulator.mockReturnValue(
        createHookState({
          showBattleFinishedModal: true,
          resetBattle,
          battleState: {
            playerPokemon: mockPokemonList[0],
            opponentPokemon: mockPokemonList[1],
            opponentHP: 0,
          },
        }),
      );

      render(<BattleSimulatorClient pokemonList={mockPokemonList} />);

      fireEvent.click(screen.getByRole('button', { name: /reset/i }));

      expect(resetBattle).toHaveBeenCalledTimes(1);
    });
  });
});
