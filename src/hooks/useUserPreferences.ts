'use client';

import { useState, useEffect, useCallback } from 'react';
import { ErgastDriver, ErgastConstructor } from '@/lib/api/ergast';

export interface UserPreferences {
  favoriteDrivers: string[]; // Array of driver IDs
  favoriteTeams: string[]; // Array of constructor IDs
  notifications: {
    raceReminders: boolean;
    driverAchievements: boolean;
    teamUpdates: boolean;
  };
  displaySettings: {
    theme: 'light' | 'dark' | 'auto';
    timeFormat: '12h' | '24h';
    timezone: string;
  };
}

const DEFAULT_PREFERENCES: UserPreferences = {
  favoriteDrivers: [],
  favoriteTeams: [],
  notifications: {
    raceReminders: true,
    driverAchievements: true,
    teamUpdates: true,
  },
  displaySettings: {
    theme: 'auto',
    timeFormat: '24h',
    timezone: 'UTC',
  },
};

const STORAGE_KEY = 'f1-companion-preferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = useCallback((newPreferences: UserPreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }, []);

  // Add favorite driver
  const addFavoriteDriver = useCallback((driverId: string) => {
    const newPreferences = {
      ...preferences,
      favoriteDrivers: [...preferences.favoriteDrivers.filter(id => id !== driverId), driverId],
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Remove favorite driver
  const removeFavoriteDriver = useCallback((driverId: string) => {
    const newPreferences = {
      ...preferences,
      favoriteDrivers: preferences.favoriteDrivers.filter(id => id !== driverId),
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Toggle favorite driver
  const toggleFavoriteDriver = useCallback((driverId: string) => {
    if (preferences.favoriteDrivers.includes(driverId)) {
      removeFavoriteDriver(driverId);
    } else {
      addFavoriteDriver(driverId);
    }
  }, [preferences.favoriteDrivers, addFavoriteDriver, removeFavoriteDriver]);

  // Add favorite team
  const addFavoriteTeam = useCallback((teamId: string) => {
    const newPreferences = {
      ...preferences,
      favoriteTeams: [...preferences.favoriteTeams.filter(id => id !== teamId), teamId],
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Remove favorite team
  const removeFavoriteTeam = useCallback((teamId: string) => {
    const newPreferences = {
      ...preferences,
      favoriteTeams: preferences.favoriteTeams.filter(id => id !== teamId),
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Toggle favorite team
  const toggleFavoriteTeam = useCallback((teamId: string) => {
    if (preferences.favoriteTeams.includes(teamId)) {
      removeFavoriteTeam(teamId);
    } else {
      addFavoriteTeam(teamId);
    }
  }, [preferences.favoriteTeams, addFavoriteTeam, removeFavoriteTeam]);

  // Update notification settings
  const updateNotifications = useCallback((notifications: Partial<UserPreferences['notifications']>) => {
    const newPreferences = {
      ...preferences,
      notifications: { ...preferences.notifications, ...notifications },
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Update display settings
  const updateDisplaySettings = useCallback((displaySettings: Partial<UserPreferences['displaySettings']>) => {
    const newPreferences = {
      ...preferences,
      displaySettings: { ...preferences.displaySettings, ...displaySettings },
    };
    savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  // Check if driver is favorite
  const isDriverFavorite = useCallback((driverId: string) => {
    return preferences.favoriteDrivers.includes(driverId);
  }, [preferences.favoriteDrivers]);

  // Check if team is favorite
  const isTeamFavorite = useCallback((teamId: string) => {
    return preferences.favoriteTeams.includes(teamId);
  }, [preferences.favoriteTeams]);

  // Get favorite drivers data
  const getFavoriteDriversData = useCallback((allDrivers: ErgastDriver[]) => {
    return allDrivers.filter(driver => preferences.favoriteDrivers.includes(driver.driverId));
  }, [preferences.favoriteDrivers]);

  // Get favorite teams data
  const getFavoriteTeamsData = useCallback((allTeams: ErgastConstructor[]) => {
    return allTeams.filter(team => preferences.favoriteTeams.includes(team.constructorId));
  }, [preferences.favoriteTeams]);

  // Reset preferences to default
  const resetPreferences = useCallback(() => {
    savePreferences(DEFAULT_PREFERENCES);
  }, [savePreferences]);

  return {
    preferences,
    isLoading,
    
    // Driver methods
    addFavoriteDriver,
    removeFavoriteDriver,
    toggleFavoriteDriver,
    isDriverFavorite,
    getFavoriteDriversData,
    
    // Team methods
    addFavoriteTeam,
    removeFavoriteTeam,
    toggleFavoriteTeam,
    isTeamFavorite,
    getFavoriteTeamsData,
    
    // Settings methods
    updateNotifications,
    updateDisplaySettings,
    resetPreferences,
    
    // Utility
    savePreferences,
  };
}
