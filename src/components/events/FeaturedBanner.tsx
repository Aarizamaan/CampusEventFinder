import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/dateUtils';
import EventTypeBadge from './EventTypeBadge';
import EventModeBadge from './EventModeBadge';

interface FeaturedBannerProps {
  events: Event[];
}

const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate the carousel
  useEffect(() => {
    if (events.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length]);

  if (events.length === 0) {
    return null;
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg mb-12 h-[400px] md:h-[500px]">
      {/* Slides */}
      {events.map((event, index) => (
        <div
          key={event.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <img
              src={event.image_url || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-12">
            <div className="flex gap-2 mb-4">
              <EventTypeBadge type={event.event_type} />
              <EventModeBadge mode={event.mode} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
              {event.name}
            </h2>
            
            <p className="text-gray-200 mb-6 max-w-2xl">
              {event.short_description}
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-white mb-6">
              <div>
                <p className="text-gray-300 text-sm">Date</p>
                <p className="font-medium">{formatDate(event.event_date)}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Organized by</p>
                <p className="font-medium">{event.college}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">Location</p>
                <p className="font-medium">{event.location || (event.mode === 'online' ? 'Online' : 'TBA')}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link
                to={`/events/${event.id}`}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent text-white border border-white rounded-lg hover:bg-white hover:text-gray-900 transition"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      {events.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {events.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedBanner;