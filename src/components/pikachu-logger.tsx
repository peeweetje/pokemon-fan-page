'use client';

import { useEffect } from 'react';
import { pikachuAscii } from '../utils/pikachu-ascii';

export function PikachuLogger() {
  useEffect(() => {
    console.log(pikachuAscii);
  }, []);

  return null;
}
