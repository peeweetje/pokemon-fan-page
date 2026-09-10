import { useState, useRef, useCallback, useEffect } from 'react';
import { useBattleScore } from '@/hooks/use-battle-score';
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
  const { addScore } = useBattleScore();
  const recordedBattleIdRef = useRef(0);

  // Record the battle result once, when a finished battle's modal is shown
  useEffect(() => {
    if (
      showBattleFinishedModal &&
      battleId > 0 &&
      recordedBattleIdRef.current !== battleId &&
      battleState.playerPokemon &&
      battleState.opponentPokemon
    ) {
      recordedBattleIdRef.current = battleId;
      addScore({
        result: battleState.opponentHP <= 0 ? 'win' : 'loss',
        playerPokemon: {
          name: battleState.playerPokemon.name,
          sprite: battleState.playerPokemon.sprite,
        },
        opponentPokemon: {
          name: battleState.opponentPokemon.name,
          sprite: battleState.opponentPokemon.sprite,
        },
        playerHP: Math.max(0, battleState.playerHP),
        opponentHP: Math.max(0, battleState.opponentHP),
      });
    }
  }, [
    showBattleFinishedModal,
    battleId,
    battleState.playerPokemon,
    battleState.opponentPokemon,
    battleState.playerHP,
    battleState.opponentHP,
    addScore,
  ]);

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
