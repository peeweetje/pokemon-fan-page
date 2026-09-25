import type { Meta, StoryObj } from '@storybook/react';
import { EvolutionGroupsClient } from './evolution-groups-client';
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

const mockEvolutionGroups: EvolutionGroup[] = [
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
  makeGroup(5, 'pidgey', [
    { id: 16, name: 'pidgey', types: ['normal', 'flying'] },
    { id: 17, name: 'pidgeotto', types: ['normal', 'flying'] },
    { id: 18, name: 'pidgeot', types: ['normal', 'flying'] },
  ]),
  makeGroup(6, 'rattata', [
    { id: 19, name: 'rattata', types: ['normal'] },
    { id: 20, name: 'raticate', types: ['normal'] },
  ]),
  makeGroup(7, 'abra', [
    { id: 63, name: 'abra', types: ['psychic'] },
    { id: 64, name: 'kadabra', types: ['psychic'] },
    { id: 65, name: 'alakazam', types: ['psychic'] },
  ]),
  makeGroup(8, 'machop', [
    { id: 66, name: 'machop', types: ['fighting'] },
    { id: 67, name: 'machoke', types: ['fighting'] },
    { id: 68, name: 'machamp', types: ['fighting'] },
  ]),
];

const meta: Meta<typeof EvolutionGroupsClient> = {
  title: 'Evolution Groups/Evolution Groups Client',
  component: EvolutionGroupsClient,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    evolutionGroups: { control: 'object' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EvolutionGroupsClient>;

// 8 groups with 6 per page: exercises search + pagination (try "char" in the search box).
export const Default: Story = {
  args: {
    evolutionGroups: mockEvolutionGroups,
  },
};

// 2 groups fit on one page, so the pagination control is hidden.
export const SinglePage: Story = {
  args: {
    evolutionGroups: mockEvolutionGroups.slice(0, 2),
  },
};

export const Empty: Story = {
  args: {
    evolutionGroups: [],
  },
};
