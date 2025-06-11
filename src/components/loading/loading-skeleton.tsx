import type React from 'react';
import { cn } from '@lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'rectangle';
  count?: number;
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function LoadingSkeleton({
  className,
  variant = 'rectangle',
  count = 1,
  width,
  height,
  animate = true,
}: LoadingSkeletonProps) {
  const baseClasses = cn(
    'bg-gray-200',
    animate ? 'animate-pulse' : '',
    {
      'rounded-full': variant === 'circle',
      'rounded-md':
        variant === 'rectangle' || variant === 'card' || variant === 'text',
    },
    className
  );

  const getStyle = () => {
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    } else {
      switch (variant) {
        case 'text':
          style.width = '100%';
          style.height = height || '1rem';
          break;
        case 'circle':
          style.width = width || '3rem';
          style.height = height || width || '3rem';
          break;
        case 'card':
          style.width = '100%';
          style.height = height || '200px';
          break;
        default:
          style.width = width || '100%';
          style.height = height || '2rem';
      }
    }

    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return style;
  };

  // For Pokemon card skeleton
  if (variant === 'card') {
    return (
      <div
        className={cn(
          'border-2 border-gray-200 rounded-md overflow-hidden',
          className
        )}
        style={getStyle()}
      >
        <div className='p-2'>
          <div className='w-12 h-4 bg-gray-200 rounded animate-pulse mb-2'></div>
          <div className='flex justify-center my-4'>
            <div className='w-24 h-24 bg-gray-200 rounded-full animate-pulse'></div>
          </div>
          <div className='bg-gray-100 p-4 rounded-t-xl mt-2'>
            <div className='w-full h-5 bg-gray-200 rounded animate-pulse mb-2'></div>
            <div className='flex justify-center gap-2'>
              <div className='w-16 h-5 bg-gray-200 rounded-full animate-pulse'></div>
              <div className='w-16 h-5 bg-gray-200 rounded-full animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={baseClasses} style={getStyle()} />
      ))}
    </>
  );
}
