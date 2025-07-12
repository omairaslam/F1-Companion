// Mock F1 data for development and fallback when Ergast API is unavailable
import { ErgastRace, ErgastDriver, ErgastConstructor } from './ergast';

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

// Mock F1 Drivers for 2024/2025 season
export const mockDrivers2024: ErgastDriver[] = [
  {
    driverId: 'max_verstappen',
    permanentNumber: '1',
    code: 'VER',
    url: 'http://en.wikipedia.org/wiki/Max_Verstappen',
    givenName: 'Max',
    familyName: 'Verstappen',
    dateOfBirth: '1997-09-30',
    nationality: 'Dutch'
  },
  {
    driverId: 'lewis_hamilton',
    permanentNumber: '44',
    code: 'HAM',
    url: 'http://en.wikipedia.org/wiki/Lewis_Hamilton',
    givenName: 'Lewis',
    familyName: 'Hamilton',
    dateOfBirth: '1985-01-07',
    nationality: 'British'
  },
  {
    driverId: 'charles_leclerc',
    permanentNumber: '16',
    code: 'LEC',
    url: 'http://en.wikipedia.org/wiki/Charles_Leclerc',
    givenName: 'Charles',
    familyName: 'Leclerc',
    dateOfBirth: '1997-10-16',
    nationality: 'Monégasque'
  },
  {
    driverId: 'lando_norris',
    permanentNumber: '4',
    code: 'NOR',
    url: 'http://en.wikipedia.org/wiki/Lando_Norris',
    givenName: 'Lando',
    familyName: 'Norris',
    dateOfBirth: '1999-11-13',
    nationality: 'British'
  },
  {
    driverId: 'oscar_piastri',
    permanentNumber: '81',
    code: 'PIA',
    url: 'http://en.wikipedia.org/wiki/Oscar_Piastri',
    givenName: 'Oscar',
    familyName: 'Piastri',
    dateOfBirth: '2001-04-06',
    nationality: 'Australian'
  },
  {
    driverId: 'carlos_sainz',
    permanentNumber: '55',
    code: 'SAI',
    url: 'http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.',
    givenName: 'Carlos',
    familyName: 'Sainz',
    dateOfBirth: '1994-09-01',
    nationality: 'Spanish'
  },
  {
    driverId: 'george_russell',
    permanentNumber: '63',
    code: 'RUS',
    url: 'http://en.wikipedia.org/wiki/George_Russell_(racing_driver)',
    givenName: 'George',
    familyName: 'Russell',
    dateOfBirth: '1998-02-15',
    nationality: 'British'
  },
  {
    driverId: 'sergio_perez',
    permanentNumber: '11',
    code: 'PER',
    url: 'http://en.wikipedia.org/wiki/Sergio_Pérez',
    givenName: 'Sergio',
    familyName: 'Pérez',
    dateOfBirth: '1990-01-26',
    nationality: 'Mexican'
  },
  {
    driverId: 'fernando_alonso',
    permanentNumber: '14',
    code: 'ALO',
    url: 'http://en.wikipedia.org/wiki/Fernando_Alonso',
    givenName: 'Fernando',
    familyName: 'Alonso',
    dateOfBirth: '1981-07-29',
    nationality: 'Spanish'
  },
  {
    driverId: 'lance_stroll',
    permanentNumber: '18',
    code: 'STR',
    url: 'http://en.wikipedia.org/wiki/Lance_Stroll',
    givenName: 'Lance',
    familyName: 'Stroll',
    dateOfBirth: '1998-10-29',
    nationality: 'Canadian'
  }
];

// Mock F1 Constructors for 2024/2025 season
export const mockConstructors2024: ErgastConstructor[] = [
  {
    constructorId: 'red_bull',
    url: 'http://en.wikipedia.org/wiki/Red_Bull_Racing',
    name: 'Red Bull Racing Honda RBPT',
    nationality: 'Austrian'
  },
  {
    constructorId: 'mercedes',
    url: 'http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One',
    name: 'Mercedes',
    nationality: 'German'
  },
  {
    constructorId: 'ferrari',
    url: 'http://en.wikipedia.org/wiki/Scuderia_Ferrari',
    name: 'Ferrari',
    nationality: 'Italian'
  },
  {
    constructorId: 'mclaren',
    url: 'http://en.wikipedia.org/wiki/McLaren',
    name: 'McLaren Mercedes',
    nationality: 'British'
  },
  {
    constructorId: 'aston_martin',
    url: 'http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One',
    name: 'Aston Martin Aramco Mercedes',
    nationality: 'British'
  },
  {
    constructorId: 'alpine',
    url: 'http://en.wikipedia.org/wiki/Alpine_F1_Team',
    name: 'Alpine F1 Team',
    nationality: 'French'
  },
  {
    constructorId: 'williams',
    url: 'http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering',
    name: 'Williams Mercedes',
    nationality: 'British'
  },
  {
    constructorId: 'alphatauri',
    url: 'http://en.wikipedia.org/wiki/Scuderia_AlphaTauri',
    name: 'Scuderia AlphaTauri Honda RBPT',
    nationality: 'Italian'
  },
  {
    constructorId: 'alfa',
    url: 'http://en.wikipedia.org/wiki/Alfa_Romeo_in_Formula_One',
    name: 'Alfa Romeo F1 Team Stake',
    nationality: 'Swiss'
  },
  {
    constructorId: 'haas',
    url: 'http://en.wikipedia.org/wiki/Haas_F1_Team',
    name: 'MoneyGram Haas F1 Team',
    nationality: 'American'
  }
];

// Functions to get mock driver and constructor data
export function getMockDriversForCurrentSeason(): ErgastDriver[] {
  return mockDrivers2024;
}

export function getMockConstructorsForCurrentSeason(): ErgastConstructor[] {
  return mockConstructors2024;
}
