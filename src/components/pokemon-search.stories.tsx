
import type { Meta, StoryObj } from '@storybook/react';
import PokemonSearch from './pokemon-search';

const meta: Meta<typeof PokemonSearch> = {
    title: 'Components/PokemonSearch',
    component: PokemonSearch,
    tags: ['autodocs'],
    argTypes: {
        onSearch: { action: 'searched' },
    },
};

export default meta;
type Story = StoryObj<typeof PokemonSearch>;

export const Default: Story = {
    args: {},
};
