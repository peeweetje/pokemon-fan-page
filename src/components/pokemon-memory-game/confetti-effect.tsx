import { motion } from 'framer-motion';

interface ConfettiEffectProps {
  showConfetti: boolean;
  shouldAnimate: boolean;
}

export function ConfettiEffect({
  showConfetti,
  shouldAnimate,
}: ConfettiEffectProps) {
  if (!showConfetti || !shouldAnimate) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-100 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            backgroundColor: [
              '#FFD700',
              '#FF69B4',
              '#00BFFF',
              '#FF4500',
              '#32CD32',
              '#FF1493',
              '#00FF00',
              '#FFA500',
            ][Math.floor(Math.random() * 8)],
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: ['100vh'],
            x: [0, Math.random() * 200 - 100],
            rotate: [0, 360],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            ease: 'linear',
            repeat: 0,
          }}
        />
      ))}
    </div>
  );
}
