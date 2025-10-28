async function getPokemonData(id: string) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon with ID ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return null;
  }
}

async function getPokemonSpecies(id: string) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon species data:', error);
    return null;
  }
}

export { getPokemonData, getPokemonSpecies };
