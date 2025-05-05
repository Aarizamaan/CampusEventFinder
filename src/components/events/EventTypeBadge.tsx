import React from 'react';
import { EventType } from '../../types/event';

interface EventTypeBadgeProps {
  type: EventType;
}

const EventTypeBadge: React.FC<EventTypeBadgeProps> = ({ type }) => {
  const getBadgeColor = (type: EventType): string => {
    switch (type) {
      case 'hackathon':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'workshop':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'webinar':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'seminar':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'competition':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'tech_talk':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getDisplayName = (type: EventType): string => {
    switch (type) {
      case 'hackathon':
        return 'Hackathon';
      case 'workshop':
        return 'Workshop';
      case 'webinar':
        return 'Webinar';
      case 'seminar':
        return 'Seminar';
      case 'competition':
        return 'Competition';
      case 'tech_talk':
        return 'Tech Talk';
      default:
        return 'Other';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(type)}`}>
      {getDisplayName(type)}
    </span>
  );
};

export default EventTypeBadge;