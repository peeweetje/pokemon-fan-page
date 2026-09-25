import type { Meta, StoryObj } from '@storybook/react';
import { EvolutionGroupGrid } from './evolution-group-grid';
import type { EvolutionGroup } from './evolution-types';

function makeGroup(
  id: number,
  name: string,
  members: { id: number; name: string; types: string[] }[],
): EvolutionGroup {
  return {
    id,
    name,
    pokemon: members.map((m) => ({
      ...m,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${m.id}.png`,
    })),
  };
}

const mockGroups: EvolutionGroup[] = [
  makeGroup(1, 'bulbasaur', [
    { id: 1, name: 'bulbasaur', types: ['grass', 'poison'] },
    { id: 2, name: 'ivysaur', types: ['grass', 'poison'] },
    { id: 3, name: 'venusaur', types: ['grass', 'poison'] },
  ]),
  makeGroup(2, 'charmander', [
    { id: 4, name: 'charmander', types: ['fire'] },
    { id: 5, name: 'charmeleon', types: ['fire'] },
    { id: 6, name: 'charizard', types: ['fire', 'flying'] },
  ]),
  makeGroup(3, 'squirtle', [
    { id: 7, name: 'squirtle', types: ['water'] },
    { id: 8, name: 'wartortle', types: ['water'] },
    { id: 9, name: 'blastoise', types: ['water'] },
  ]),
  makeGroup(4, 'pikachu', [
    { id: 25, name: 'pikachu', types: ['electric'] },
    { id: 26, name: 'raichu', types: ['electric'] },
  ]),
];

const meta: Meta<typeof EvolutionGroupGrid> = {
  title: 'Evolution Groups/Evolution Group Grid',
  component: EvolutionGroupGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    groups: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof EvolutionGroupGrid>;

export const Default: Story = {
  args: {
    groups: mockGroups,
  },
};

export const SingleGroup: Story = {
  args: {
    groups: mockGroups.slice(0, 1),
  },
};

export const Empty: Story = {
  args: {
    groups: [],
  },
};
