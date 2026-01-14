
import type { Meta, StoryObj } from '@storybook/react';
import { PokemonGrid } from './pokemon-grid';

const meta: Meta<typeof PokemonGrid> = {
    title: 'Components/Pokemon Grid',
    component: PokemonGrid,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;
type Story = StoryObj<typeof PokemonGrid>;

const mockPokemon = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
];

export const Default: Story = {
    args: {
        initialPokemon: mockPokemon,
    },
};


