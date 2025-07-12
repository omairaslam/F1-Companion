'use client';

import { useState, useEffect, useCallback } from 'react';
import { ErgastRace, ergastAPI } from '@/lib/api/ergast';
import { RaceCard, NextRaceCard, RaceListItem } from './RaceCard';
import { RaceWeekendCountdown } from './Countdown';
import { getNextSession } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { Calendar, Grid, List, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface RaceCalendarProps {
  className?: string;
  season?: number;
  showNextRace?: boolean;
  showCountdown?: boolean;
  defaultView?: 'grid' | 'list';
  maxRaces?: number;
}

export function RaceCalendar({
  className,
  season,
  showNextRace = true,
  showCountdown = true,
  defaultView = 'grid',
  maxRaces,
}: RaceCalendarProps) {
  const [races, setRaces] = useState<ErgastRace[]>([]);
  const [nextRace, setNextRace] = useState<ErgastRace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>(defaultView);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRaces = useCallback(async (showRefreshing = false) => {
    try {
      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const raceData = season 
        ? await ergastAPI.getSeasonRaces(season)
        : await ergastAPI.getCurrentSeasonRaces();

      let racesToShow = raceData;
      if (maxRaces) {
        racesToShow = raceData.slice(0, maxRaces);
      }

      setRaces(racesToShow);

      // Get next race if showing current season
      if (!season || season === new Date().getFullYear()) {
        const nextRaceData = await ergastAPI.getNextRace();
        setNextRace(nextRaceData);
      }
    } catch (err) {
      console.error('Error fetching races:', err);
      setError('Failed to load race calendar. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [season, maxRaces]);

  useEffect(() => {
    fetchRaces();
  }, [fetchRaces]);

  const handleRefresh = () => {
    fetchRaces(true);
  };

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading race calendar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center p-8', className)}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Calendar</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (races.length === 0) {
    return (
      <div className={cn('text-center p-8', className)}>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Races Found</h3>
          <p className="text-gray-600">No races are scheduled for this season.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {season ? `${season} Season` : 'Race Calendar'}
          </h2>
          <p className="text-gray-600">
            {races.length} race{races.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh calendar"
          >
            <RefreshCw className={cn('w-5 h-5', refreshing && 'animate-spin')} />
          </button>
          
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'p-2 rounded-md transition-colors',
                view === 'grid' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              )}
              title="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'p-2 rounded-md transition-colors',
                view === 'list' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              )}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Next Race Section */}
      {showNextRace && nextRace && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Next Race</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <NextRaceCard race={nextRace} />
            {showCountdown && (
              <RaceWeekendCountdown
                nextSession={getNextSession({
                  firstPractice: nextRace.FirstPractice,
                  secondPractice: nextRace.SecondPractice,
                  thirdPractice: nextRace.ThirdPractice,
                  qualifying: nextRace.Qualifying,
                  sprint: nextRace.Sprint,
                  race: { date: nextRace.date, time: nextRace.time || '14:00:00Z' },
                })}
                raceName={nextRace.raceName}
              />
            )}
          </div>
        </div>
      )}

      {/* All Races Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {showNextRace && nextRace ? 'All Races' : 'Races'}
        </h3>
        
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {races.map((race) => (
              <RaceCard
                key={`${race.season}-${race.round}`}
                race={race}
                showCountdown={showCountdown}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {races.map((race, index) => (
              <RaceListItem
                key={`${race.season}-${race.round}`}
                race={race}
                className={index === races.length - 1 ? 'border-b-0' : ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Compact version for dashboard
interface CompactRaceCalendarProps {
  className?: string;
  maxRaces?: number;
}

export function CompactRaceCalendar({ className, maxRaces = 3 }: CompactRaceCalendarProps) {
  const [upcomingRaces, setUpcomingRaces] = useState<ErgastRace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingRaces = async () => {
      try {
        const races = await ergastAPI.getUpcomingRaces(maxRaces);
        setUpcomingRaces(races);
      } catch (error) {
        console.error('Error fetching upcoming races:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingRaces();
  }, [maxRaces]);

  if (loading) {
    return (
      <div className={cn('p-4', className)}>
        <div className="animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {upcomingRaces.map((race) => (
        <RaceCard
          key={`${race.season}-${race.round}`}
          race={race}
          variant="compact"
          showCountdown={true}
        />
      ))}
    </div>
  );
}
