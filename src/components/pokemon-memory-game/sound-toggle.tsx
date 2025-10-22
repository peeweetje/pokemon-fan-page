import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

export function SoundToggle({ soundEnabled, onToggle }: SoundToggleProps) {
  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      className="rounded-full p-2 sm:p-4 h-12 w-12 sm:h-16 sm:w-16"
    >
      {soundEnabled ? (
        <Volume2 className="h-6 w-6 sm:h-12 sm:w-12" />
      ) : (
        <VolumeX className="h-6 w-6 sm:h-12 sm:w-12" />
      )}
    </Button>
  );
}
