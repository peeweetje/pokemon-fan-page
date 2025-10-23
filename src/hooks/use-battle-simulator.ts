import { useState, useRef, useCallback } from 'react';
import {
  Pokemon,
  BattleState,
  resetBattle as resetBattleUtil,
  startBattle as startBattleUtil,
  handleMove as handleMoveUtil,
} from '@/utils/battle-simulator-utils';

export function useBattleSimulator(pokemonList: Pokemon[]) {
  const [battleState, setBattleState] = useState<BattleState>({
    playerPokemon: null,
    opponentPokemon: null,
    playerHP: 100,
    opponentHP: 100,
    battleLog: [],
    isPlayerTurn: true,
  });
  const [showBattleFinishedModal, setShowBattleFinishedModal] = useState(false);
  const [battleId, setBattleId] = useState(0);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setBattleLog = useCallback((log: string[]) => {
    setBattleState((prev) => ({ ...prev, battleLog: log }));
  }, []);

  const resetBattle = useCallback(() => {
    resetBattleUtil(setBattleState, setBattleLog, resetTimeoutRef);
  }, [setBattleLog]);

  const startBattle = useCallback(
    (pokemon: Pokemon) => {
      startBattleUtil(
        pokemon,
        pokemonList,
        setBattleState,
        setShowBattleFinishedModal,
        setBattleId,
        resetTimeoutRef,
      );
    },
    [pokemonList],
  );

  const handleMove = useCallback(
    (move: { name: string; type: string; power: number; accuracy: number }) => {
      handleMoveUtil(
        move,
        battleState,
        setBattleState,
        setShowBattleFinishedModal,
        setBattleId,
        battleId,
        resetBattle,
        resetTimeoutRef,
      );
    },
    [battleState, battleId, resetBattle],
  );

  return {
    battleState,
    showBattleFinishedModal,
    setShowBattleFinishedModal,
    battleId,
    resetBattle,
    startBattle,
    handleMove,
  };
}
