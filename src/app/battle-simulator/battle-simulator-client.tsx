'use client';

import { motion } from 'framer-motion';
import { BattleFinishedModal } from '@/app/battle-simulator/battle-finished-modal';
import { PokemonBattleDetails } from '@/app/battle-simulator/pokemon-battle-details';
import { PokemonSelectionScreen } from '@/app/battle-simulator/pokemon-selection-screen';
import { typeColors } from '@/utils/pokemon-type-colors';
import { useBattleSimulator } from '@/hooks/use-battle-simulator';
import { Pokemon } from '@/utils/battle-simulator-utils';

interface BattleSimulatorClientProps {
  pokemonList: Pokemon[];
}

export function BattleSimulatorClient({
  pokemonList,
}: BattleSimulatorClientProps) {
  const {
    battleState,
    showBattleFinishedModal,
    setShowBattleFinishedModal,
    battleId,
    resetBattle,
    startBattle,
    handleMove,
  } = useBattleSimulator(pokemonList);

  return (
    <>
      {/* Battle Finished Modal */}
      <BattleFinishedModal
        isVisible={showBattleFinishedModal}
        battleResult={battleState.opponentHP <= 0 ? 'win' : 'loss'}
        onClose={() => setShowBattleFinishedModal(false)}
        onReset={resetBattle}
        battleId={battleId}
        currentBattleId={battleId}
      />

      {!battleState.playerPokemon ? (
        <PokemonSelectionScreen
          pokemonList={pokemonList}
          onPokemonSelect={startBattle}
        />
      ) : (
        // Battle Screen
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Battle Arena */}
          <div className="rounded-lg p-6 relative overflow-hidden">
            {/* Background color based on player's Pokemon type */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundColor: `${
                  typeColors[
                    battleState.playerPokemon
                      .types[0] as keyof typeof typeColors
                  ] || typeColors.default
                }15`,
              }}
            ></div>

            <div className="relative z-10">
              <div className="relative h-64 mb-4">
                <PokemonBattleDetails
                  pokemon={battleState.opponentPokemon}
                  hp={battleState.opponentHP}
                  isOpponent={true}
                />

                <PokemonBattleDetails
                  pokemon={battleState.playerPokemon}
                  hp={battleState.playerHP}
                  isOpponent={false}
                />
              </div>

              {/* Battle Log */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 h-32 overflow-y-auto">
                {battleState.battleLog.map((log, index) => (
                  <p key={index} className="text-sm mb-1">
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Moves */}
          <div className="grid grid-cols-2 gap-4">
            {battleState.playerPokemon.moves.map((move) => (
              <motion.button
                key={move.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg text-white font-medium capitalize ${
                  !battleState.isPlayerTurn
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                style={{
                  backgroundColor:
                    typeColors[move.type as keyof typeof typeColors] ||
                    typeColors.default,
                }}
                onClick={() => battleState.isPlayerTurn && handleMove(move)}
                disabled={!battleState.isPlayerTurn}
              >
                <div className="text-sm">{move.name}</div>
                <div className="text-xs opacity-75">
                  Power: {move.power} | Acc: {move.accuracy}%
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
