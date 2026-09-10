import BackButton from '@/components/back-button';
import SecretPokeball from '@/components/secret-pokeball';
import { BattleScoreClient } from './battle-score-client';

export default function BattleScore() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <BackButton href="/battle-simulator" text="Back to Battle Simulator" />
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Battle Scores
        </h1>
        <BattleScoreClient />
      </div>
      <SecretPokeball />
    </div>
  );
}
