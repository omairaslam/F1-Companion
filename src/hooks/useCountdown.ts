'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isExpired: boolean;
}

export interface UseCountdownOptions {
  onExpire?: () => void;
  updateInterval?: number; // in milliseconds
  autoStart?: boolean;
}

export function useCountdown(
  targetDate: Date | string | number,
  options: UseCountdownOptions = {}
) {
  const {
    onExpire,
    updateInterval = 1000,
    autoStart = true,
  } = options;

  const calculateTimeLeft = useCallback((): CountdownTime => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        isExpired: true,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      total: difference,
      isExpired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft);
  const [isActive, setIsActive] = useState(autoStart);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isActive && !timeLeft.isExpired) {
      intervalId = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);

        if (newTimeLeft.isExpired && onExpire) {
          onExpire();
          setIsActive(false);
        }
      }, updateInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft.isExpired, calculateTimeLeft, onExpire, updateInterval]);

  // Update time left when target date changes
  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
  }, [calculateTimeLeft]);

  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setTimeLeft(calculateTimeLeft());
    setIsActive(autoStart);
  }, [calculateTimeLeft, autoStart]);

  return {
    timeLeft,
    isActive,
    start,
    stop,
    reset,
  };
}

// Helper function to format countdown time
export function formatCountdownTime(time: CountdownTime): string {
  if (time.isExpired) {
    return 'Race has started!';
  }

  const parts: string[] = [];

  if (time.days > 0) {
    parts.push(`${time.days}d`);
  }
  if (time.hours > 0) {
    parts.push(`${time.hours}h`);
  }
  if (time.minutes > 0) {
    parts.push(`${time.minutes}m`);
  }
  if (time.seconds > 0 || parts.length === 0) {
    parts.push(`${time.seconds}s`);
  }

  return parts.join(' ');
}

// Helper function to format countdown time in a more readable format
export function formatCountdownTimeReadable(time: CountdownTime): string {
  if (time.isExpired) {
    return 'Race has started!';
  }

  const parts: string[] = [];

  if (time.days > 0) {
    parts.push(`${time.days} ${time.days === 1 ? 'day' : 'days'}`);
  }
  if (time.hours > 0) {
    parts.push(`${time.hours} ${time.hours === 1 ? 'hour' : 'hours'}`);
  }
  if (time.minutes > 0) {
    parts.push(`${time.minutes} ${time.minutes === 1 ? 'minute' : 'minutes'}`);
  }
  if (time.seconds > 0 && time.days === 0 && time.hours === 0) {
    parts.push(`${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'}`);
  }

  if (parts.length === 0) {
    return 'Starting now!';
  }

  if (parts.length === 1) {
    return parts[0];
  }

  if (parts.length === 2) {
    return parts.join(' and ');
  }

  return parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];
}

// Helper function to get time until next race session
export function getTimeUntilSession(sessionDate: string, sessionTime: string): Date {
  return new Date(`${sessionDate}T${sessionTime}`);
}

// Helper function to determine which session is next
export interface RaceSession {
  name: string;
  date: string;
  time: string;
  type: 'practice1' | 'practice2' | 'practice3' | 'qualifying' | 'sprint' | 'race';
}

export function getNextSession(sessions: {
  firstPractice?: { date: string; time: string };
  secondPractice?: { date: string; time: string };
  thirdPractice?: { date: string; time: string };
  qualifying?: { date: string; time: string };
  sprint?: { date: string; time: string };
  race: { date: string; time: string };
}): RaceSession | null {
  const now = new Date();
  const sessionList: RaceSession[] = [];

  if (sessions.firstPractice) {
    sessionList.push({
      name: 'Practice 1',
      date: sessions.firstPractice.date,
      time: sessions.firstPractice.time,
      type: 'practice1',
    });
  }

  if (sessions.secondPractice) {
    sessionList.push({
      name: 'Practice 2',
      date: sessions.secondPractice.date,
      time: sessions.secondPractice.time,
      type: 'practice2',
    });
  }

  if (sessions.thirdPractice) {
    sessionList.push({
      name: 'Practice 3',
      date: sessions.thirdPractice.date,
      time: sessions.thirdPractice.time,
      type: 'practice3',
    });
  }

  if (sessions.qualifying) {
    sessionList.push({
      name: 'Qualifying',
      date: sessions.qualifying.date,
      time: sessions.qualifying.time,
      type: 'qualifying',
    });
  }

  if (sessions.sprint) {
    sessionList.push({
      name: 'Sprint',
      date: sessions.sprint.date,
      time: sessions.sprint.time,
      type: 'sprint',
    });
  }

  sessionList.push({
    name: 'Race',
    date: sessions.race.date,
    time: sessions.race.time,
    type: 'race',
  });

  // Filter future sessions and sort by date
  const futureSessions = sessionList
    .filter(session => {
      const sessionDateTime = new Date(`${session.date}T${session.time}`);
      return sessionDateTime > now;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

  return futureSessions.length > 0 ? futureSessions[0] : null;
}
