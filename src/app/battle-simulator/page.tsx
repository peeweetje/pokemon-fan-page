'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from '@/components/ui/pagination';

// Pokemon type colors
const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  default: '#68A090',
};

interface Pokemon {
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

interface BattleState {
  playerPokemon: Pokemon | null;
  opponentPokemon: Pokemon | null;
  playerHP: number;
  opponentHP: number;
  battleLog: string[];
  isPlayerTurn: boolean;
}

export default function BattleSimulator() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [battleState, setBattleState] = useState<BattleState>({
    playerPokemon: null,
    opponentPokemon: null,
    playerHP: 100,
    opponentHP: 100,
    battleLog: [],
    isPlayerTurn: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 12;

  const resetBattle = () => {
    setBattleState((prev) => ({
      ...prev,
      battleLog: [...prev.battleLog, 'Back to the Pokemons!'],
    }));
    setTimeout(() => {
      setBattleState({
        playerPokemon: null,
        opponentPokemon: null,
        playerHP: 100,
        opponentHP: 100,
        battleLog: [],
        isPlayerTurn: true,
      });
    }, 2000);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=151'
        );
        const data = await response.json();

        const pokemonDetails = await Promise.all(
          // eslint-disable @typescript-eslint/no-explicit-any
          data.results.map(async (pokemon: any) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();

            // Get moves (limit to 4)
            const moves = await Promise.all(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              details.moves.slice(0, 4).map(async (move: any) => {
                const moveResponse = await fetch(move.move.url);
                const moveData = await moveResponse.json();
                return {
                  name: moveData.name,
                  type: moveData.type.name,
                  power: moveData.power || 0,
                  accuracy: moveData.accuracy || 100,
                };
              })
            );

            return {
              id: details.id,
              name: details.name,
              sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png`,
              types: details.types.map((t: any) => t.type.name),
              stats: {
                hp: details.stats[0].base_stat,
                attack: details.stats[1].base_stat,
                defense: details.stats[2].base_stat,
                'special-attack': details.stats[3].base_stat,
                'special-defense': details.stats[4].base_stat,
                speed: details.stats[5].base_stat,
              },
              moves,
            };
          })
        );

        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const startBattle = (pokemon: Pokemon) => {
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
  };

  function handleMove(
    move: { name: string; type: string; power: number; accuracy: number },
    battleState: BattleState,
    setBattleState: React.Dispatch<React.SetStateAction<BattleState>>,
    resetBattle: () => void
  ) {
    if (
      !battleState.isPlayerTurn ||
      !battleState.playerPokemon ||
      !battleState.opponentPokemon
    )
      return;

    // Calculate damage (simplified)
    const damage = Math.floor(
      (move.power * battleState.playerPokemon.stats.attack) /
        battleState.opponentPokemon.stats.defense
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
        // Reset battle after a delay
        setTimeout(resetBattle, 8000);
        return;
      }

      // Opponent uses a random move
      const opponentMove =
        battleState.opponentPokemon!.moves[
          Math.floor(Math.random() * battleState.opponentPokemon!.moves.length)
        ];
      const opponentDamage = Math.floor(
        (opponentMove.power * battleState.opponentPokemon!.stats.attack) /
          battleState.playerPokemon!.stats.defense
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
        // Reset battle after a delay
        setTimeout(resetBattle, 8000);
      }
    }, 1000);
  }

  // Filter Pokemon based on search query
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination for filtered Pokemon
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  // Reset current page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen bg-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <Link
            className={buttonVariants({ variant: 'outline' })}
            size='lg'
            href='/'
          >
            <ChevronLeft className='h-4 w-4' />
            Back to Home
          </Link>
          <h1 className='text-4xl font-bold text-gray-800 text-center'>
            Battle Simulator
          </h1>
          <div className='w-[100px]'></div>
        </div>

        {!battleState.playerPokemon ? (
          <>
            {/* Search Bar */}
            <div className='mb-6'>
              <div className='relative max-w-md mx-auto'>
                <Input
                  type='text'
                  placeholder='Search Pokemon...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              </div>
            </div>

            {/* Pokemon Selection Screen */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {currentPokemon.map((pokemon) => (
                <motion.div
                  key={pokemon.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className='cursor-pointer p-4 relative overflow-hidden'
                    onClick={() => startBattle(pokemon)}
                  >
                    {/* Background color based on Pokemon type */}
                    <div
                      className='absolute inset-0 z-0'
                      style={{
                        backgroundColor: `${
                          typeColors[
                            pokemon.types[0] as keyof typeof typeColors
                          ] || typeColors.default
                        }15`,
                      }}
                    ></div>

                    {/* Pokeball background design */}
                    <div className='absolute top-0 right-0 w-16 h-16 opacity-10 z-0'>
                      <div className='w-full h-full rounded-full border-[6px] border-black relative'>
                        <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
                      </div>
                    </div>

                    <div className='relative z-10'>
                      <div className='relative w-32 h-32 mx-auto'>
                        <Image
                          src={pokemon.sprite}
                          alt={pokemon.name}
                          fill
                          className='object-contain'
                        />
                      </div>
                      <h3 className='text-center font-semibold capitalize mt-2'>
                        {pokemon.name}
                      </h3>
                      <div className='flex justify-center gap-2 mt-2'>
                        {pokemon.types.map((type) => (
                          <span
                            key={type}
                            className='px-2 py-1 text-xs font-medium text-white rounded-full capitalize'
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
            {totalPages > 1 && (
              <div className='mt-8 flex justify-center'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={`${
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer hover:bg-gray-100'
                        }`}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        // Show first page, last page, current page, and pages around current page
                        const shouldShow =
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(currentPage - page) <= 1;

                        if (!shouldShow) {
                          if (page === 2 || page === totalPages - 1) {
                            return (
                              <PaginationItem key={page}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            );
                          }
                          return null;
                        }

                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className='cursor-pointer hover:bg-gray-100'
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        className={`${
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-50'
                            : 'cursor-pointer hover:bg-gray-100'
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          // Battle Screen
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Battle Arena */}
            <div className='rounded-lg p-6 relative overflow-hidden'>
              {/* Background color based on player's Pokemon type */}
              <div
                className='absolute inset-0 z-0'
                style={{
                  backgroundColor: `${
                    typeColors[
                      battleState.playerPokemon
                        .types[0] as keyof typeof typeColors
                    ] || typeColors.default
                  }15`,
                }}
              ></div>

              {/* Pokeball background design */}
              <div className='absolute top-0 right-0 w-16 h-16 opacity-10 z-0'>
                <div className='w-full h-full rounded-full border-[6px] border-black relative'>
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
                </div>
              </div>

              <div className='relative z-10'>
                <div className='relative h-64 mb-4'>
                  {/* Opponent Pokemon */}
                  <div className='absolute top-0 right-0'>
                    <div className='relative w-32 h-32'>
                      <Image
                        src={battleState.opponentPokemon.sprite}
                        alt={battleState.opponentPokemon.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <div className='text-right'>
                      <h3 className='font-semibold capitalize'>
                        {battleState.opponentPokemon.name}
                      </h3>
                      <Progress
                        value={battleState.opponentHP}
                        className='w-32'
                      />
                    </div>
                  </div>

                  {/* Player Pokemon */}
                  <div className='absolute bottom-0 left-0'>
                    <div className='relative w-32 h-32'>
                      <Image
                        src={battleState.playerPokemon.sprite}
                        alt={battleState.playerPokemon.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                    <div>
                      <h3 className='font-semibold capitalize'>
                        {battleState.playerPokemon.name}
                      </h3>
                      <Progress value={battleState.playerHP} className='w-32' />
                    </div>
                  </div>
                </div>

                {/* Battle Log */}
                <div className='bg-white/80 backdrop-blur-sm rounded-lg p-4 h-32 overflow-y-auto'>
                  {battleState.battleLog.map((log, index) => (
                    <p key={index} className='text-sm mb-1'>
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Moves */}
            <div className='grid grid-cols-2 gap-4'>
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
                  onClick={() =>
                    battleState.isPlayerTurn &&
                    handleMove(move, battleState, setBattleState, resetBattle)
                  }
                  disabled={!battleState.isPlayerTurn}
                >
                  <div className='text-sm'>{move.name}</div>
                  <div className='text-xs opacity-75'>
                    Power: {move.power} | Acc: {move.accuracy}%
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
