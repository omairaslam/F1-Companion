'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Heart, Users } from 'lucide-react';
import { ErgastDriver } from '@/lib/api/ergast';
import { ergastAPI } from '@/lib/api/ergast';
import { DriverCard } from './DriverCard';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export function DriverSelection() {
  const [drivers, setDrivers] = useState<ErgastDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'nationality' | 'number'>('name');
  
  const { preferences, getFavoriteDriversData } = useUserPreferences();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        setError(null);
        const driversData = await ergastAPI.getCurrentSeasonDrivers();
        setDrivers(driversData);
      } catch (err) {
        setError('Failed to load drivers. Please try again later.');
        console.error('Error fetching drivers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const filteredAndSortedDrivers = useMemo(() => {
    let filtered = drivers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(driver =>
        `${driver.givenName} ${driver.familyName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.code?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by favorites
    if (filterBy === 'favorites') {
      filtered = getFavoriteDriversData(filtered);
    }

    // Sort drivers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.givenName} ${a.familyName}`.localeCompare(`${b.givenName} ${b.familyName}`);
        case 'nationality':
          return a.nationality.localeCompare(b.nationality);
        case 'number':
          const aNum = parseInt(a.permanentNumber || '999');
          const bNum = parseInt(b.permanentNumber || '999');
          return aNum - bNum;
        default:
          return 0;
      }
    });

    return filtered;
  }, [drivers, searchTerm, filterBy, sortBy, getFavoriteDriversData]);

  const favoriteCount = preferences.favoriteDrivers.length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading F1 drivers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Users className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Drivers</h3>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Favorite Drivers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select your favorite F1 drivers to get personalized updates, performance stats, and race notifications.
          You currently have {favoriteCount} favorite driver{favoriteCount !== 1 ? 's' : ''}.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search drivers by name, nationality, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'favorites')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All Drivers</option>
              <option value="favorites">Favorites Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'nationality' | 'number')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="nationality">Sort by Nationality</option>
              <option value="number">Sort by Number</option>
            </select>
          </div>
        </div>

        {/* Filter summary */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
          <span>Showing {filteredAndSortedDrivers.length} of {drivers.length} drivers</span>
          {favoriteCount > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-600 fill-current" />
              {favoriteCount} favorite{favoriteCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Drivers Grid */}
      {filteredAndSortedDrivers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Drivers Found</h3>
          <p className="text-gray-600">
            {filterBy === 'favorites' && favoriteCount === 0
              ? 'You haven\'t selected any favorite drivers yet. Try browsing all drivers!'
              : 'Try adjusting your search or filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedDrivers.map((driver) => (
            <DriverCard
              key={driver.driverId}
              driver={driver}
              showFavoriteButton={true}
            />
          ))}
        </div>
      )}

      {/* Quick stats */}
      {drivers.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{drivers.length}</div>
              <div className="text-sm text-gray-600">Total Drivers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
              <div className="text-sm text-gray-600">Your Favorites</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {new Set(drivers.map(d => d.nationality)).size}
              </div>
              <div className="text-sm text-gray-600">Nationalities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {drivers.filter(d => d.permanentNumber).length}
              </div>
              <div className="text-sm text-gray-600">With Numbers</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
