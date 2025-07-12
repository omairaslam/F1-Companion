import { renderHook, act } from '@testing-library/react';
import { useCountdown, formatCountdownTimeReadable } from '@/hooks/useCountdown';
import { vi } from 'vitest';

// Mock timers
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.runOnlyPendingTimers();
  vi.useRealTimers();
});

describe('useCountdown', () => {
  it('should calculate time left correctly', () => {
    const futureDate = new Date(Date.now() + 5000); // 5 seconds from now
    
    const { result } = renderHook(() => 
      useCountdown(futureDate, { autoStart: false })
    );

    expect(result.current.timeLeft.seconds).toBe(5);
    expect(result.current.timeLeft.isExpired).toBe(false);
  });

  it('should update countdown every second', () => {
    const futureDate = new Date(Date.now() + 5000); // 5 seconds from now
    
    const { result } = renderHook(() => 
      useCountdown(futureDate, { autoStart: true })
    );

    expect(result.current.timeLeft.seconds).toBe(5);

    // Fast-forward 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.timeLeft.seconds).toBe(4);
  });

  it('should mark as expired when time reaches zero', () => {
    const pastDate = new Date(Date.now() - 1000); // 1 second ago
    
    const { result } = renderHook(() => 
      useCountdown(pastDate, { autoStart: false })
    );

    expect(result.current.timeLeft.isExpired).toBe(true);
    expect(result.current.timeLeft.total).toBe(0);
  });

  it('should call onExpire callback when countdown expires', () => {
    const onExpire = vi.fn();
    const futureDate = new Date(Date.now() + 1000); // 1 second from now

    renderHook(() =>
      useCountdown(futureDate, { onExpire, autoStart: true })
    );

    // Fast-forward past the target time
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onExpire).toHaveBeenCalled();
  });

  it('should format countdown time correctly', () => {
    const timeLeft = {
      days: 2,
      hours: 3,
      minutes: 45,
      seconds: 30,
      total: 100000,
      isExpired: false,
    };

    const formatted = formatCountdownTimeReadable(timeLeft);
    expect(formatted).toBe('2 days, 3 hours, and 45 minutes');
  });

  it('should handle expired time formatting', () => {
    const expiredTime = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
      isExpired: true,
    };

    const formatted = formatCountdownTimeReadable(expiredTime);
    expect(formatted).toBe('Race has started!');
  });
});

describe('Countdown component integration', () => {
  it('should handle different time formats', () => {
    // Test with just minutes and seconds
    const timeLeft1 = {
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 30,
      total: 330000,
      isExpired: false,
    };

    expect(formatCountdownTimeReadable(timeLeft1)).toBe('5 minutes and 30 seconds');

    // Test with just hours
    const timeLeft2 = {
      days: 0,
      hours: 2,
      minutes: 0,
      seconds: 0,
      total: 7200000,
      isExpired: false,
    };

    expect(formatCountdownTimeReadable(timeLeft2)).toBe('2 hours');

    // Test with single units
    const timeLeft3 = {
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 0,
      total: 90060000,
      isExpired: false,
    };

    expect(formatCountdownTimeReadable(timeLeft3)).toBe('1 day, 1 hour, and 1 minute');
  });
});
