
import type { Meta, StoryObj } from '@storybook/react';
import { PokemonMemoryGame } from './pokemon-memory-game';

const meta: Meta<typeof PokemonMemoryGame> = {
    title: 'Components/PokemonMemoryGame',
    component: PokemonMemoryGame,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    }
};

export default meta;
type Story = StoryObj<typeof PokemonMemoryGame>;

export const Default: Story = {
    args: {},
};
