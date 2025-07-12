import { Metadata } from 'next';
import { DriverSelection } from '@/components/drivers/DriverSelection';

export const metadata: Metadata = {
  title: 'F1 Drivers | F1 Companion',
  description: 'Choose your favorite Formula 1 drivers and track their performance throughout the season. Get personalized updates and statistics.',
  keywords: 'F1 drivers, Formula 1, favorite drivers, driver stats, F1 2024, racing',
};

export default function DriversPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DriverSelection />
      </div>
    </div>
  );
}
