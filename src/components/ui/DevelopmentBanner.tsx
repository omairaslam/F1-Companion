'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface DevelopmentBannerProps {
  message?: string;
  type?: 'info' | 'warning' | 'error';
  dismissible?: boolean;
}

export function DevelopmentBanner({ 
  message = "Using mock data for development. Some features may not reflect real-time F1 information.",
  type = 'warning',
  dismissible = true 
}: DevelopmentBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getStyles = () => {
    switch (type) {
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-600'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600'
        };
      default:
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          icon: 'text-yellow-600'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`border-b ${styles.bg} ${styles.text} px-4 py-3`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-4 h-4 ${styles.icon}`} />
          <span className="text-sm font-medium">
            {message}
          </span>
        </div>
        
        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className={`p-1 rounded hover:bg-black/10 transition-colors ${styles.text}`}
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
