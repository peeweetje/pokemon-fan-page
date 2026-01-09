export const mockPokemon = {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    base_experience: 112,
    sprites: {
        other: {
            'official-artwork': {
                front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            },
        },
    },
    stats: [
        { base_stat: 35, stat: { name: 'hp' } },
        { base_stat: 55, stat: { name: 'attack' } },
        { base_stat: 40, stat: { name: 'defense' } },
        { base_stat: 50, stat: { name: 'special-attack' } },
        { base_stat: 50, stat: { name: 'special-defense' } },
        { base_stat: 90, stat: { name: 'speed' } },
    ],
    types: [
        { type: { name: 'electric' } }
    ],
    abilities: [
        { ability: { name: 'static' }, is_hidden: false },
        { ability: { name: 'lightning-rod' }, is_hidden: true },
    ],
    moves: [
        { move: { name: 'mega-punch' } },
        { move: { name: 'pay-day' } },
        { move: { name: 'thunder-shock' } },
        { move: { name: 'thunderbolt' } },
    ],
    species: {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
    },
};

export const mockSpecies = {
    flavor_text_entries: [
        {
            flavor_text: "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
            language: { name: "en" }
        }
    ],
    genera: [
        {
            genus: "Mouse Pokémon",
            language: { name: "en" }
        }
    ],
    color: { name: "yellow" },
    habitat: { name: "forest" },
};
