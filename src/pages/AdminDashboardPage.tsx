import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Calendar, BarChart2 } from 'lucide-react';
import AdminEventsList from '../components/admin/AdminEventsList';
import AdminUsersPage from '../components/admin/AdminUsersPage';
import AdminStatsPage from '../components/admin/AdminStatsPage';

// Admin tabs
const tabs = [
  { name: 'Events', path: '/admin', icon: Calendar },
  { name: 'Users', path: '/admin/users', icon: Users },
  { name: 'Stats', path: '/admin/stats', icon: BarChart2 },
];

const AdminDashboardPage: React.FC = () => {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(() => {
    const currentPath = location.pathname;
    return tabs.find(tab => currentPath === tab.path) || tabs[0];
  });

  // Update title
  React.useEffect(() => {
    document.title = 'Admin Dashboard | CampusEvents';
  }, []);

  // Update currentTab on location change
  React.useEffect(() => {
    const tab = tabs.find(tab => location.pathname === tab.path) || tabs[0];
    setCurrentTab(tab);
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex -mb-px">
          {tabs.map((tab) => {
            const isActive = currentTab.path === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                  isActive
                    ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                } -mb-px`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Routes>
          <Route index element={<AdminEventsList />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="stats" element={<AdminStatsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardPage;