'use client';

import { useCountdown, formatCountdownTimeReadable, CountdownTime } from '@/hooks/useCountdown';
import { cn } from '@/lib/utils';
import { Clock, Flag } from 'lucide-react';

interface CountdownProps {
  targetDate: Date | string | number;
  title?: string;
  subtitle?: string;
  className?: string;
  onExpire?: () => void;
  showIcon?: boolean;
  variant?: 'default' | 'compact' | 'large';
}

export function Countdown({
  targetDate,
  title = 'Next Race',
  subtitle,
  className,
  onExpire,
  showIcon = true,
  variant = 'default',
}: CountdownProps) {
  const { timeLeft, isActive } = useCountdown(targetDate, {
    onExpire,
    updateInterval: 1000,
  });

  const formatTime = (time: CountdownTime) => {
    if (time.isExpired) {
      return 'Race Started!';
    }

    if (variant === 'compact') {
      const parts: string[] = [];
      if (time.days > 0) parts.push(`${time.days}d`);
      if (time.hours > 0) parts.push(`${time.hours}h`);
      if (time.minutes > 0) parts.push(`${time.minutes}m`);
      if (time.seconds > 0 && time.days === 0) parts.push(`${time.seconds}s`);
      return parts.join(' ');
    }

    return formatCountdownTimeReadable(time);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-3',
          title: 'text-sm font-medium',
          time: 'text-lg font-bold',
          subtitle: 'text-xs',
          icon: 'w-4 h-4',
        };
      case 'large':
        return {
          container: 'p-8',
          title: 'text-xl font-semibold',
          time: 'text-4xl font-bold',
          subtitle: 'text-base',
          icon: 'w-8 h-8',
        };
      default:
        return {
          container: 'p-6',
          title: 'text-lg font-semibold',
          time: 'text-2xl font-bold',
          subtitle: 'text-sm',
          icon: 'w-6 h-6',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm',
        styles.container,
        timeLeft.isExpired && 'bg-red-50 border-red-200',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        {showIcon && (
          <div className={cn(
            'p-2 rounded-lg',
            timeLeft.isExpired ? 'bg-red-100' : 'bg-red-100'
          )}>
            {timeLeft.isExpired ? (
              <Flag className={cn(styles.icon, 'text-red-600')} />
            ) : (
              <Clock className={cn(styles.icon, 'text-red-600')} />
            )}
          </div>
        )}
        <div className="flex-1">
          <h3 className={cn(styles.title, 'text-gray-900')}>
            {title}
          </h3>
          {subtitle && (
            <p className={cn(styles.subtitle, 'text-gray-600')}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="text-center">
        <div
          className={cn(
            styles.time,
            timeLeft.isExpired ? 'text-red-600' : 'text-gray-900',
            'racing-pulse'
          )}
        >
          {formatTime(timeLeft)}
        </div>
        
        {!timeLeft.isExpired && variant !== 'compact' && (
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-lg font-bold text-gray-900">{timeLeft.days}</div>
              <div className="text-xs text-gray-600">Days</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-lg font-bold text-gray-900">{timeLeft.hours}</div>
              <div className="text-xs text-gray-600">Hours</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-lg font-bold text-gray-900">{timeLeft.minutes}</div>
              <div className="text-xs text-gray-600">Minutes</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="text-lg font-bold text-gray-900">{timeLeft.seconds}</div>
              <div className="text-xs text-gray-600">Seconds</div>
            </div>
          </div>
        )}
      </div>

      {!isActive && (
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500">Countdown paused</span>
        </div>
      )}
    </div>
  );
}

// Specialized countdown for race weekend
interface RaceWeekendCountdownProps {
  nextSession: {
    name: string;
    date: string;
    time: string;
    type: string;
  } | null;
  raceName: string;
  className?: string;
}

export function RaceWeekendCountdown({
  nextSession,
  raceName,
  className,
}: RaceWeekendCountdownProps) {
  if (!nextSession) {
    return (
      <div className={cn('bg-gray-50 rounded-lg p-6 text-center', className)}>
        <div className="text-gray-500">
          <Clock className="w-8 h-8 mx-auto mb-2" />
          <p>No upcoming sessions</p>
        </div>
      </div>
    );
  }

  const sessionDateTime = new Date(`${nextSession.date}T${nextSession.time}`);

  return (
    <Countdown
      targetDate={sessionDateTime}
      title={`Next: ${nextSession.name}`}
      subtitle={raceName}
      className={className}
      variant="default"
    />
  );
}

// Mini countdown for cards
interface MiniCountdownProps {
  targetDate: Date | string | number;
  className?: string;
}

export function MiniCountdown({ targetDate, className }: MiniCountdownProps) {
  const { timeLeft } = useCountdown(targetDate);

  if (timeLeft.isExpired) {
    return (
      <span className={cn('text-red-600 font-medium text-sm', className)}>
        Started
      </span>
    );
  }

  const formatMiniTime = () => {
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${timeLeft.hours}h`;
    }
    if (timeLeft.hours > 0) {
      return `${timeLeft.hours}h ${timeLeft.minutes}m`;
    }
    return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
  };

  return (
    <span className={cn('text-gray-600 font-medium text-sm', className)}>
      {formatMiniTime()}
    </span>
  );
}
