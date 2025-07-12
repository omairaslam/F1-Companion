'use client';

import { ErgastRace, getRaceDateTime, isRaceToday, isRaceThisWeekend } from '@/lib/api/ergast';
import { MiniCountdown } from './Countdown';
import { cn, formatDate, formatTime } from '@/lib/utils';
import { MapPin, Clock, Calendar, ExternalLink, Flag } from 'lucide-react';

interface RaceCardProps {
  race: ErgastRace;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
  showCountdown?: boolean;
  onClick?: () => void;
}

export function RaceCard({
  race,
  className,
  variant = 'default',
  showCountdown = true,
  onClick,
}: RaceCardProps) {
  const raceDateTime = getRaceDateTime(race);
  const isToday = isRaceToday(race);
  const isThisWeekend = isRaceThisWeekend(race);
  const isPast = raceDateTime < new Date();

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-4',
          title: 'text-base font-semibold',
          subtitle: 'text-sm',
          details: 'text-xs',
        };
      case 'featured':
        return {
          container: 'p-8',
          title: 'text-2xl font-bold',
          subtitle: 'text-lg',
          details: 'text-base',
        };
      default:
        return {
          container: 'p-6',
          title: 'text-lg font-semibold',
          subtitle: 'text-base',
          details: 'text-sm',
        };
    }
  };

  const styles = getVariantStyles();

  const getStatusBadge = () => {
    if (isPast) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
          <Flag className="w-3 h-3" />
          Completed
        </span>
      );
    }

    if (isToday) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full racing-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          Today
        </span>
      );
    }

    if (isThisWeekend) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
          <Clock className="w-3 h-3" />
          This Weekend
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
        <Calendar className="w-3 h-3" />
        Upcoming
      </span>
    );
  };

  const getCircuitFlag = (country: string) => {
    // Map country names to flag emojis
    const flagMap: Record<string, string> = {
      'Bahrain': '🇧🇭',
      'Saudi Arabia': '🇸🇦',
      'Australia': '🇦🇺',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'Miami': '🇺🇸',
      'Italy': '🇮🇹',
      'Monaco': '🇲🇨',
      'Canada': '🇨🇦',
      'Spain': '🇪🇸',
      'Austria': '🇦🇹',
      'UK': '🇬🇧',
      'Hungary': '🇭🇺',
      'Belgium': '🇧🇪',
      'Netherlands': '🇳🇱',
      'Singapore': '🇸🇬',
      'USA': '🇺🇸',
      'Mexico': '🇲🇽',
      'Brazil': '🇧🇷',
      'Las Vegas': '🇺🇸',
      'Qatar': '🇶🇦',
      'Abu Dhabi': '🇦🇪',
    };

    return flagMap[country] || '🏁';
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200',
        styles.container,
        isToday && 'ring-2 ring-red-500 ring-opacity-50',
        isThisWeekend && !isToday && 'ring-2 ring-orange-500 ring-opacity-30',
        onClick && 'cursor-pointer hover:border-red-300',
        isPast && 'opacity-75',
        className
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{getCircuitFlag(race.Circuit.Location.country)}</span>
            <h3 className={cn(styles.title, 'text-gray-900')}>
              {race.raceName}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className={styles.subtitle}>
              {race.Circuit.Location.locality}, {race.Circuit.Location.country}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge()}
          <span className={cn(styles.details, 'text-gray-500')}>
            Round {race.round}
          </span>
        </div>
      </div>

      {/* Circuit Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Flag className="w-4 h-4" />
          <span className={styles.details}>
            {race.Circuit.circuitName}
          </span>
        </div>
      </div>

      {/* Date and Time */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className={styles.details}>
              {formatDate(raceDateTime)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className={styles.details}>
              {formatTime(raceDateTime)} UTC
            </span>
          </div>
        </div>
        
        {showCountdown && !isPast && (
          <MiniCountdown targetDate={raceDateTime} />
        )}
      </div>

      {/* Sessions */}
      {(race.FirstPractice || race.Qualifying) && (
        <div className="border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
            {race.FirstPractice && (
              <div>
                <span className="font-medium">Practice 1:</span>
                <br />
                {formatDate(new Date(race.FirstPractice.date))} {race.FirstPractice.time}
              </div>
            )}
            {race.Qualifying && (
              <div>
                <span className="font-medium">Qualifying:</span>
                <br />
                {formatDate(new Date(race.Qualifying.date))} {race.Qualifying.time}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Season {race.season}
        </div>
        <a
          href={race.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          View Details
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

// Specialized card for next race
interface NextRaceCardProps {
  race: ErgastRace | null;
  className?: string;
}

export function NextRaceCard({ race, className }: NextRaceCardProps) {
  if (!race) {
    return (
      <div className={cn('bg-gray-50 rounded-lg p-8 text-center', className)}>
        <div className="text-gray-500">
          <Flag className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Upcoming Races</h3>
          <p>The season has ended or no races are scheduled.</p>
        </div>
      </div>
    );
  }

  return (
    <RaceCard
      race={race}
      variant="featured"
      className={cn('border-2 border-red-200 bg-gradient-to-br from-white to-red-50', className)}
      showCountdown={true}
    />
  );
}

// Compact race list item
interface RaceListItemProps {
  race: ErgastRace;
  className?: string;
  onClick?: () => void;
}

export function RaceListItem({ race, className, onClick }: RaceListItemProps) {
  const raceDateTime = getRaceDateTime(race);
  const isPast = raceDateTime < new Date();

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors',
        onClick && 'cursor-pointer',
        isPast && 'opacity-60',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{getCircuitFlag(race.Circuit.Location.country)}</span>
        <div>
          <h4 className="font-medium text-gray-900">{race.raceName}</h4>
          <p className="text-sm text-gray-600">
            {race.Circuit.Location.locality}, {race.Circuit.Location.country}
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
          {formatDate(raceDateTime)}
        </div>
        <div className="text-xs text-gray-600">
          Round {race.round}
        </div>
      </div>
    </div>
  );

  function getCircuitFlag(country: string): string {
    const flagMap: Record<string, string> = {
      'Bahrain': '🇧🇭',
      'Saudi Arabia': '🇸🇦',
      'Australia': '🇦🇺',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'Miami': '🇺🇸',
      'Italy': '🇮🇹',
      'Monaco': '🇲🇨',
      'Canada': '🇨🇦',
      'Spain': '🇪🇸',
      'Austria': '🇦🇹',
      'UK': '🇬🇧',
      'Hungary': '🇭🇺',
      'Belgium': '🇧🇪',
      'Netherlands': '🇳🇱',
      'Singapore': '🇸🇬',
      'USA': '🇺🇸',
      'Mexico': '🇲🇽',
      'Brazil': '🇧🇷',
      'Las Vegas': '🇺🇸',
      'Qatar': '🇶🇦',
      'Abu Dhabi': '🇦🇪',
    };

    return flagMap[country] || '🏁';
  }
}
