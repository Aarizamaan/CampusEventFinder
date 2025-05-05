import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types/event';

interface EventListProps {
  events: Event[];
  loading: boolean;
}

const EventList: React.FC<EventListProps> = ({ events, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-[400px]">
            <div className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            <div className="p-5">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">No events found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          No events match your current filters. Try adjusting your search criteria or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;