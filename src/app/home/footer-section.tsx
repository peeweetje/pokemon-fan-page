import Enhanced3DPokeball from '@/components/pokeball-three';

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center">
        <p>
          © {new Date().getFullYear()} Pokémon Explorer. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Pokémon and Pokémon character names are trademarks of Nintendo.
        </p>
      </div>
      <Enhanced3DPokeball />
    </footer>
  );
}
