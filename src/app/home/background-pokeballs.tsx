import { useState, useEffect } from 'react';

type Pokeball = {
  id: number;
  top: string;
  left: string;
  right: string;
  opacity: number;
};

// Client-side only component for background pokeballs
function BackgroundPokeballs() {
  const [pokeballs, setPokeballs] = useState<Pokeball[]>([]);

  useEffect(() => {
    // Generate random positions only on the client side
    const balls = [...Array(20)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      right: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setPokeballs(balls);
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-10">
      {pokeballs.map((ball) => (
        <div
          key={ball.id}
          className="absolute rounded-full border-8 border-white bg-gray-500 w-50 h-50"
          style={{
            top: ball.top,
            left: ball.left,
            opacity: ball.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default BackgroundPokeballs;
