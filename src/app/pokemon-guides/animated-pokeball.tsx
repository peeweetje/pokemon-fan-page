import { motion } from 'framer-motion';

interface AnimatedPokeballProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animationType?: 'rotate' | 'float' | 'scale' | 'combined' | 'rotate-scale';
}

export default function AnimatedPokeball({
  size = 'medium',
  className = '',
  animationType = 'rotate',
}: AnimatedPokeballProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20',
  };

  const getAnimationProps = () => {
    switch (animationType) {
      case 'float':
        return {
          animate: {
            y: [0, -10, 0],
          },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut' as const,
          },
        };
      case 'scale':
        return {
          animate: {
            scale: [1, 1.1, 1],
          },
          transition: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut' as const,
          },
        };
      case 'rotate-scale':
        return {
          animate: {
            rotate: 360,
            scale: [1, 1.1, 1],
          },
          transition: {
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear' as const,
            },
            scale: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut' as const,
            },
          },
        };
      case 'combined':
        return {
          animate: {
            rotate: 360,
            y: [0, -10, 0],
          },
          transition: {
            rotate: {
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear' as const,
            },
            y: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut' as const,
            },
          },
        };
      case 'rotate':
      default:
        return {
          animate: {
            rotate: 360,
          },
          transition: {
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear' as const,
          },
        };
    }
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      {...getAnimationProps()}
    >
      <div className="w-full h-full rounded-full border-[4px] border-black relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-red-600 rounded-t-full"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-black"></div>
      </div>
    </motion.div>
  );
}
