'use client';

import { useState, useEffect } from 'react';
import { cn } from '@lib/utils';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'pokeball' | 'simple' | 'dots';
  text?: string;
  className?: string;
  textClassName?: string;
  showText?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

export function LoadingSpinner({
  size = 'md',
  variant = 'pokeball',
  text = 'Loading...',
  className,
  textClassName,
  showText = true,
  speed = 'normal',
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Size mappings
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  // Speed mappings (in seconds)
  const speedValues = {
    slow: 2,
    normal: 1.2,
    fast: 0.7,
  };

  // Text size mappings
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  // Render the appropriate spinner based on variant
  const renderSpinner = () => {
    switch (variant) {
      case 'pokeball':
        return (
          <motion.div
            className={cn(
              'relative rounded-full border-4 border-gray-800',
              sizeClasses[size],
              className
            )}
            animate={{ rotate: 360 }}
            transition={{
              duration: speedValues[speed],
              ease: 'linear',
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='absolute w-full h-1/2 top-0 bg-red-600 rounded-t-full'></div>
              <div className='absolute w-full h-1/2 bottom-0 bg-white rounded-b-full'></div>
              <div
                className={cn(
                  'absolute bg-white border-4 border-gray-800 rounded-full z-10',
                  {
                    'w-2 h-2': size === 'sm',
                    'w-3 h-3': size === 'md',
                    'w-5 h-5': size === 'lg',
                    'w-7 h-7': size === 'xl',
                  }
                )}
              ></div>
            </div>
          </motion.div>
        );

      case 'dots':
        return (
          <div className='flex space-x-2'>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  'rounded-full bg-blue-500',
                  sizeClasses[size],
                  className
                )}
                initial={{ scale: 0.5, opacity: 0.3 }}
                animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: speedValues[speed],
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );

      case 'simple':
      default:
        return (
          <motion.div
            className={cn(
              'border-4 border-gray-300 border-t-blue-500 rounded-full',
              sizeClasses[size],
              className
            )}
            animate={{ rotate: 360 }}
            transition={{
              duration: speedValues[speed],
              ease: 'linear',
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        );
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      {renderSpinner()}
      {showText && (
        <p
          className={cn(
            'mt-3 text-gray-600 font-medium',
            textSizes[size],
            textClassName
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
