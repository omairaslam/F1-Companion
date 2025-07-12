'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Heart, Building2 } from 'lucide-react';
import { ErgastConstructor } from '@/lib/api/ergast';
import { ergastAPI } from '@/lib/api/ergast';
import { TeamCard } from './TeamCard';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export function TeamSelection() {
  const [teams, setTeams] = useState<ErgastConstructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'nationality'>('name');
  
  const { preferences, getFavoriteTeamsData } = useUserPreferences();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        setError(null);
        const teamsData = await ergastAPI.getCurrentSeasonConstructors();
        setTeams(teamsData);
      } catch (err) {
        setError('Failed to load teams. Please try again later.');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredAndSortedTeams = useMemo(() => {
    let filtered = teams;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.constructorId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by favorites
    if (filterBy === 'favorites') {
      filtered = getFavoriteTeamsData(filtered);
    }

    // Sort teams
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'nationality':
          return a.nationality.localeCompare(b.nationality);
        default:
          return 0;
      }
    });

    return filtered;
  }, [teams, searchTerm, filterBy, sortBy, getFavoriteTeamsData]);

  const favoriteCount = preferences.favoriteTeams.length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading F1 teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <Building2 className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Teams</h3>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Favorite Teams</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select your favorite F1 constructors to get team updates, performance stats, and championship standings.
          You currently have {favoriteCount} favorite team{favoriteCount !== 1 ? 's' : ''}.
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
              placeholder="Search teams by name, nationality, or constructor ID..."
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
              <option value="all">All Teams</option>
              <option value="favorites">Favorites Only</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'nationality')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="nationality">Sort by Nationality</option>
            </select>
          </div>
        </div>

        {/* Filter summary */}
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
          <span>Showing {filteredAndSortedTeams.length} of {teams.length} teams</span>
          {favoriteCount > 0 && (
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-600 fill-current" />
              {favoriteCount} favorite{favoriteCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Teams Grid */}
      {filteredAndSortedTeams.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Teams Found</h3>
          <p className="text-gray-600">
            {filterBy === 'favorites' && favoriteCount === 0
              ? 'You haven\'t selected any favorite teams yet. Try browsing all teams!'
              : 'Try adjusting your search or filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTeams.map((team) => (
            <TeamCard
              key={team.constructorId}
              team={team}
              showFavoriteButton={true}
            />
          ))}
        </div>
      )}

      {/* Quick stats */}
      {teams.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{teams.length}</div>
              <div className="text-sm text-gray-600">Total Teams</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{favoriteCount}</div>
              <div className="text-sm text-gray-600">Your Favorites</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {new Set(teams.map(t => t.nationality)).size}
              </div>
              <div className="text-sm text-gray-600">Nationalities</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">10</div>
              <div className="text-sm text-gray-600">Grid Positions</div>
            </div>
          </div>
        </div>
      )}

      {/* Team info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">About F1 Teams</h3>
        <p className="text-gray-700 text-sm">
          Formula 1 constructors are the teams that design and build the cars. Each team can field up to two cars 
          in each race. Teams compete for the Constructors&apos; Championship based on the combined points scored by 
          both their drivers throughout the season.
        </p>
      </div>
    </div>
  );
}
