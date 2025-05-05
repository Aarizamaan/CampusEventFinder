import React, { useEffect, useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import FeaturedBanner from '../components/events/FeaturedBanner';
import EventList from '../components/events/EventList';
import FilterBar from '../components/events/FilterBar';

const HomePage: React.FC = () => {
  const { events, featuredEvents, loading, filters, setFilters, fetchEvents } = useEvents();
  const [colleges, setColleges] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique colleges from events
    const uniqueColleges = Array.from(new Set(events.map(event => event.college))).sort();
    setColleges(uniqueColleges);
  }, [events]);

  useEffect(() => {
    // Set page title
    document.title = 'CampusEvents - Tech Events for College Students';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Banner */}
      <FeaturedBanner events={featuredEvents} />

      {/* Main Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Upcoming Tech Events</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Discover the latest hackathons, workshops, seminars, and tech talks happening across college campuses.
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        colleges={colleges}
      />

      {/* Events List */}
      <EventList events={events} loading={loading} />
    </div>
  );
};

export default HomePage;