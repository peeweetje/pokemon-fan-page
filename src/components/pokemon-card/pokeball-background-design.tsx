export function PokeballBackgroundDesign() {
  return (
    <div className='absolute top-0 right-0 w-16 h-16 opacity-10 z-0'>
      <div className='w-full h-full rounded-full border-[6px] border-black relative'>
        <div className='absolute top-0 left-0 w-full h-1/2 bg-red-600'></div>
        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black'></div>
      </div>
    </div>
  );
}
