import { Metadata } from 'next';
import { TeamSelection } from '@/components/teams/TeamSelection';

export const metadata: Metadata = {
  title: 'F1 Teams | F1 Companion',
  description: 'Choose your favorite Formula 1 constructors and follow their championship journey. Get team updates and performance statistics.',
  keywords: 'F1 teams, Formula 1 constructors, favorite teams, team stats, F1 2024, racing',
};

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <TeamSelection />
      </div>
    </div>
  );
}
