import { Metadata } from 'next';
import { RaceCalendar } from '@/components/calendar/RaceCalendar';
import { Calendar, Flag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'F1 Race Calendar - F1 Companion',
  description: 'Complete Formula 1 race calendar with live countdowns, race schedules, and circuit information.',
  keywords: ['F1 calendar', 'Formula 1 races', 'Grand Prix schedule', 'race countdown'],
};

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-red-50/20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <Calendar className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">F1 Race Calendar</h1>
              <p className="text-gray-600">
                Complete Formula 1 race schedule with live countdowns and event details
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Current Season</span>
              </div>
              <div className="text-2xl font-bold text-red-600 mt-1">
                {new Date().getFullYear()}
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Races</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                23
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-900">Live Updates</span>
              </div>
              <div className="text-sm font-medium text-green-600 mt-1">
                Real-time countdowns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <RaceCalendar 
          showNextRace={true}
          showCountdown={true}
          defaultView="grid"
        />
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Calendar Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay up-to-date with the Formula 1 season
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Complete Schedule
              </h3>
              <p className="text-gray-600">
                Full race calendar with practice, qualifying, and race times for every Grand Prix
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Live Countdowns
              </h3>
              <p className="text-gray-600">
                Real-time countdowns to the next race, qualifying session, or practice
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Flag className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Circuit Information
              </h3>
              <p className="text-gray-600">
                Detailed information about each circuit including location and track details
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-purple-600">🌍</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Global Times
              </h3>
              <p className="text-gray-600">
                Race times displayed in UTC with easy conversion to your local timezone
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-orange-600">📱</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mobile Optimized
              </h3>
              <p className="text-gray-600">
                Responsive design that works perfectly on all devices and screen sizes
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 text-indigo-600">🔄</div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Auto Updates
              </h3>
              <p className="text-gray-600">
                Calendar automatically updates with the latest race information and schedule changes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
