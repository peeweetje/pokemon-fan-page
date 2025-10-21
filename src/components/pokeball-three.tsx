'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import * as THREE from 'three';

function PokeBallThree({ onClick }: { onClick: () => void }) {
  const ballRef = useRef<THREE.Group>(null);

  // Create a more dynamic animation
  useFrame((state) => {
    if (ballRef.current) {
      // Rotate the ball
      ballRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;

      // Add a gentle floating motion
      ballRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={ballRef} onClick={onClick} scale={[1, 1, 1]}>
      {/* Red top half with more detailed geometry */}
      <mesh
        key="red-top-half"
        position={[0, 0.025, 0]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#ff0000"
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>

      {/* White bottom half with more detailed geometry */}
      <mesh
        key="white-bottom-half"
        position={[0, -0.025, 0]}
        castShadow
        receiveShadow
      >
        <sphereGeometry
          args={[1, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
        />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.5}
          envMapIntensity={1}
        />
      </mesh>

      {/* Black middle band */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1.001, 0.05, 16, 100]} />
        <meshStandardMaterial color="#000000" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Center button outer ring */}
      <mesh position={[0, 0, 1.001]} castShadow receiveShadow>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshStandardMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>

      {/* Center button white part */}
      <mesh position={[0, 0, 1.002]} castShadow receiveShadow>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Center button inner part */}
      <mesh position={[0, 0, 1.003]} castShadow receiveShadow>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#cccccc" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Add highlights to enhance 3D effect */}
      <mesh position={[0.3, 0.3, 0.8]} castShadow receiveShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function Enhanced3DPokeball() {
  const [, setClicked] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Track screen size changes
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const facts = [
    'There are over 900 different species of Pokémon!',
    'Pikachu was originally going to be a second evolution of Raichu.',
    'Pokémon Red and Green were the first Pokémon games released in Japan.',
    "The name 'Pokémon' is a shortened form of 'Pocket Monsters'.",
    'Rhydon was the first Pokémon ever created.',
  ];

  const handleClick = () => {
    setClicked(true);
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    setFact(randomFact);
    setShowFact(true);

    setTimeout(() => {
      setClicked(false);
      setShowFact(false);
    }, 5000);
  };

  return (
    <div
      className={`fixed z-50 ${
        isMobile ? 'bottom-4 right-4' : 'bottom-10 right-10'
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        {/* Responsive canvas size */}
        <div className={`relative ${isMobile ? 'w-24 h-24' : 'w-40 h-40'}`}>
          <Canvas shadows dpr={[1, 2]}>
            {/* Use a perspective camera with better positioning */}
            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />

            {/* Better lighting setup */}
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {/* Add environment for realistic reflections */}
            <Environment preset="city" />

            {/* The enhanced 3D Pokeball */}
            <PokeBallThree onClick={handleClick} />

            {/* Add contact shadows for better grounding */}
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.4}
              scale={5}
              blur={2.5}
              far={4}
            />

            {/* Add orbit controls for user interaction */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>

          {/* Sparkle effect */}
          <motion.div
            className="absolute top-2 right-2 text-yellow-400 z-10"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles size={16} />
          </motion.div>
        </div>

        {/* Pokémon fact popup */}
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute bg-white rounded-lg shadow-lg border-2 border-blue-400 ${
              isMobile
                ? 'top-0 left-0 transform -translate-x-full -translate-y-1/4 p-3 w-48 text-sm'
                : 'top-0 left-0 transform -translate-x-full -translate-y-1/2 p-4 w-64'
            }`}
          >
            <h4
              className={`font-bold text-blue-600 mb-2 ${
                isMobile ? 'text-sm' : ''
              }`}
            >
              Pokémon Fact!
            </h4>
            <p className={`text-gray-700 ${isMobile ? 'text-xs' : ''}`}>
              {fact}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
