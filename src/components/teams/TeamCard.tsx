'use client';

import { useState } from 'react';
import { Heart, ExternalLink, MapPin, Users } from 'lucide-react';
import { ErgastConstructor } from '@/lib/api/ergast';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface TeamCardProps {
  team: ErgastConstructor;
  showFavoriteButton?: boolean;
  compact?: boolean;
}

export function TeamCard({ team, showFavoriteButton = true, compact = false }: TeamCardProps) {
  const { isTeamFavorite, toggleFavoriteTeam } = useUserPreferences();
  const [isToggling, setIsToggling] = useState(false);
  
  const isFavorite = isTeamFavorite(team.constructorId);

  const handleToggleFavorite = async () => {
    setIsToggling(true);
    try {
      toggleFavoriteTeam(team.constructorId);
    } finally {
      setIsToggling(false);
    }
  };

  const getCountryFlag = (nationality: string) => {
    const flagMap: { [key: string]: string } = {
      'Austrian': '🇦🇹',
      'German': '🇩🇪',
      'Italian': '🇮🇹',
      'British': '🇬🇧',
      'French': '🇫🇷',
      'American': '🇺🇸',
      'Swiss': '🇨🇭',
      'Japanese': '🇯🇵',
    };
    return flagMap[nationality] || '🏁';
  };

  const getTeamColor = (constructorId: string) => {
    const colorMap: { [key: string]: { from: string; to: string; text: string } } = {
      'red_bull': { from: 'from-blue-600', to: 'to-blue-800', text: 'text-blue-600' },
      'mercedes': { from: 'from-gray-400', to: 'to-gray-600', text: 'text-gray-600' },
      'ferrari': { from: 'from-red-600', to: 'to-red-800', text: 'text-red-600' },
      'mclaren': { from: 'from-orange-500', to: 'to-orange-700', text: 'text-orange-600' },
      'aston_martin': { from: 'from-green-600', to: 'to-green-800', text: 'text-green-600' },
      'alpine': { from: 'from-blue-500', to: 'to-pink-500', text: 'text-blue-600' },
      'williams': { from: 'from-blue-400', to: 'to-blue-600', text: 'text-blue-600' },
      'alphatauri': { from: 'from-blue-800', to: 'to-blue-900', text: 'text-blue-800' },
      'alfa': { from: 'from-red-700', to: 'to-red-900', text: 'text-red-700' },
      'haas': { from: 'from-gray-600', to: 'to-gray-800', text: 'text-gray-600' },
    };
    return colorMap[constructorId] || { from: 'from-gray-500', to: 'to-gray-700', text: 'text-gray-600' };
  };

  const teamColors = getTeamColor(team.constructorId);

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 bg-gradient-to-br ${teamColors.from} ${teamColors.to} rounded-lg flex items-center justify-center text-white font-bold text-xs`}>
            {team.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-900 truncate">
              {team.name}
            </span>
            <span className="text-xl">{getCountryFlag(team.nationality)}</span>
          </div>
          <p className="text-sm text-gray-600">{team.nationality}</p>
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
      {/* Header with team colors and favorite button */}
      <div className={`relative bg-gradient-to-r ${teamColors.from} ${teamColors.to} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">
              {team.name.split(' ').map(word => word[0]).join('').slice(0, 3)}
            </div>
            <div>
              <h3 className="text-xl font-bold">{team.name}</h3>
              <p className="text-white/80 text-sm">{team.constructorId.replace('_', ' ').toUpperCase()}</p>
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

      {/* Team details */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{team.nationality}</span>
          <span className="text-2xl">{getCountryFlag(team.nationality)}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4" />
          <span className="text-sm">Constructor</span>
        </div>

        {/* Team stats placeholder */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-center">
            <div className={`text-2xl font-bold ${teamColors.text}`}>-</div>
            <div className="text-xs text-gray-500">Championships</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${teamColors.text}`}>-</div>
            <div className="text-xs text-gray-500">Race Wins</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-3 border-t border-gray-100">
          <a
            href={team.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Team Info
          </a>
        </div>
      </div>
    </div>
  );
}
