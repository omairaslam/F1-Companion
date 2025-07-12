// Ergast API service for F1 data
// Documentation: https://ergast.com/mrd/

import { getMockRacesForCurrentSeason, getMockNextRace, getMockUpcomingRaces, getMockDriversForCurrentSeason, getMockConstructorsForCurrentSeason } from './mock-data';

const ERGAST_BASE_URL = 'https://ergast.com/api/f1';

// Types for Ergast API responses
export interface ErgastCircuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: {
    lat: string;
    long: string;
    locality: string;
    country: string;
  };
}

export interface ErgastRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: ErgastCircuit;
  date: string;
  time?: string;
  FirstPractice?: { date: string; time: string };
  SecondPractice?: { date: string; time: string };
  ThirdPractice?: { date: string; time: string };
  Qualifying?: { date: string; time: string };
  Sprint?: { date: string; time: string };
}

export interface ErgastDriver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface ErgastConstructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface ErgastResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable?: {
      season?: string;
      Races: T[];
    };
    DriverTable?: {
      Drivers: T[];
    };
    ConstructorTable?: {
      Constructors: T[];
    };
  };
}

// API service class
export class ErgastAPI {
  private baseUrl: string;

  constructor(baseUrl: string = ERGAST_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}.json`, {
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ergast API fetch error:', error);
      throw error;
    }
  }

  // Get current season races
  async getCurrentSeasonRaces(): Promise<ErgastRace[]> {
    try {
      const currentYear = new Date().getFullYear();
      const data = await this.fetchData<ErgastResponse<ErgastRace>>(`/${currentYear}`);
      return data.MRData.RaceTable?.Races || [];
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      return getMockRacesForCurrentSeason();
    }
  }

  // Get races for a specific season
  async getSeasonRaces(season: number): Promise<ErgastRace[]> {
    try {
      const data = await this.fetchData<ErgastResponse<ErgastRace>>(`/${season}`);
      return data.MRData.RaceTable?.Races || [];
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      return getMockRacesForCurrentSeason();
    }
  }

  // Get next race
  async getNextRace(): Promise<ErgastRace | null> {
    try {
      const races = await this.getCurrentSeasonRaces();
      const now = new Date();

      const upcomingRaces = races.filter(race => {
        const raceDateTime = new Date(`${race.date}T${race.time || '14:00:00'}Z`);
        return raceDateTime > now;
      });

      return upcomingRaces.length > 0 ? upcomingRaces[0] : null;
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      return getMockNextRace();
    }
  }

  // Get upcoming races (next 5)
  async getUpcomingRaces(limit: number = 5): Promise<ErgastRace[]> {
    try {
      const races = await this.getCurrentSeasonRaces();
      const now = new Date();

      const upcomingRaces = races.filter(race => {
        const raceDateTime = new Date(`${race.date}T${race.time || '14:00:00'}Z`);
        return raceDateTime > now;
      });

      return upcomingRaces.slice(0, limit);
    } catch (error) {
      console.warn('Falling back to mock data due to API error:', error);
      return getMockUpcomingRaces(limit);
    }
  }

  // Get race by round
  async getRaceByRound(season: number, round: number): Promise<ErgastRace | null> {
    const data = await this.fetchData<ErgastResponse<ErgastRace>>(`/${season}/${round}`);
    const races = data.MRData.RaceTable?.Races || [];
    return races.length > 0 ? races[0] : null;
  }

  // Get all drivers for current season
  async getCurrentSeasonDrivers(): Promise<ErgastDriver[]> {
    try {
      const currentYear = new Date().getFullYear();
      const data = await this.fetchData<ErgastResponse<ErgastDriver>>(`/${currentYear}/drivers`);
      return data.MRData.DriverTable?.Drivers || [];
    } catch (error) {
      console.warn('Falling back to mock driver data due to API error:', error);
      return getMockDriversForCurrentSeason();
    }
  }

  // Get all constructors for current season
  async getCurrentSeasonConstructors(): Promise<ErgastConstructor[]> {
    try {
      const currentYear = new Date().getFullYear();
      const data = await this.fetchData<ErgastResponse<ErgastConstructor>>(`/${currentYear}/constructors`);
      return data.MRData.ConstructorTable?.Constructors || [];
    } catch (error) {
      console.warn('Falling back to mock constructor data due to API error:', error);
      return getMockConstructorsForCurrentSeason();
    }
  }

  // Get race results
  async getRaceResults(season: number, round: number) {
    const data = await this.fetchData(`/${season}/${round}/results`);
    return data;
  }

  // Get qualifying results
  async getQualifyingResults(season: number, round: number) {
    const data = await this.fetchData(`/${season}/${round}/qualifying`);
    return data;
  }

  // Get driver standings
  async getDriverStandings(season?: number) {
    const year = season || new Date().getFullYear();
    const data = await this.fetchData(`/${year}/driverStandings`);
    return data;
  }

  // Get constructor standings
  async getConstructorStandings(season?: number) {
    const year = season || new Date().getFullYear();
    const data = await this.fetchData(`/${year}/constructorStandings`);
    return data;
  }
}

// Create singleton instance
export const ergastAPI = new ErgastAPI();

// Helper functions for data transformation
export function transformErgastRaceToLocal(ergastRace: ErgastRace) {
  return {
    id: `${ergastRace.season}-${ergastRace.round}`,
    season: parseInt(ergastRace.season),
    round: parseInt(ergastRace.round),
    raceName: ergastRace.raceName,
    circuitId: ergastRace.Circuit.circuitId,
    circuitName: ergastRace.Circuit.circuitName,
    locality: ergastRace.Circuit.Location.locality,
    country: ergastRace.Circuit.Location.country,
    date: ergastRace.date,
    time: ergastRace.time,
    url: ergastRace.url,
    latitude: parseFloat(ergastRace.Circuit.Location.lat),
    longitude: parseFloat(ergastRace.Circuit.Location.long),
    sessions: {
      firstPractice: ergastRace.FirstPractice,
      secondPractice: ergastRace.SecondPractice,
      thirdPractice: ergastRace.ThirdPractice,
      qualifying: ergastRace.Qualifying,
      sprint: ergastRace.Sprint,
    },
  };
}

export function getRaceDateTime(race: ErgastRace): Date {
  const timeString = race.time || '14:00:00Z';
  return new Date(`${race.date}T${timeString}`);
}

export function isRaceUpcoming(race: ErgastRace): boolean {
  const raceDateTime = getRaceDateTime(race);
  return raceDateTime > new Date();
}

export function isRaceToday(race: ErgastRace): boolean {
  const raceDate = new Date(race.date);
  const today = new Date();
  return raceDate.toDateString() === today.toDateString();
}

export function isRaceThisWeekend(race: ErgastRace): boolean {
  const raceDate = new Date(race.date);
  const today = new Date();
  const daysDiff = Math.ceil((raceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysDiff >= 0 && daysDiff <= 3;
}
