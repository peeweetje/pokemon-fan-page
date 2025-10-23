'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PokemonSearch } from '@/components/pokemon-search';
import { PokemonPagination } from '@/components/pokemon-grid/pokemon-pagination';
import { BattleFinishedModal } from '@/app/battle-simulator/battle-finished-modal';
import { PokemonBattleDetails } from '@/app/battle-simulator/pokemon-battle-details';
import { typeColors } from '@/utils/pokemon-type-colors';
import { useBattleSimulator } from '@/hooks/use-battle-simulator';
import { Pokemon } from '@/utils/battle-simulator-utils';

interface BattleSimulatorClientProps {
  pokemonList: Pokemon[];
}

export function BattleSimulatorClient({
  pokemonList,
}: BattleSimulatorClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 12;

  const {
    battleState,
    showBattleFinishedModal,
    setShowBattleFinishedModal,
    battleId,
    resetBattle,
    startBattle,
    handleMove,
  } = useBattleSimulator(pokemonList);

  // Filter Pokemon based on search query
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate pagination for filtered Pokemon
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Handle search with PokemonSearch component
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

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
        <>
          {/* Search Bar */}
          <PokemonSearch onSearch={handleSearch} />

          {/* Pokemon Selection Screen */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentPokemon.map((pokemon) => (
              <motion.div
                key={pokemon.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="cursor-pointer p-4 relative overflow-hidden"
                  onClick={() => startBattle(pokemon)}
                >
                  {/* Background color based on Pokemon type */}
                  <div
                    className="absolute inset-0 z-0"
                    style={{
                      backgroundColor: `${
                        typeColors[
                          pokemon.types[0] as keyof typeof typeColors
                        ] || typeColors.default
                      }15`,
                    }}
                  ></div>

                  <div className="relative z-10">
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={pokemon.sprite}
                        alt={pokemon.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center font-semibold capitalize mt-2">
                      {pokemon.name}
                    </h3>
                    <div className="flex justify-center gap-2 mt-2">
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 text-xs font-medium text-white rounded-full capitalize"
                          style={{
                            backgroundColor:
                              typeColors[type as keyof typeof typeColors] ||
                              typeColors.default,
                          }}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <PokemonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
        </>
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
