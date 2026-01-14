import type { Meta, StoryObj } from '@storybook/react';
import { PokemonQuizLoader } from './pokemon-quiz-loader';

const meta = {
    title: 'Pokemon Quiz/Loader',
    component: PokemonQuizLoader,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof PokemonQuizLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
