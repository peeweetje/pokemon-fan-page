import type { Meta, StoryObj } from '@storybook/react';
import { MemoryCard } from './memory-card';


const meta = {
    title: 'Components/Pokemon Memory Game/Memory Card',
    component: MemoryCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        difficulty: {
            control: 'select',
            options: ['easy', 'medium', 'hard'],
        },
        selectedCardBack: { control: 'number', min: 0, max: 3 },
    },
    args: {
        onClick: () => { },
    },
} satisfies Meta<typeof MemoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const pikachuCard = {
    id: 1,
    pokemonId: 25, // Pikachu
    isFlipped: false,
    isMatched: false,
};

export const CardBack: Story = {
    args: {
        card: pikachuCard,
        difficulty: 'easy',
        selectedCardBack: 0,
        shouldAnimate: true,
    },
};

export const CardFront: Story = {
    args: {
        card: { ...pikachuCard, isFlipped: true },
        difficulty: 'easy',
        selectedCardBack: 0,
        shouldAnimate: true,
    },
};

export const Matched: Story = {
    args: {
        card: { ...pikachuCard, isFlipped: true, isMatched: true },
        difficulty: 'easy',
        selectedCardBack: 0,
        shouldAnimate: true,
    },
};

export const DefaultNoAnimation: Story = {
    args: {
        card: pikachuCard,
        difficulty: 'easy',
        selectedCardBack: 0,
        shouldAnimate: false,
    },
};

export const HardDifficultyBack: Story = {
    args: {
        card: pikachuCard,
        difficulty: 'hard',
        selectedCardBack: 0,
        shouldAnimate: true,
    },
};
