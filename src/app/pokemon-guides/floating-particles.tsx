import { motion } from 'framer-motion';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  particleClassName?: string;
  animationDuration?: number;
  delayMultiplier?: number;
}

export default function FloatingParticles({
  count = 3,
  className = '',
  particleClassName = 'absolute w-2 h-2 rounded-full bg-white opacity-15',
  animationDuration = 3,
  delayMultiplier = 0.5,
}: FloatingParticlesProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={particleClassName}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * delayMultiplier,
            ease: 'easeInOut',
          }}
          style={{
            top: `${20 + i * 30}%`,
            left: `${20 + i * 20}%`,
          }}
        />
      ))}
    </div>
  );
}
