export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
  moves: {
    name: string;
    type: string;
    power: number;
    accuracy: number;
  }[];
}

export interface BattleState {
  playerPokemon: Pokemon | null;
  opponentPokemon: Pokemon | null;
  playerHP: number;
  opponentHP: number;
  battleLog: string[];
  isPlayerTurn: boolean;
}

export function calculateDamage(
  movePower: number,
  attackerAttack: number,
  defenderDefense: number,
): number {
  return Math.floor((movePower * attackerAttack) / defenderDefense);
}

export function resetBattle(
  setBattleState: React.Dispatch<React.SetStateAction<BattleState>>,
  setBattleLog: (log: string[]) => void,
  resetTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
): void {
  setBattleLog(['Back to the Pokemons!']);
  if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
  resetTimeoutRef.current = setTimeout(() => {
    setBattleState({
      playerPokemon: null,
      opponentPokemon: null,
      playerHP: 100,
      opponentHP: 100,
      battleLog: [],
      isPlayerTurn: true,
    });
  }, 2000);
}

export function startBattle(
  pokemon: Pokemon,
  pokemonList: Pokemon[],
  setBattleState: React.Dispatch<React.SetStateAction<BattleState>>,
  setShowBattleFinishedModal: (show: boolean) => void,
  setBattleId: React.Dispatch<React.SetStateAction<number>>,
  resetTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
): void {
  // Clear any pending reset and close modal
  if (resetTimeoutRef.current) {
    clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = null;
  }
  setShowBattleFinishedModal(false);
  setBattleId((prev) => prev + 1); // increment battleId

  // Select a random opponent
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  const opponent = pokemonList[randomIndex];

  setBattleState({
    playerPokemon: pokemon,
    opponentPokemon: opponent,
    playerHP: 100,
    opponentHP: 100,
    battleLog: [`A wild ${opponent.name} appeared!`],
    isPlayerTurn: true,
  });
}

export function handleMove(
  move: { name: string; type: string; power: number; accuracy: number },
  battleState: BattleState,
  setBattleState: React.Dispatch<React.SetStateAction<BattleState>>,
  setShowBattleFinishedModal: (show: boolean) => void,
  setBattleId: React.Dispatch<React.SetStateAction<number>>,
  battleId: number,
  resetBattle: () => void,
  resetTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
): void {
  if (
    !battleState.isPlayerTurn ||
    !battleState.playerPokemon ||
    !battleState.opponentPokemon
  )
    return;

  // Calculate damage (simplified)
  const damage = calculateDamage(
    move.power,
    battleState.playerPokemon.stats.attack,
    battleState.opponentPokemon.stats.defense,
  );
  const newOpponentHP = Math.max(0, battleState.opponentHP - damage);

  setBattleState((prev) => ({
    ...prev,
    opponentHP: newOpponentHP,
    battleLog: [
      ...prev.battleLog,
      `${prev.playerPokemon!.name} used ${move.name}!`,
    ],
    isPlayerTurn: false,
  }));

  // Opponent's turn after a delay
  setTimeout(() => {
    if (newOpponentHP <= 0) {
      setBattleState((prev) => ({
        ...prev,
        battleLog: [
          ...prev.battleLog,
          `${prev.opponentPokemon!.name} fainted!`,
          'Battle finished!',
        ],
      }));
      setShowBattleFinishedModal(true);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      const thisBattleId = battleId;
      resetTimeoutRef.current = setTimeout(() => {
        if (battleId === thisBattleId) {
          setShowBattleFinishedModal(false);
          resetBattle();
        }
      }, 8000);
      return;
    }

    // Opponent uses a random move
    const opponentMove =
      battleState.opponentPokemon!.moves[
        Math.floor(Math.random() * battleState.opponentPokemon!.moves.length)
      ];
    const opponentDamage = calculateDamage(
      opponentMove.power,
      battleState.opponentPokemon!.stats.attack,
      battleState.playerPokemon!.stats.defense,
    );
    const newPlayerHP = Math.max(0, battleState.playerHP - opponentDamage);

    setBattleState((prev) => ({
      ...prev,
      playerHP: newPlayerHP,
      battleLog: [
        ...prev.battleLog,
        `${prev.opponentPokemon!.name} used ${opponentMove.name}!`,
      ],
      isPlayerTurn: true,
    }));

    if (newPlayerHP <= 0) {
      setBattleState((prev) => ({
        ...prev,
        battleLog: [
          ...prev.battleLog,
          `${prev.playerPokemon!.name} fainted!`,
          'Battle finished!',
        ],
      }));
      setShowBattleFinishedModal(true);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
      const thisBattleId = battleId;
      resetTimeoutRef.current = setTimeout(() => {
        if (battleId === thisBattleId) {
          setShowBattleFinishedModal(false);
          resetBattle();
        }
      }, 8000);
    }
  }, 1200); // Slight delay increase to improve battle pacing
}
