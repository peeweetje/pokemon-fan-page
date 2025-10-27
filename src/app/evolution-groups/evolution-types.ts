export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export interface EvolutionGroup {
  id: number;
  pokemon: Pokemon[];
  name: string;
}
