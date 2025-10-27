import { EvolutionCard } from './evolution-card';
import { EvolutionGroup } from './evolution-types';

interface EvolutionGroupGridProps {
  groups: EvolutionGroup[];
}

export function EvolutionGroupGrid({ groups }: EvolutionGroupGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => (
        <EvolutionCard key={group.id} group={group} />
      ))}
    </div>
  );
}
