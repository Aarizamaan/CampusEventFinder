import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, ExternalLink, Share2, ArrowLeft } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';
import { Event } from '../types/event';
import EventTypeBadge from '../components/events/EventTypeBadge';
import EventModeBadge from '../components/events/EventModeBadge';
import { formatDate } from '../utils/dateUtils';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { fetchEventById } = useEvents();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) return;
      
      setLoading(true);
      const eventData = await fetchEventById(eventId);
      setEvent(eventData);
      setLoading(false);
      
      // Set page title
      if (eventData) {
        document.title = `${eventData.name} | CampusEvents`;
      }
    };
    
    loadEvent();
  }, [eventId, fetchEventById]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.name,
        text: event?.short_description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      {/* Event Header */}
      <div className="relative rounded-xl overflow-hidden mb-8 h-[300px] md:h-[400px]">
        <img
          src={event.image_url || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <EventTypeBadge type={event.event_type} />
            <EventModeBadge mode={event.mode} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.name}</h1>
          <p className="text-gray-200 md:max-w-2xl line-clamp-2">{event.short_description}</p>
        </div>
      </div>

      {/* Event Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About This Event</h2>
            
            <div className="prose dark:prose-invert max-w-none mb-8">
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
            
            <div className="flex gap-4">
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <span>Register Now</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Event Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Date & Time</h4>
                  <p className="text-gray-600 dark:text-gray-400">{formatDate(event.event_date)}</p>
                  {event.end_date && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Until {formatDate(event.end_date)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.location || (event.mode === 'online' ? 'Online Event' : 'TBA')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{event.college}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Duration</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {event.end_date 
                      ? `${calculateDuration(event.event_date, event.end_date)}`
                      : 'Single day event'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate duration between two dates
function calculateDuration(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate difference in days
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Same day event';
  } else if (diffDays === 1) {
    return '1 day';
  } else if (diffDays < 7) {
    return `${diffDays} days`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }
}

export default EventDetailPage;