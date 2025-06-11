'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SecretPokeball() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [pokemonFact, setPokemonFact] = useState('');

  // Pokemon facts that will be shown when the Pokeball is clicked
  const pokemonFacts = [
    'There are over 900 different species of Pokémon!',
    'Pikachu was originally going to be a second evolution of Raichu.',
    'Pokémon Red and Green were the first Pokémon games released in Japan.',
    "The name 'Pokémon' is a shortened form of 'Pocket Monsters'.",
    'Rhydon was the first Pokémon ever created.',
    'Arceus is considered to be the creator of the Pokémon universe.',
    'The three legendary birds are Articuno, Zapdos, and Moltres.',
    "Mewtwo was created from Mew's DNA.",
    'Magikarp evolves into Gyarados at level 20.',
    'Eevee has the most possible evolutions of any Pokémon.',
    "Ash Ketchum's first Pokémon was Pikachu.",
    'The Pokémon world has its own unique calendar system.',
    'Ditto can transform into any Pokémon it sees.',
    "Slowpoke's tail regrows quickly and is considered a delicacy.",
    'Cubone wears the skull of its dead mother.',
    "Jigglypuff's Japanese name is Purin, which means pudding.",
    'Wobbuffet keeps its real face on its tail and only reveals it when attacked.',
    "Arbok's chest pattern differs between regions.",
    'Gengar is said to be the shadow of Clefable.',
    'Parasect is actually controlled by the mushroom on its back.',
    'Alakazam has an IQ of 5,000 and can remember everything that ever happens to it.',
    'Mimikyu wears a Pikachu costume because it wants to be loved like Pikachu.',
    "Farfetch'd carries a leek which it uses as a weapon.",
    'Spiritomb is made up of 108 spirits.',
    "Absol appears before disasters but doesn't cause them, trying to warn people.",
    'Drifloon tries to take children to the spirit world.',
    'Yamask carries a mask that resembles its face when it was human.',
    "Phantump is formed when a spirit possesses a tree stump; it's said to be the spirit of a child lost in the forest.",
    "Pokémon battles were inspired by creator Satoshi Tajiri's childhood hobby of collecting insects.",
    'Pikachu was not originally intended to be the mascot of Pokémon; Clefairy was.',
    'The Pokémon Luvdisc is often given as a symbol of love in the Pokémon world.',
    'Wailord, despite being the largest Pokémon, is actually less dense than water and would float.',
    "Magcargo's body temperature is approximately 18,000°F, hotter than the surface of the sun.",
    'Gardevoir can create small black holes and will protect its trainer with its life.',
    'Spoink will die if it stops bouncing, as its heartbeat depends on it.',
    "Lanturn's light can be seen from the surface even when it's at the bottom of the ocean.",
    'Unown comes in 28 different forms, one for each letter of the alphabet plus ! and ?.',
    'Metagross has four brains that are connected by a complex neural network.',
    'Kyogre can expand the seas by causing heavy rainfall, while Groudon can expand continents by evaporating water.',
    'Regigigas is said to have towed continents into place using ropes.',
    'Giratina was banished to the Distortion World for its violence.',
    'Darkrai gives people nightmares unintentionally; it actually tries to protect people from bad dreams.',
    'Jirachi awakens for only seven days every thousand years.',
    'Deoxys was born from a space virus that was exposed to a laser beam.',
    'Rotom can possess and control various electrical appliances.',
    'Lucario can see aura, the life force energy that exists in all living things.',
    'Diancie is a mutation of Carbink that can compress carbon into diamonds.',
    "Volcarona's wings are said to replace the sun when it's dark with volcanic ash blocking the sky.",
    'Hydreigon develops a new head each time it evolves.',
    'Tyranitar can topple mountains with its immense strength.',
    'Shedinja is the empty shell left behind when Nincada evolves, and it has the unique Wonder Guard ability.',
    'Relicanth has remained unchanged for 100 million years and lives in the deep sea.',
    'Mew contains the DNA of all Pokémon and can learn any move.',
    "Celebi has the power to travel through time and is known as the 'Voice of the Forest'.",
    'Rayquaza lives in the ozone layer and comes down to the ground only to resolve conflicts between Kyogre and Groudon.',
    'Victini is said to bring victory to any trainer who befriends it.',
    'Zygarde is responsible for maintaining the ecosystem and takes different forms depending on the threat level.',
    'Necrozma absorbs light, and in its original form, it emitted light across the Ultra Space.',
    'Meltan is made of liquid metal and can dissolve and absorb metal objects.',
    'Eternatus is responsible for the Dynamax phenomenon in the Galar region.',
    "Zarude lives in packs in dense forests and is known as the 'Rogue Monkey'.",
    'Calyrex once ruled all of Galar and has the power to see every past, present, and future event.',
  ];

  useEffect(() => {
    // Randomly decide when to show the Pokeball
    const showPokeball = () => {
      // 30% chance to show the Pokeball when the function is called
      if (Math.random() < 0.3 && !isVisible && !isClicked) {
        // Generate random position within the viewport
        const x = Math.random() * (window.innerWidth - 100); // Subtract Pokeball size
        const y = Math.random() * (window.innerHeight - 100); // Subtract Pokeball size

        // Make sure it's not too close to the edges
        const safeX = Math.max(20, Math.min(x, window.innerWidth - 80));
        const safeY = Math.max(20, Math.min(y, window.innerHeight - 80));

        setPosition({ x: safeX, y: safeY });
        setIsVisible(true);

        // Hide it again after some time if not clicked
        setTimeout(() => {
          if (!isClicked) {
            setIsVisible(false);
          }
        }, 8000);
      }
    };

    // Check periodically if we should show the Pokeball
    const interval = setInterval(showPokeball, 15000);

    // Initial check
    showPokeball();

    return () => clearInterval(interval);
  }, [isVisible, isClicked]);

  const handleClick = () => {
    setIsClicked(true);
    // Select a random Pokemon fact
    const randomFact =
      pokemonFacts[Math.floor(Math.random() * pokemonFacts.length)];
    setPokemonFact(randomFact);

    // Reset after showing the fact
    setTimeout(() => {
      setIsClicked(false);
      setIsVisible(false);
      setPokemonFact('');
    }, 5000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='fixed z-50 cursor-pointer'
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{ top: position.y, left: position.x }}
        >
          {!isClicked ? (
            <motion.div
              className='relative'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                },
              }}
              onClick={handleClick}
            >
              <div className='relative filter drop-shadow-[0_0_8px_rgba(255,0,0,0.3)]'>
                <div className='w-16 h-16 rounded-full border-2 border-gray-800 relative overflow-hidden shadow-lg'>
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-red-400 via-red-500 to-rose-600'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-br from-white via-gray-50 to-slate-100'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-800'></div>
                </div>
              </div>
              <motion.div
                className='absolute -top-1 -right-1 text-yellow-400'
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Sparkles size={12} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className='bg-white p-4 rounded-lg shadow-lg border-2 border-blue-400 max-w-xs'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className='text-center'
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: 4 }}
              >
                <h4 className='font-bold text-blue-600 mb-2'>Pokémon Fact!</h4>
                <p className='text-gray-700'>{pokemonFact}</p>
              </motion.div>
              <div className='flex justify-center mt-3'>
                <motion.div
                  className='w-8 h-8 rounded-full border-2 border-gray-800 relative overflow-hidden'
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: 2 }}
                >
                  <div className='absolute top-0 left-0 w-full h-1/2 bg-red-500'></div>
                  <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border-2 border-gray-800'></div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
