'use client';

import { useState, useEffect } from 'react';
import { Heart, Users, Building2, Settings, Plus } from 'lucide-react';
import Link from 'next/link';
import { ErgastDriver, ErgastConstructor } from '@/lib/api/ergast';
import { ergastAPI } from '@/lib/api/ergast';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { DriverCard } from '@/components/drivers/DriverCard';
import { TeamCard } from '@/components/teams/TeamCard';

export function PersonalizedDashboard() {
  const [allDrivers, setAllDrivers] = useState<ErgastDriver[]>([]);
  const [allTeams, setAllTeams] = useState<ErgastConstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    getFavoriteDriversData,
    getFavoriteTeamsData,
    isLoading: preferencesLoading
  } = useUserPreferences();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [driversData, teamsData] = await Promise.all([
          ergastAPI.getCurrentSeasonDrivers(),
          ergastAPI.getCurrentSeasonConstructors()
        ]);
        
        setAllDrivers(driversData);
        setAllTeams(teamsData);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const favoriteDrivers = getFavoriteDriversData(allDrivers);
  const favoriteTeams = getFavoriteTeamsData(allTeams);
  const hasAnyFavorites = favoriteDrivers.length > 0 || favoriteTeams.length > 0;

  if (loading || preferencesLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Heart className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!hasAnyFavorites) {
    return (
      <div className="space-y-6">
        {/* Welcome message */}
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your F1 Dashboard!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Get started by selecting your favorite drivers and teams to create a personalized F1 experience. 
            You&apos;ll see their performance stats, upcoming races, and achievements all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/drivers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Users className="w-5 h-5" />
              Choose Favorite Drivers
            </Link>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Building2 className="w-5 h-5" />
              Choose Favorite Teams
            </Link>
          </div>
        </div>

        {/* Quick stats about available options */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available to Follow</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600">{allDrivers.length}</div>
              <div className="text-sm text-gray-600">F1 Drivers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">{allTeams.length}</div>
              <div className="text-sm text-gray-600">F1 Teams</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your F1 Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Following {favoriteDrivers.length} driver{favoriteDrivers.length !== 1 ? 's' : ''} and {favoriteTeams.length} team{favoriteTeams.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{favoriteDrivers.length}</div>
          <div className="text-sm text-gray-600">Favorite Drivers</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{favoriteTeams.length}</div>
          <div className="text-sm text-gray-600">Favorite Teams</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">-</div>
          <div className="text-sm text-gray-600">Total Points</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">-</div>
          <div className="text-sm text-gray-600">Race Wins</div>
        </div>
      </div>

      {/* Favorite Drivers Section */}
      {favoriteDrivers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-red-600" />
              Your Favorite Drivers
            </h2>
            <Link
              href="/drivers"
              className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Manage Drivers
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteDrivers.map((driver) => (
              <DriverCard
                key={driver.driverId}
                driver={driver}
                showFavoriteButton={true}
                compact={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Favorite Teams Section */}
      {favoriteTeams.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-red-600" />
              Your Favorite Teams
            </h2>
            <Link
              href="/teams"
              className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Manage Teams
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoriteTeams.map((team) => (
              <TeamCard
                key={team.constructorId}
                team={team}
                showFavoriteButton={true}
                compact={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity Placeholder */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-gray-600 text-center py-8">
          Activity tracking coming soon! You&apos;ll see updates about your favorite drivers and teams here.
        </p>
      </div>
    </div>
  );
}
