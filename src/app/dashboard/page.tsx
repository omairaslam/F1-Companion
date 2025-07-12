import { Metadata } from 'next';
import { PersonalizedDashboard } from '@/components/dashboard/PersonalizedDashboard';

export const metadata: Metadata = {
  title: 'Dashboard | F1 Companion',
  description: 'Your personalized Formula 1 dashboard with favorite drivers, teams, and performance statistics.',
  keywords: 'F1 dashboard, personalized F1, favorite drivers, favorite teams, F1 stats',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PersonalizedDashboard />
      </div>
    </div>
  );
}
