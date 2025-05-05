import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ExternalLink, Clock } from 'lucide-react';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/dateUtils';
import EventTypeBadge from './EventTypeBadge';
import EventModeBadge from './EventModeBadge';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
      {/* Card Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={event.image_url || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          alt={event.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <EventTypeBadge type={event.event_type} />
          <EventModeBadge mode={event.mode} />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {event.name}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {event.short_description}
        </p>

        {/* Event Details */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <Clock className="h-4 w-4" />
            <span>{event.end_date ? `Until ${formatDate(event.end_date)}` : 'Single day event'}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4" />
            <span>{event.location || event.college}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-700">
        <Link
          to={`/events/${event.id}`}
          className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300"
        >
          View Details
        </Link>
        <a
          href={event.registration_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
        >
          <span>Register</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default EventCard;