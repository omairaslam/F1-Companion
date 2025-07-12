'use client';

import { useState } from 'react';
import { Heart, ExternalLink, User, Calendar, MapPin } from 'lucide-react';
import { ErgastDriver } from '@/lib/api/ergast';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface DriverCardProps {
  driver: ErgastDriver;
  showFavoriteButton?: boolean;
  compact?: boolean;
}

export function DriverCard({ driver, showFavoriteButton = true, compact = false }: DriverCardProps) {
  const { isDriverFavorite, toggleFavoriteDriver } = useUserPreferences();
  const [isToggling, setIsToggling] = useState(false);
  
  const isFavorite = isDriverFavorite(driver.driverId);

  const handleToggleFavorite = async () => {
    setIsToggling(true);
    try {
      toggleFavoriteDriver(driver.driverId);
    } finally {
      setIsToggling(false);
    }
  };

  const getDriverAge = () => {
    const birthDate = new Date(driver.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getCountryFlag = (nationality: string) => {
    const flagMap: { [key: string]: string } = {
      'Dutch': '🇳🇱',
      'British': '🇬🇧',
      'Monégasque': '🇲🇨',
      'Australian': '🇦🇺',
      'Spanish': '🇪🇸',
      'Mexican': '🇲🇽',
      'Canadian': '🇨🇦',
      'German': '🇩🇪',
      'French': '🇫🇷',
      'Italian': '🇮🇹',
      'Finnish': '🇫🇮',
      'Danish': '🇩🇰',
      'Japanese': '🇯🇵',
      'Thai': '🇹🇭',
      'Chinese': '🇨🇳',
    };
    return flagMap[nationality] || '🏁';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {driver.code || driver.familyName.slice(0, 3).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900 truncate">
              {driver.givenName} {driver.familyName}
            </span>
            <span className="text-xl">{getCountryFlag(driver.nationality)}</span>
          </div>
          <p className="text-sm text-gray-600">#{driver.permanentNumber}</p>
        </div>

        {showFavoriteButton && (
          <button
            onClick={handleToggleFavorite}
            disabled={isToggling}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100'
                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
            } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header with driver number and favorite button */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              #{driver.permanentNumber || '00'}
            </div>
            <div>
              <h3 className="text-xl font-bold">{driver.givenName} {driver.familyName}</h3>
              <p className="text-red-100 text-sm">{driver.code}</p>
            </div>
          </div>
          
          {showFavoriteButton && (
            <button
              onClick={handleToggleFavorite}
              disabled={isToggling}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? 'text-white bg-white/20 hover:bg-white/30'
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Driver details */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{driver.nationality}</span>
          <span className="text-2xl">{getCountryFlag(driver.nationality)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Age: {getDriverAge()}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span className="text-sm">Born: {new Date(driver.dateOfBirth).toLocaleDateString()}</span>
        </div>

        {/* Action buttons */}
        <div className="pt-3 border-t border-gray-100">
          <a
            href={driver.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
