import type { Meta, StoryObj } from '@storybook/react-vite';
import PokemonDescription from './pokemon-description';

const meta: Meta<typeof PokemonDescription> = {
    title: 'Pokemon/Description',
    component: PokemonDescription,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonDescription>;

export const Default: Story = {
    args: {
        flavorText: "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
    },
};
