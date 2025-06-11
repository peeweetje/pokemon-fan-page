'use client';

import { LoadingSkeleton } from './loading-skeleton';

export function PokemonCardSkeleton() {
  return (
    <div className='border-2 border-gray-200 rounded-md overflow-hidden h-full'>
      {/* Pokemon ID */}
      <div className='pt-2 px-2'>
        <LoadingSkeleton variant='text' width='40px' height='12px' />
      </div>

      {/* Pokemon Image */}
      <div className='pt-2 pb-0'>
        <div className='relative w-24 h-24 mx-auto'>
          <LoadingSkeleton variant='circle' width='96px' height='96px' />
        </div>
      </div>

      {/* Pokemon Info */}
      <div className='flex flex-col items-center p-2 mt-2 bg-white rounded-t-xl border-t border-gray-200'>
        {/* Name */}
        <LoadingSkeleton
          variant='text'
          width='80px'
          height='20px'
          className='mb-1'
        />

        {/* Types */}
        <div className='flex justify-center gap-1 w-full'>
          <LoadingSkeleton variant='circle' width='60px' height='24px' />
          <LoadingSkeleton variant='circle' width='60px' height='24px' />
        </div>

        {/* Stats */}
        <div className='mt-1 grid grid-cols-3 gap-1 text-xs text-center w-full'>
          <div>
            <LoadingSkeleton
              variant='text'
              width='32px'
              height='16px'
              className='mx-auto'
            />
            <div className='text-gray-500 text-[10px]'>HP</div>
          </div>
          <div>
            <LoadingSkeleton
              variant='text'
              width='32px'
              height='16px'
              className='mx-auto'
            />
            <div className='text-gray-500 text-[10px]'>ATK</div>
          </div>
          <div>
            <LoadingSkeleton
              variant='text'
              width='32px'
              height='16px'
              className='mx-auto'
            />
            <div className='text-gray-500 text-[10px]'>DEF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
