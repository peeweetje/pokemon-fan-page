import type { Meta, StoryObj } from '@storybook/react';
import { PokeballBackgroundDesign } from './pokeball-background-design';

const meta: Meta<typeof PokeballBackgroundDesign> = {
    title: 'Components/Pokemon Card/Pokeball Background Design',
    component: PokeballBackgroundDesign,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        height: '100%',
    },
};

export default meta;
type Story = StoryObj<typeof PokeballBackgroundDesign>;

export const Default: Story = {};
