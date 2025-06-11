import type React from 'react';
import { cn } from '@lib/utils';
import { LoadingSpinner } from './loading-spinner';

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
  spinnerVariant?: 'pokeball' | 'simple' | 'dots';
  text?: string;
  className?: string;
  overlayClassName?: string;
  fullScreen?: boolean;
}

export function LoadingOverlay({
  isLoading,
  children,
  spinnerSize = 'md',
  spinnerVariant = 'pokeball',
  text = 'Loading...',
  className,
  overlayClassName,
  fullScreen = false,
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn('relative', className)}>
      {/* Show children with reduced opacity when loading */}
      <div className='opacity-50 pointer-events-none'>{children}</div>

      {/* Overlay with spinner */}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50',
          fullScreen ? 'fixed' : 'absolute',
          overlayClassName
        )}
      >
        <LoadingSpinner
          size={spinnerSize}
          variant={spinnerVariant}
          text={text}
        />
      </div>
    </div>
  );
}
