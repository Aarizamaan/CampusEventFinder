import React, { useState, useEffect } from 'react';
import { useEvents } from '../../contexts/EventContext';
import { Event, EventStatus } from '../../types/event';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import EventTypeBadge from '../events/EventTypeBadge';
import EventModeBadge from '../events/EventModeBadge';

type StatusFilter = 'all' | EventStatus;

const AdminEventsList: React.FC = () => {
  const { events: allEvents, loading, approveEvent, rejectEvent, fetchEvents } = useEvents();
  const [events, setEvents] = useState<Event[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortField, setSortField] = useState<keyof Event>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Filter events based on status filter
    let filteredEvents = allEvents;
    
    if (statusFilter !== 'all') {
      filteredEvents = allEvents.filter(event => event.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(
        event => 
          event.name.toLowerCase().includes(term) ||
          event.college.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term)
      );
    }
    
    // Sort events
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setEvents(sortedEvents);
  }, [allEvents, statusFilter, sortField, sortDirection, searchTerm]);

  const handleSort = (field: keyof Event) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleApprove = async (id: string) => {
    if (confirm('Are you sure you want to approve this event?')) {
      await approveEvent(id);
    }
  };

  const handleReject = async (id: string) => {
    if (confirm('Are you sure you want to reject this event?')) {
      await rejectEvent(id);
    }
  };

  const getSortIcon = (field: keyof Event) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">Pending</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs font-medium">Rejected</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Manage Events</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
            >
              <option value="all">All Events</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No events found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Event Name</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('college')}
                >
                  <div className="flex items-center">
                    <span>College</span>
                    {getSortIcon('college')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('event_date')}
                >
                  <div className="flex items-center">
                    <span>Date</span>
                    {getSortIcon('event_date')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{event.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{event.college}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <EventTypeBadge type={event.event_type} />
                      <EventModeBadge mode={event.mode} />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(event.event_date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(event.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {event.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(event.id)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleReject(event.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      {event.status === 'rejected' && (
                        <button
                          onClick={() => handleApprove(event.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                      )}
                      {event.status === 'approved' && (
                        <button
                          onClick={() => handleReject(event.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminEventsList;