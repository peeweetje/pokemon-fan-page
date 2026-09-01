import type { Meta, StoryObj } from '@storybook/react';
import { PokemonSelectionScreen } from './pokemon-selection-screen';
import { Pokemon } from '@/utils/battle-simulator-utils';

const meta: Meta<typeof PokemonSelectionScreen> = {
  title: 'Battle Simulator/Selection Screen',
  component: PokemonSelectionScreen,
  tags: ['autodocs'],
  argTypes: {
    pokemonList: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof PokemonSelectionScreen>;

const mockPokemonList: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
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
      { name: 'vine whip', type: 'grass', power: 45, accuracy: 100 },
    ],
  },
  {
    id: 4,
    name: 'charmander',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
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
  {
    id: 7,
    name: 'squirtle',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    types: ['water'],
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      'special-attack': 50,
      'special-defense': 64,
      speed: 43,
    },
    moves: [
      { name: 'tackle', type: 'normal', power: 40, accuracy: 100 },
      { name: 'water gun', type: 'water', power: 40, accuracy: 100 },
    ],
  },
  {
    id: 25,
    name: 'pikachu',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    types: ['electric'],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      'special-attack': 50,
      'special-defense': 50,
      speed: 90,
    },
    moves: [
      { name: 'thundershock', type: 'electric', power: 40, accuracy: 100 },
      { name: 'quick attack', type: 'normal', power: 40, accuracy: 100 },
    ],
  },
  {
    id: 6,
    name: 'charizard',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    types: ['fire', 'flying'],
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      'special-attack': 109,
      'special-defense': 85,
      speed: 100,
    },
    moves: [
      { name: 'flamethrower', type: 'fire', power: 90, accuracy: 100 },
      { name: 'fly', type: 'flying', power: 90, accuracy: 95 },
    ],
  },
  {
    id: 130,
    name: 'gyarados',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
    types: ['water', 'flying'],
    stats: {
      hp: 95,
      attack: 125,
      defense: 79,
      'special-attack': 60,
      'special-defense': 100,
      speed: 81,
    },
    moves: [
      { name: 'hydro pump', type: 'water', power: 110, accuracy: 80 },
      { name: 'bite', type: 'dark', power: 60, accuracy: 100 },
    ],
  },
];

export const Default: Story = {
  args: {
    pokemonList: mockPokemonList,
    onPokemonSelect: (pokemon) => console.log('Selected:', pokemon),
  },
};

export const WithSearchFilter: Story = {
  args: {
    pokemonList: mockPokemonList,
    onPokemonSelect: (pokemon) => console.log('Selected:', pokemon),
  },
  play: async ({ canvasElement }) => {
    // Note: In a real Storybook scenario, you would interact with the search input
    // This is a placeholder for demonstration
  },
};


