export const getPokemonImage = (category: string) => {
  switch (category) {
    case 'Basic Knowledge':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'; // Pikachu
    case 'Types':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'; // Charizard
    case 'Evolutions':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png'; // Dragonite
    case 'Legendary Pokemon':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'; // Mewtwo
    case 'Abilities and Moves':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png'; // Lucario
    case 'Game Mechanics':
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png'; // Snorlax
    default:
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'; // Default to Pikachu
  }
};
