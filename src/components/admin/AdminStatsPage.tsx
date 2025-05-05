import React from 'react';
import { BarChart2, Calendar, Users, Activity } from 'lucide-react';
import { useEvents } from '../../contexts/EventContext';

const AdminStatsPage: React.FC = () => {
  const { events } = useEvents();
  
  // Calculate some basic statistics
  const totalEvents = events.length;
  const pendingEvents = events.filter(event => event.status === 'pending').length;
  const approvedEvents = events.filter(event => event.status === 'approved').length;
  const hackathons = events.filter(event => event.event_type === 'hackathon').length;
  const workshops = events.filter(event => event.event_type === 'workshop').length;
  const webinars = events.filter(event => event.event_type === 'webinar').length;
  const otherEvents = totalEvents - hackathons - workshops - webinars;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Statistics Overview</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Events</h3>
            <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalEvents}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pending Approval</h3>
            <Activity className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingEvents}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Live Events</h3>
            <BarChart2 className="h-8 w-8 text-green-500 dark:text-green-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{approvedEvents}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Users</h3>
            <Users className="h-8 w-8 text-purple-500 dark:text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">--</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Coming soon</p>
        </div>
      </div>
      
      {/* Event Type Distribution */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Event Type Distribution</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Hackathons</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{hackathons}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${totalEvents > 0 ? (hackathons / totalEvents) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Workshops</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{workshops}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${totalEvents > 0 ? (workshops / totalEvents) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Webinars</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{webinars}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${totalEvents > 0 ? (webinars / totalEvents) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Other</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{otherEvents}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-orange-500 h-2.5 rounded-full" 
                style={{ width: `${totalEvents > 0 ? (otherEvents / totalEvents) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Future Analytics Section Placeholder */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analytics</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          In the future, this section will include more advanced analytics:
        </p>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
          <li>Event registrations over time</li>
          <li>User engagement metrics</li>
          <li>Most popular event categories</li>
          <li>College participation comparison</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminStatsPage;