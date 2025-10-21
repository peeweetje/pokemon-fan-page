import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { Difficulty } from '@/utils/memory-game-helper';

interface SettingsDialogProps {
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  prefersReducedMotion: boolean | undefined;
  onDifficultyChange: () => void;
}

export function SettingsDialog({
  difficulty,
  setDifficulty,
  soundEnabled,
  setSoundEnabled,
  animationsEnabled,
  setAnimationsEnabled,
  prefersReducedMotion,
  onDifficultyChange,
}: SettingsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full p-2 sm:p-4 h-12 w-12 sm:h-16 sm:w-16"
        >
          <Settings className="h-6 w-6 sm:h-12 sm:w-12" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] mx-4">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Difficulty</h4>
            <div className="flex justify-center gap-2 sm:gap-4">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <Button
                  key={level}
                  onClick={() => {
                    setDifficulty(level);
                    onDifficultyChange();
                  }}
                  variant={difficulty === level ? 'default' : 'outline'}
                  className="text-xs sm:text-sm px-2 sm:px-4"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sound-toggle" className="text-sm font-medium">
              Sound Effects
            </Label>
            <Switch
              id="sound-toggle"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="animations-toggle" className="text-sm font-medium">
              Animations
            </Label>
            <Switch
              id="animations-toggle"
              checked={animationsEnabled}
              onCheckedChange={setAnimationsEnabled}
              disabled={prefersReducedMotion}
            />
          </div>
          {prefersReducedMotion && (
            <p className="text-xs text-gray-500 text-center">
              Animations are disabled due to system preferences
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
