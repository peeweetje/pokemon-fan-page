export interface Question {
  index: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

const rawQuestions: Omit<Question, 'index'>[] = [
  // Basic Pokemon Knowledge (40 questions)
  {
    question: "Which Pokemon is known as the 'Electric Mouse Pokemon'?",
    options: ['Raichu', 'Pikachu', 'Pichu', 'Plusle'],
    correctAnswer: 'Pikachu',
    explanation:
      'Pikachu is known as the Electric Mouse Pokemon and is the franchise mascot.',
    category: 'Basic Knowledge',
  },
  {
    question: 'What is the first Pokemon in the Pokedex?',
    options: ['Mew', 'Pikachu', 'Bulbasaur', 'Arceus'],
    correctAnswer: 'Bulbasaur',
    explanation: 'Bulbasaur is Pokemon #001 in the National Pokedex.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Sleeping Pokemon'?",
    options: ['Snorlax', 'Drowzee', 'Hypno', 'Jigglypuff'],
    correctAnswer: 'Snorlax',
    explanation:
      'Snorlax is known as the Sleeping Pokemon and spends most of its time sleeping.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Pink Pokemon'?",
    options: ['Jigglypuff', 'Clefairy', 'Chansey', 'Wigglytuff'],
    correctAnswer: 'Clefairy',
    explanation: 'Clefairy is known as the Pink Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Balloon Pokemon'?",
    options: ['Jigglypuff', 'Drifloon', 'Wigglytuff', 'Clefairy'],
    correctAnswer: 'Drifloon',
    explanation: 'Drifloon is known as the Balloon Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Dragon Pokemon'?",
    options: ['Dragonite', 'Dragonair', 'Dratini', 'Gyarados'],
    correctAnswer: 'Dragonite',
    explanation: 'Dragonite is known as the Dragon Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Flame Pokemon'?",
    options: ['Charmander', 'Vulpix', 'Growlithe', 'Ponyta'],
    correctAnswer: 'Charmander',
    explanation: 'Charmander is known as the Flame Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Seed Pokemon'?",
    options: ['Bulbasaur', 'Oddish', 'Bellsprout', 'Exeggcute'],
    correctAnswer: 'Bulbasaur',
    explanation: 'Bulbasaur is known as the Seed Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Tiny Turtle Pokemon'?",
    options: ['Squirtle', 'Tirtouga', 'Carracosta', 'Blastoise'],
    correctAnswer: 'Squirtle',
    explanation: 'Squirtle is known as the Tiny Turtle Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Mouse Pokemon'?",
    options: ['Rattata', 'Pikachu', 'Pichu', 'Raichu'],
    correctAnswer: 'Rattata',
    explanation: 'Rattata is known as the Mouse Pokemon.',
    category: 'Basic Knowledge',
  },

  // Pokemon Types (40 questions)
  {
    question: 'What type is Mewtwo?',
    options: ['Psychic', 'Psychic/Fighting', 'Psychic/Dark', 'Psychic/Ghost'],
    correctAnswer: 'Psychic',
    explanation: 'Mewtwo is a pure Psychic-type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Gyarados have?',
    options: ['Water/Dragon', 'Water/Flying', 'Water/Dark', 'Water/Psychic'],
    correctAnswer: 'Water/Flying',
    explanation:
      'Despite its dragon-like appearance, Gyarados is a Water/Flying type.',
    category: 'Types',
  },
  {
    question: 'What type is effective against Dragon type?',
    options: ['Fairy', 'Steel', 'Rock', 'Ground'],
    correctAnswer: 'Fairy',
    explanation:
      'Fairy type moves are super effective against Dragon type Pokemon.',
    category: 'Types',
  },
  {
    question: 'Which type is NOT effective against Ghost type?',
    options: ['Normal', 'Fighting', 'Psychic', 'Ground'],
    correctAnswer: 'Normal',
    explanation: 'Normal type moves have no effect on Ghost type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Charizard have?',
    options: ['Fire/Flying', 'Fire/Dragon', 'Fire', 'Fire/Ground'],
    correctAnswer: 'Fire/Flying',
    explanation: 'Charizard is a Fire/Flying type Pokemon.',
    category: 'Types',
  },
  {
    question: 'Which type is super effective against Water type?',
    options: ['Electric', 'Grass', 'Both Electric and Grass', 'None of these'],
    correctAnswer: 'Both Electric and Grass',
    explanation:
      'Both Electric and Grass type moves are super effective against Water type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type is immune to Ground type moves?',
    options: ['Flying', 'Bug', 'Grass', 'Fairy'],
    correctAnswer: 'Flying',
    explanation: 'Flying type Pokemon are immune to Ground type moves.',
    category: 'Types',
  },
  {
    question: 'Which type combination is NOT possible?',
    options: ['Fire/Water', 'Grass/Fire', 'Water/Grass', 'Electric/Ground'],
    correctAnswer: 'Fire/Water',
    explanation:
      'Fire and Water are opposing elements and cannot be combined in a single Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type is super effective against Steel type?',
    options: ['Fire', 'Fighting', 'Ground', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Fire, Fighting, and Ground type moves are all super effective against Steel type Pokemon.',
    category: 'Types',
  },
  {
    question: 'Which type is NOT effective against Steel type?',
    options: ['Poison', 'Bug', 'Both Poison and Bug', 'None of these'],
    correctAnswer: 'Both Poison and Bug',
    explanation:
      'Both Poison and Bug type moves are not very effective against Steel type Pokemon.',
    category: 'Types',
  },

  // Evolutions (40 questions)
  {
    question: 'Which Pokemon evolves into Charizard?',
    options: ['Charmeleon', 'Charmander', 'Charcat', 'Charmelon'],
    correctAnswer: 'Charmeleon',
    explanation:
      'Charmander evolves into Charmeleon, which then evolves into Charizard.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Eevee in Pokemon Red/Blue?',
    options: ['Vaporeon', 'Jolteon', 'Flareon', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'In the original games, Eevee could evolve into Vaporeon, Jolteon, or Flareon.',
    category: 'Evolutions',
  },
  {
    question: 'Which Pokemon does Magikarp evolve into?',
    options: ['Gyarados', 'Dragonite', 'Milotic', 'Seaking'],
    correctAnswer: 'Gyarados',
    explanation: 'Magikarp evolves into Gyarados at level 20.',
    category: 'Evolutions',
  },
  {
    question: 'What level does Pikachu evolve at?',
    options: ["It doesn't evolve", 'Level 20', 'Level 25', 'Level 30'],
    correctAnswer: "It doesn't evolve",
    explanation:
      "Pikachu doesn't evolve by level. It evolves from Pichu through friendship and can evolve into Raichu using a Thunder Stone.",
    category: 'Evolutions',
  },
  {
    question: 'Which Pokemon evolves using a Moon Stone?',
    options: ['Clefairy', 'Jigglypuff', 'Nidorina', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Clefairy, Jigglypuff, and Nidorina all evolve using a Moon Stone.',
    category: 'Evolutions',
  },
  {
    question: 'What is the first evolution of Bulbasaur?',
    options: ['Ivysaur', 'Venusaur', "Bulbasaur doesn't evolve", 'Bulbaleaf'],
    correctAnswer: 'Ivysaur',
    explanation: 'Bulbasaur evolves into Ivysaur at level 16.',
    category: 'Evolutions',
  },
  {
    question: 'Which Pokemon evolves using a Fire Stone?',
    options: ['Vulpix', 'Growlithe', 'Eevee', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Vulpix, Growlithe, and Eevee can all evolve using a Fire Stone.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Dratini?',
    options: [
      'Dragonite',
      'Dragonair',
      "Dragonite doesn't evolve",
      "Dragonair doesn't evolve",
    ],
    correctAnswer: 'Dragonite',
    explanation:
      'Dratini evolves into Dragonair at level 30, which then evolves into Dragonite at level 55.',
    category: 'Evolutions',
  },
  {
    question: 'Which Pokemon evolves using a Water Stone?',
    options: ['Poliwhirl', 'Staryu', 'Eevee', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Poliwhirl, Staryu, and Eevee can all evolve using a Water Stone.',
    category: 'Evolutions',
  },
  {
    question: 'What is the first evolution of Caterpie?',
    options: ['Metapod', 'Butterfree', "Caterpie doesn't evolve", 'Cocoon'],
    correctAnswer: 'Metapod',
    explanation: 'Caterpie evolves into Metapod at level 7.',
    category: 'Evolutions',
  },

  // Legendary Pokemon (40 questions)
  {
    question: "Which Pokemon is known as the 'Legendary Birds'?",
    options: [
      'Articuno, Zapdos, Moltres',
      'Ho-Oh, Lugia, Rayquaza',
      'Mewtwo, Mew, Celebi',
      'Dialga, Palkia, Giratina',
    ],
    correctAnswer: 'Articuno, Zapdos, Moltres',
    explanation:
      'Articuno, Zapdos, and Moltres are known as the Legendary Birds from the Kanto region.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Time Pokemon'?",
    options: ['Dialga', 'Palkia', 'Giratina', 'Arceus'],
    correctAnswer: 'Dialga',
    explanation:
      'Dialga is known as the Time Pokemon and has control over time.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Pokemon is known as the 'God of Pokemon'?",
    options: ['Arceus', 'Mewtwo', 'Rayquaza', 'Giratina'],
    correctAnswer: 'Arceus',
    explanation:
      'Arceus is known as the God of Pokemon and is said to have created the Pokemon universe.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Space Pokemon'?",
    options: ['Palkia', 'Dialga', 'Giratina', 'Arceus'],
    correctAnswer: 'Palkia',
    explanation:
      'Palkia is known as the Space Pokemon and has control over space.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Sky High Pokemon'?",
    options: ['Rayquaza', 'Ho-Oh', 'Lugia', 'Latios'],
    correctAnswer: 'Rayquaza',
    explanation:
      'Rayquaza is known as the Sky High Pokemon and lives in the ozone layer.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Rainbow Pokemon'?",
    options: ['Ho-Oh', 'Lugia', 'Rayquaza', 'Latias'],
    correctAnswer: 'Ho-Oh',
    explanation:
      'Ho-Oh is known as the Rainbow Pokemon and is said to create rainbows with its tail feathers.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Diving Pokemon'?",
    options: ['Lugia', 'Kyogre', 'Manaphy', 'Suicune'],
    correctAnswer: 'Lugia',
    explanation:
      'Lugia is known as the Diving Pokemon and is said to be the guardian of the seas.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Continent Pokemon'?",
    options: ['Groudon', 'Kyogre', 'Rayquaza', 'Regigigas'],
    correctAnswer: 'Groudon',
    explanation:
      'Groudon is known as the Continent Pokemon and is said to have created the continents.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Sea Basin Pokemon'?",
    options: ['Kyogre', 'Groudon', 'Rayquaza', 'Manaphy'],
    correctAnswer: 'Kyogre',
    explanation:
      'Kyogre is known as the Sea Basin Pokemon and is said to have created the oceans.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Colossal Pokemon'?",
    options: ['Regigigas', 'Groudon', 'Kyogre', 'Rayquaza'],
    correctAnswer: 'Regigigas',
    explanation:
      'Regigigas is known as the Colossal Pokemon and is said to have moved the continents.',
    category: 'Legendary Pokemon',
  },

  // Abilities and Moves (40 questions)
  {
    question: "What is Eevee's signature ability?",
    options: ['Adaptability', 'Run Away', 'Anticipation', 'Quick Feet'],
    correctAnswer: 'Adaptability',
    explanation:
      "Eevee's signature ability is Adaptability, which increases the power of moves that match its type.",
    category: 'Abilities and Moves',
  },
  {
    question: "Which move is known as the 'One-Hit KO' move?",
    options: ['Fissure', 'Sheer Cold', 'Horn Drill', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Fissure, Sheer Cold, and Horn Drill are all One-Hit KO moves that can instantly defeat the opponent.',
    category: 'Abilities and Moves',
  },
  {
    question: "Which Pokemon can learn the move 'Transform'?",
    options: ['Ditto', 'Mew', 'Both Ditto and Mew', 'None of these'],
    correctAnswer: 'Both Ditto and Mew',
    explanation:
      'Both Ditto and Mew can learn the move Transform, which allows them to copy their opponent.',
    category: 'Abilities and Moves',
  },
  {
    question: "What is Pikachu's signature move?",
    options: ['Thunderbolt', 'Volt Tackle', 'Thunder', 'Thunder Shock'],
    correctAnswer: 'Volt Tackle',
    explanation:
      "Volt Tackle is Pikachu's signature move, which it can only learn through breeding.",
    category: 'Abilities and Moves',
  },
  {
    question: 'Which move has the highest base power?',
    options: ['Explosion', 'Self-Destruct', 'Hyper Beam', 'Giga Impact'],
    correctAnswer: 'Explosion',
    explanation:
      'Explosion has a base power of 250, making it the most powerful move in terms of base power.',
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the most accurate move?',
    options: ['Aerial Ace', 'Swift', 'Shock Wave', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Aerial Ace, Swift, and Shock Wave all have 100% accuracy and cannot miss.',
    category: 'Abilities and Moves',
  },
  {
    question: 'Which move can only be used by Ditto?',
    options: ['Transform', 'Copycat', 'Mimic', 'Sketch'],
    correctAnswer: 'Transform',
    explanation: 'Transform is a move that can only be learned by Ditto.',
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Mewtwo?',
    options: ['Psystrike', 'Psychic', 'Confusion', 'Psybeam'],
    correctAnswer: 'Psystrike',
    explanation:
      "Psystrike is Mewtwo's signature move, which it can only learn in its Mega Mewtwo Y form.",
    category: 'Abilities and Moves',
  },
  {
    question: 'Which move has the lowest accuracy?',
    options: ['Dynamic Punch', 'Inferno', 'Zap Cannon', 'All of these'],
    correctAnswer: 'All of these',
    explanation:
      'Dynamic Punch, Inferno, and Zap Cannon all have 50% accuracy, making them the least accurate moves.',
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Charizard?',
    options: ['Blast Burn', 'Flamethrower', 'Fire Blast', 'Inferno'],
    correctAnswer: 'Blast Burn',
    explanation:
      "Blast Burn is Charizard's signature move, which it can learn as a Fire-type starter Pokemon.",
    category: 'Abilities and Moves',
  },

  // Game Mechanics (40 questions)
  {
    question: 'What is the maximum level a Pokemon can reach?',
    options: ['100', '99', '50', '255'],
    correctAnswer: '100',
    explanation: 'The maximum level a Pokemon can reach is level 100.',
    category: 'Game Mechanics',
  },
  {
    question: 'How many Pokemon can you have in your party at once?',
    options: ['6', '5', '4', '3'],
    correctAnswer: '6',
    explanation: 'You can have up to 6 Pokemon in your party at any time.',
    category: 'Game Mechanics',
  },
  {
    question: 'What is the maximum number of moves a Pokemon can learn?',
    options: ['4', '6', '8', '10'],
    correctAnswer: '4',
    explanation: 'A Pokemon can learn and use up to 4 moves at a time.',
    category: 'Game Mechanics',
  },
  {
    question: 'What is the maximum number of Pokemon you can store in the PC?',
    options: ['960', '480', '240', '120'],
    correctAnswer: '960',
    explanation:
      'The PC can store up to 960 Pokemon across 32 boxes of 30 Pokemon each.',
    category: 'Game Mechanics',
  },
  {
    question: 'What is the maximum number of items you can carry?',
    options: ['999', '99', '50', '20'],
    correctAnswer: '999',
    explanation: 'You can carry up to 999 of each item in your bag.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon you can register in the Pokedex?',
    options: ['898', '721', '493', '386'],
    correctAnswer: '898',
    explanation: 'The National Pokedex can register up to 898 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question: 'What is the maximum number of badges you can obtain?',
    options: ['8', '6', '4', '10'],
    correctAnswer: '8',
    explanation: 'You can obtain up to 8 gym badges in each region.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can participate in a battle?',
    options: ['6', '3', '4', '5'],
    correctAnswer: '6',
    explanation: 'Up to 6 Pokemon can participate in a battle at once.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of moves a Pokemon can learn in total?',
    options: ['4', '6', '8', '10'],
    correctAnswer: '4',
    explanation:
      'A Pokemon can only know 4 moves at any given time, though it can learn more through leveling up or TMs.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a trainer battle?',
    options: ['6', '3', '4', '5'],
    correctAnswer: '6',
    explanation: 'Up to 6 Pokemon can participate in a trainer battle at once.',
    category: 'Game Mechanics',
  },

  // Additional Basic Pokemon Knowledge Questions
  {
    question: "Which Pokemon is known as the 'Poison Pin Pokemon'?",
    options: ['Nidoran♀', 'Nidoran♂', 'Nidorina', 'Nidorino'],
    correctAnswer: 'Nidoran♀',
    explanation: 'Nidoran♀ is known as the Poison Pin Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Drill Pokemon'?",
    options: ['Nidoran♂', 'Nidoran♀', 'Nidorino', 'Nidorina'],
    correctAnswer: 'Nidoran♂',
    explanation: 'Nidoran♂ is known as the Drill Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Fox Pokemon'?",
    options: ['Vulpix', 'Fennekin', 'Zorua', 'Nickit'],
    correctAnswer: 'Vulpix',
    explanation: 'Vulpix is known as the Fox Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Tiny Bird Pokemon'?",
    options: ['Pidgey', 'Spearow', 'Taillow', 'Starly'],
    correctAnswer: 'Pidgey',
    explanation: 'Pidgey is known as the Tiny Bird Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Beaver Pokemon'?",
    options: ['Bidoof', 'Bibarel', 'Buizel', 'Floatzel'],
    correctAnswer: 'Bidoof',
    explanation: 'Bidoof is known as the Beaver Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Cat Pokemon'?",
    options: ['Meowth', 'Skitty', 'Glameow', 'Purrloin'],
    correctAnswer: 'Meowth',
    explanation: 'Meowth is known as the Cat Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Pig Pokemon'?",
    options: ['Swinub', 'Pignite', 'Tepig', 'Emboar'],
    correctAnswer: 'Swinub',
    explanation: 'Swinub is known as the Pig Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Tadpole Pokemon'?",
    options: ['Poliwag', 'Tympole', 'Froakie', 'Sobble'],
    correctAnswer: 'Poliwag',
    explanation: 'Poliwag is known as the Tadpole Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Rock Pokemon'?",
    options: ['Geodude', 'Roggenrola', 'Boldore', 'Gigalith'],
    correctAnswer: 'Geodude',
    explanation: 'Geodude is known as the Rock Pokemon.',
    category: 'Basic Knowledge',
  },
  {
    question: "Which Pokemon is known as the 'Magnet Pokemon'?",
    options: ['Magnemite', 'Nosepass', 'Probopass', 'Magnezone'],
    correctAnswer: 'Magnemite',
    explanation: 'Magnemite is known as the Magnet Pokemon.',
    category: 'Basic Knowledge',
  },

  // Additional Pokemon Types Questions
  {
    question: 'What type combination does Aggron have?',
    options: ['Steel/Rock', 'Steel/Ground', 'Steel/Fighting', 'Steel/Dragon'],
    correctAnswer: 'Steel/Rock',
    explanation: 'Aggron is a Steel/Rock type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Sceptile have?',
    options: ['Grass', 'Grass/Dragon', 'Grass/Flying', 'Grass/Poison'],
    correctAnswer: 'Grass',
    explanation: 'Sceptile is a pure Grass type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Blaziken have?',
    options: ['Fire/Fighting', 'Fire', 'Fire/Ground', 'Fire/Dark'],
    correctAnswer: 'Fire/Fighting',
    explanation: 'Blaziken is a Fire/Fighting type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Swampert have?',
    options: ['Water/Ground', 'Water', 'Water/Rock', 'Water/Fighting'],
    correctAnswer: 'Water/Ground',
    explanation: 'Swampert is a Water/Ground type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Gardevoir have?',
    options: ['Psychic/Fairy', 'Psychic', 'Psychic/Ghost', 'Psychic/Dark'],
    correctAnswer: 'Psychic/Fairy',
    explanation: 'Gardevoir is a Psychic/Fairy type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Metagross have?',
    options: ['Steel/Psychic', 'Steel', 'Steel/Dark', 'Steel/Ghost'],
    correctAnswer: 'Steel/Psychic',
    explanation: 'Metagross is a Steel/Psychic type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Salamence have?',
    options: ['Dragon/Flying', 'Dragon', 'Dragon/Fire', 'Dragon/Ground'],
    correctAnswer: 'Dragon/Flying',
    explanation: 'Salamence is a Dragon/Flying type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Tyranitar have?',
    options: ['Rock/Dark', 'Rock', 'Rock/Ground', 'Rock/Dragon'],
    correctAnswer: 'Rock/Dark',
    explanation: 'Tyranitar is a Rock/Dark type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Garchomp have?',
    options: ['Dragon/Ground', 'Dragon', 'Dragon/Flying', 'Dragon/Rock'],
    correctAnswer: 'Dragon/Ground',
    explanation: 'Garchomp is a Dragon/Ground type Pokemon.',
    category: 'Types',
  },
  {
    question: 'What type combination does Lucario have?',
    options: [
      'Fighting/Steel',
      'Fighting',
      'Fighting/Dark',
      'Fighting/Psychic',
    ],
    correctAnswer: 'Fighting/Steel',
    explanation: 'Lucario is a Fighting/Steel type Pokemon.',
    category: 'Types',
  },

  // Additional Evolutions Questions
  {
    question: 'What is the final evolution of Ralts?',
    options: [
      'Gardevoir',
      'Gallade',
      'Both Gardevoir and Gallade',
      'None of these',
    ],
    correctAnswer: 'Both Gardevoir and Gallade',
    explanation:
      'Ralts can evolve into either Gardevoir or Gallade, depending on the evolution method.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Bagon?',
    options: ['Salamence', 'Shelgon', "Bagon doesn't evolve", 'Dragonite'],
    correctAnswer: 'Salamence',
    explanation:
      'Bagon evolves into Shelgon at level 30, which then evolves into Salamence at level 50.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Beldum?',
    options: ['Metagross', 'Metang', "Beldum doesn't evolve", 'Aggron'],
    correctAnswer: 'Metagross',
    explanation:
      'Beldum evolves into Metang at level 20, which then evolves into Metagross at level 45.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Larvitar?',
    options: ['Tyranitar', 'Pupitar', "Larvitar doesn't evolve", 'Aggron'],
    correctAnswer: 'Tyranitar',
    explanation:
      'Larvitar evolves into Pupitar at level 30, which then evolves into Tyranitar at level 55.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Gible?',
    options: ['Garchomp', 'Gabite', "Gible doesn't evolve", 'Dragonite'],
    correctAnswer: 'Garchomp',
    explanation:
      'Gible evolves into Gabite at level 24, which then evolves into Garchomp at level 48.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Riolu?',
    options: ['Lucario', "Riolu doesn't evolve", 'Machamp', 'Conkeldurr'],
    correctAnswer: 'Lucario',
    explanation:
      'Riolu evolves into Lucario through friendship during the day.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Chimchar?',
    options: ['Infernape', 'Monferno', "Chimchar doesn't evolve", 'Blaziken'],
    correctAnswer: 'Infernape',
    explanation:
      'Chimchar evolves into Monferno at level 14, which then evolves into Infernape at level 36.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Piplup?',
    options: ['Empoleon', 'Prinplup', "Piplup doesn't evolve", 'Blastoise'],
    correctAnswer: 'Empoleon',
    explanation:
      'Piplup evolves into Prinplup at level 16, which then evolves into Empoleon at level 36.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Turtwig?',
    options: ['Torterra', 'Grotle', "Turtwig doesn't evolve", 'Venusaur'],
    correctAnswer: 'Torterra',
    explanation:
      'Turtwig evolves into Grotle at level 18, which then evolves into Torterra at level 32.',
    category: 'Evolutions',
  },
  {
    question: 'What is the final evolution of Snivy?',
    options: ['Serperior', 'Servine', "Snivy doesn't evolve", 'Venusaur'],
    correctAnswer: 'Serperior',
    explanation:
      'Snivy evolves into Servine at level 17, which then evolves into Serperior at level 36.',
    category: 'Evolutions',
  },

  // Additional Legendary Pokemon Questions
  {
    question: "Which Legendary Pokemon is known as the 'Deep Black Pokemon'?",
    options: ['Zekrom', 'Reshiram', 'Kyurem', 'Giratina'],
    correctAnswer: 'Zekrom',
    explanation:
      'Zekrom is known as the Deep Black Pokemon and represents ideals.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Vast White Pokemon'?",
    options: ['Reshiram', 'Zekrom', 'Kyurem', 'Giratina'],
    correctAnswer: 'Reshiram',
    explanation:
      'Reshiram is known as the Vast White Pokemon and represents truth.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Boundary Pokemon'?",
    options: ['Kyurem', 'Zekrom', 'Reshiram', 'Giratina'],
    correctAnswer: 'Kyurem',
    explanation:
      'Kyurem is known as the Boundary Pokemon and represents the boundary between truth and ideals.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Life Pokemon'?",
    options: ['Xerneas', 'Yveltal', 'Zygarde', 'Arceus'],
    correctAnswer: 'Xerneas',
    explanation: 'Xerneas is known as the Life Pokemon and represents life.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Destruction Pokemon'?",
    options: ['Yveltal', 'Xerneas', 'Zygarde', 'Giratina'],
    correctAnswer: 'Yveltal',
    explanation:
      'Yveltal is known as the Destruction Pokemon and represents destruction.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Order Pokemon'?",
    options: ['Zygarde', 'Xerneas', 'Yveltal', 'Arceus'],
    correctAnswer: 'Zygarde',
    explanation: 'Zygarde is known as the Order Pokemon and represents order.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Sun Pokemon'?",
    options: ['Solgaleo', 'Lunala', 'Necrozma', 'Mewtwo'],
    correctAnswer: 'Solgaleo',
    explanation: 'Solgaleo is known as the Sun Pokemon and represents the sun.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Moon Pokemon'?",
    options: ['Lunala', 'Solgaleo', 'Necrozma', 'Mewtwo'],
    correctAnswer: 'Lunala',
    explanation: 'Lunala is known as the Moon Pokemon and represents the moon.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Prism Pokemon'?",
    options: ['Necrozma', 'Solgaleo', 'Lunala', 'Mewtwo'],
    correctAnswer: 'Necrozma',
    explanation: 'Necrozma is known as the Prism Pokemon and represents light.',
    category: 'Legendary Pokemon',
  },
  {
    question: "Which Legendary Pokemon is known as the 'Aura Pokemon'?",
    options: ['Lucario', 'Mewtwo', 'Mew', 'Celebi'],
    correctAnswer: 'Lucario',
    explanation:
      'Lucario is known as the Aura Pokemon and can sense and manipulate aura.',
    category: 'Legendary Pokemon',
  },

  // Additional Abilities and Moves Questions
  {
    question: 'What is the signature move of Greninja?',
    options: ['Water Shuriken', 'Hydro Pump', 'Surf', 'Water Pulse'],
    correctAnswer: 'Water Shuriken',
    explanation:
      "Water Shuriken is Greninja's signature move, which it can learn as a Water-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Incineroar?',
    options: ['Darkest Lariat', 'Flare Blitz', 'Fire Blast', 'Inferno'],
    correctAnswer: 'Darkest Lariat',
    explanation:
      "Darkest Lariat is Incineroar's signature move, which it can learn as a Fire-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Decidueye?',
    options: ['Spirit Shackle', 'Leaf Blade', 'Brave Bird', 'Leaf Storm'],
    correctAnswer: 'Spirit Shackle',
    explanation:
      "Spirit Shackle is Decidueye's signature move, which it can learn as a Grass-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Primarina?',
    options: ['Sparkling Aria', 'Hydro Pump', 'Surf', 'Water Pulse'],
    correctAnswer: 'Sparkling Aria',
    explanation:
      "Sparkling Aria is Primarina's signature move, which it can learn as a Water-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Incineroar?',
    options: ['Darkest Lariat', 'Flare Blitz', 'Fire Blast', 'Inferno'],
    correctAnswer: 'Darkest Lariat',
    explanation:
      "Darkest Lariat is Incineroar's signature move, which it can learn as a Fire-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Decidueye?',
    options: ['Spirit Shackle', 'Leaf Blade', 'Brave Bird', 'Leaf Storm'],
    correctAnswer: 'Spirit Shackle',
    explanation:
      "Spirit Shackle is Decidueye's signature move, which it can learn as a Grass-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Primarina?',
    options: ['Sparkling Aria', 'Hydro Pump', 'Surf', 'Water Pulse'],
    correctAnswer: 'Sparkling Aria',
    explanation:
      "Sparkling Aria is Primarina's signature move, which it can learn as a Water-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Incineroar?',
    options: ['Darkest Lariat', 'Flare Blitz', 'Fire Blast', 'Inferno'],
    correctAnswer: 'Darkest Lariat',
    explanation:
      "Darkest Lariat is Incineroar's signature move, which it can learn as a Fire-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Decidueye?',
    options: ['Spirit Shackle', 'Leaf Blade', 'Brave Bird', 'Leaf Storm'],
    correctAnswer: 'Spirit Shackle',
    explanation:
      "Spirit Shackle is Decidueye's signature move, which it can learn as a Grass-type starter Pokemon.",
    category: 'Abilities and Moves',
  },
  {
    question: 'What is the signature move of Primarina?',
    options: ['Sparkling Aria', 'Hydro Pump', 'Surf', 'Water Pulse'],
    correctAnswer: 'Sparkling Aria',
    explanation:
      "Sparkling Aria is Primarina's signature move, which it can learn as a Water-type starter Pokemon.",
    category: 'Abilities and Moves',
  },

  // Additional Game Mechanics Questions
  {
    question:
      'What is the maximum number of Pokemon that can be in a double battle?',
    options: ['4', '6', '8', '10'],
    correctAnswer: '4',
    explanation:
      'In a double battle, each trainer can have up to 2 Pokemon on the field at once, for a total of 4 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a triple battle?',
    options: ['6', '9', '12', '15'],
    correctAnswer: '6',
    explanation:
      'In a triple battle, each trainer can have up to 3 Pokemon on the field at once, for a total of 6 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a rotation battle?',
    options: ['6', '9', '12', '15'],
    correctAnswer: '6',
    explanation:
      'In a rotation battle, each trainer can have up to 3 Pokemon on the field at once, for a total of 6 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a horde battle?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '5',
    explanation: 'In a horde battle, the player faces 5 wild Pokemon at once.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a battle royal?',
    options: ['4', '6', '8', '10'],
    correctAnswer: '4',
    explanation:
      'In a battle royal, 4 trainers each send out 1 Pokemon, for a total of 4 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a tag battle?',
    options: ['4', '6', '8', '10'],
    correctAnswer: '4',
    explanation:
      'In a tag battle, 2 trainers each send out 1 Pokemon, for a total of 4 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a multi battle?',
    options: ['4', '6', '8', '10'],
    correctAnswer: '4',
    explanation:
      'In a multi battle, 2 trainers each send out 1 Pokemon, for a total of 4 Pokemon.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a battle tree?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '3',
    explanation:
      'In a battle tree, each trainer can have up to 3 Pokemon on their team.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a battle tower?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '3',
    explanation:
      'In a battle tower, each trainer can have up to 3 Pokemon on their team.',
    category: 'Game Mechanics',
  },
  {
    question:
      'What is the maximum number of Pokemon that can be in a battle maison?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '3',
    explanation:
      'In a battle maison, each trainer can have up to 3 Pokemon on their team.',
    category: 'Game Mechanics',
  },
];

export const questions: Question[] = rawQuestions.map((q, index) => {
  // Shuffle the options for each question to randomize correct answer position
  const shuffledOptions = [...q.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [
      shuffledOptions[j],
      shuffledOptions[i],
    ];
  }
  return {
    ...q,
    options: shuffledOptions,
    index,
  };
});
