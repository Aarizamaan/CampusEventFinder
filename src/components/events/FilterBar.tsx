import React, { useState } from 'react';
import { Filter, Calendar, X } from 'lucide-react';
import { EventFilters, EventType, EventMode } from '../../types/event';

interface FilterBarProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
  colleges: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, colleges }) => {
  const [isOpen, setIsOpen] = useState(false);

  const eventTypes: { value: EventType; label: string }[] = [
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'competition', label: 'Competition' },
    { value: 'tech_talk', label: 'Tech Talk' },
    { value: 'other', label: 'Other' },
  ];

  const eventModes: { value: EventMode; label: string }[] = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  const handleFilterChange = (key: keyof EventFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      type: null,
      college: null,
      mode: null,
      startDate: null,
      endDate: null,
    });
  };

  const isFiltersApplied = !!(filters.type || filters.college || filters.mode || filters.startDate || filters.endDate);

  return (
    <div className="mb-8">
      {/* Mobile Filter Button */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-700 dark:text-gray-200"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
        
        {isFiltersApplied && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-lg text-sm"
          >
            <X className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Desktop Filter Bar */}
      <div className={`filter-bar bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow">
            {/* Event Type Filter */}
            <div>
              <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type
              </label>
              <select
                id="event-type"
                value={filters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value === '' ? null : e.target.value as EventType)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">All Types</option>
                {eventTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* College Filter */}
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                College
              </label>
              <select
                id="college"
                value={filters.college || ''}
                onChange={(e) => handleFilterChange('college', e.target.value === '' ? null : e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">All Colleges</option>
                {colleges.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mode
              </label>
              <select
                id="mode"
                value={filters.mode || ''}
                onChange={(e) => handleFilterChange('mode', e.target.value === '' ? null : e.target.value as EventMode)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="">All Modes</option>
                {eventModes.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    id="start-date"
                    value={filters.startDate || ''}
                    onChange={(e) => handleFilterChange('startDate', e.target.value || null)}
                    className="w-full p-2 pl-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    id="end-date"
                    value={filters.endDate || ''}
                    onChange={(e) => handleFilterChange('endDate', e.target.value || null)}
                    className="w-full p-2 pl-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {isFiltersApplied && (
            <button
              onClick={clearFilters}
              className="hidden md:flex items-center gap-1 px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800"
            >
              <X className="h-4 w-4" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;