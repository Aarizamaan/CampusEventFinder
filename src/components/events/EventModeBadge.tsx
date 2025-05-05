import React from 'react';
import { EventMode } from '../../types/event';

interface EventModeBadgeProps {
  mode: EventMode;
}

const EventModeBadge: React.FC<EventModeBadgeProps> = ({ mode }) => {
  const getBadgeColor = (mode: EventMode): string => {
    switch (mode) {
      case 'online':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'offline':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'hybrid':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getDisplayName = (mode: EventMode): string => {
    switch (mode) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      case 'hybrid':
        return 'Hybrid';
      default:
        return mode;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(mode)}`}>
      {getDisplayName(mode)}
    </span>
  );
};

export default EventModeBadge;