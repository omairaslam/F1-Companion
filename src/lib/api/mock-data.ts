// Mock F1 data for development and fallback when Ergast API is unavailable
import { ErgastRace } from './ergast';

export const mockRaces2024: ErgastRace[] = [
  {
    season: '2024',
    round: '1',
    url: 'https://en.wikipedia.org/wiki/2024_Bahrain_Grand_Prix',
    raceName: 'Bahrain Grand Prix',
    Circuit: {
      circuitId: 'bahrain',
      url: 'http://en.wikipedia.org/wiki/Bahrain_International_Circuit',
      circuitName: 'Bahrain International Circuit',
      Location: {
        lat: '26.0325',
        long: '50.5106',
        locality: 'Sakhir',
        country: 'Bahrain'
      }
    },
    date: '2024-03-02',
    time: '15:00:00Z',
    FirstPractice: {
      date: '2024-02-29',
      time: '11:30:00Z'
    },
    SecondPractice: {
      date: '2024-02-29',
      time: '15:00:00Z'
    },
    ThirdPractice: {
      date: '2024-03-01',
      time: '11:30:00Z'
    },
    Qualifying: {
      date: '2024-03-01',
      time: '15:00:00Z'
    }
  },
  {
    season: '2024',
    round: '2',
    url: 'https://en.wikipedia.org/wiki/2024_Saudi_Arabian_Grand_Prix',
    raceName: 'Saudi Arabian Grand Prix',
    Circuit: {
      circuitId: 'jeddah',
      url: 'http://en.wikipedia.org/wiki/Jeddah_Corniche_Circuit',
      circuitName: 'Jeddah Corniche Circuit',
      Location: {
        lat: '21.6319',
        long: '39.1044',
        locality: 'Jeddah',
        country: 'Saudi Arabia'
      }
    },
    date: '2024-03-09',
    time: '17:00:00Z',
    FirstPractice: {
      date: '2024-03-07',
      time: '13:30:00Z'
    },
    SecondPractice: {
      date: '2024-03-07',
      time: '17:00:00Z'
    },
    ThirdPractice: {
      date: '2024-03-08',
      time: '13:30:00Z'
    },
    Qualifying: {
      date: '2024-03-08',
      time: '17:00:00Z'
    }
  },
  {
    season: '2024',
    round: '3',
    url: 'https://en.wikipedia.org/wiki/2024_Australian_Grand_Prix',
    raceName: 'Australian Grand Prix',
    Circuit: {
      circuitId: 'albert_park',
      url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
      circuitName: 'Albert Park Grand Prix Circuit',
      Location: {
        lat: '-37.8497',
        long: '144.968',
        locality: 'Melbourne',
        country: 'Australia'
      }
    },
    date: '2024-03-24',
    time: '05:00:00Z',
    FirstPractice: {
      date: '2024-03-22',
      time: '01:30:00Z'
    },
    SecondPractice: {
      date: '2024-03-22',
      time: '05:00:00Z'
    },
    ThirdPractice: {
      date: '2024-03-23',
      time: '01:30:00Z'
    },
    Qualifying: {
      date: '2024-03-23',
      time: '05:00:00Z'
    }
  }
];

// Mock upcoming races (future dates for demonstration)
export const mockUpcomingRaces: ErgastRace[] = [
  {
    season: '2025',
    round: '1',
    url: 'https://en.wikipedia.org/wiki/2025_Bahrain_Grand_Prix',
    raceName: 'Bahrain Grand Prix',
    Circuit: {
      circuitId: 'bahrain',
      url: 'http://en.wikipedia.org/wiki/Bahrain_International_Circuit',
      circuitName: 'Bahrain International Circuit',
      Location: {
        lat: '26.0325',
        long: '50.5106',
        locality: 'Sakhir',
        country: 'Bahrain'
      }
    },
    date: '2025-03-16',
    time: '15:00:00Z',
    FirstPractice: {
      date: '2025-03-14',
      time: '11:30:00Z'
    },
    SecondPractice: {
      date: '2025-03-14',
      time: '15:00:00Z'
    },
    ThirdPractice: {
      date: '2025-03-15',
      time: '11:30:00Z'
    },
    Qualifying: {
      date: '2025-03-15',
      time: '15:00:00Z'
    }
  },
  {
    season: '2025',
    round: '2',
    url: 'https://en.wikipedia.org/wiki/2025_Saudi_Arabian_Grand_Prix',
    raceName: 'Saudi Arabian Grand Prix',
    Circuit: {
      circuitId: 'jeddah',
      url: 'http://en.wikipedia.org/wiki/Jeddah_Corniche_Circuit',
      circuitName: 'Jeddah Corniche Circuit',
      Location: {
        lat: '21.6319',
        long: '39.1044',
        locality: 'Jeddah',
        country: 'Saudi Arabia'
      }
    },
    date: '2025-03-23',
    time: '17:00:00Z',
    FirstPractice: {
      date: '2025-03-21',
      time: '13:30:00Z'
    },
    SecondPractice: {
      date: '2025-03-21',
      time: '17:00:00Z'
    },
    ThirdPractice: {
      date: '2025-03-22',
      time: '13:30:00Z'
    },
    Qualifying: {
      date: '2025-03-22',
      time: '17:00:00Z'
    }
  },
  {
    season: '2025',
    round: '3',
    url: 'https://en.wikipedia.org/wiki/2025_Australian_Grand_Prix',
    raceName: 'Australian Grand Prix',
    Circuit: {
      circuitId: 'albert_park',
      url: 'http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit',
      circuitName: 'Albert Park Grand Prix Circuit',
      Location: {
        lat: '-37.8497',
        long: '144.968',
        locality: 'Melbourne',
        country: 'Australia'
      }
    },
    date: '2025-03-30',
    time: '05:00:00Z',
    FirstPractice: {
      date: '2025-03-28',
      time: '01:30:00Z'
    },
    SecondPractice: {
      date: '2025-03-28',
      time: '05:00:00Z'
    },
    ThirdPractice: {
      date: '2025-03-29',
      time: '01:30:00Z'
    },
    Qualifying: {
      date: '2025-03-29',
      time: '05:00:00Z'
    }
  }
];

// Function to get mock data based on current date
export function getMockRacesForCurrentSeason(): ErgastRace[] {
  const currentYear = new Date().getFullYear();
  
  if (currentYear >= 2025) {
    return mockUpcomingRaces;
  } else {
    return mockRaces2024;
  }
}

// Function to get next upcoming race from mock data
export function getMockNextRace(): ErgastRace | null {
  const now = new Date();
  const races = getMockRacesForCurrentSeason();
  
  const upcomingRaces = races.filter(race => {
    const raceDateTime = new Date(`${race.date}T${race.time || '14:00:00'}Z`);
    return raceDateTime > now;
  });

  return upcomingRaces.length > 0 ? upcomingRaces[0] : null;
}

// Function to get upcoming races from mock data
export function getMockUpcomingRaces(limit: number = 5): ErgastRace[] {
  const now = new Date();
  const races = getMockRacesForCurrentSeason();
  
  const upcomingRaces = races.filter(race => {
    const raceDateTime = new Date(`${race.date}T${race.time || '14:00:00'}Z`);
    return raceDateTime > now;
  });

  return upcomingRaces.slice(0, limit);
}
