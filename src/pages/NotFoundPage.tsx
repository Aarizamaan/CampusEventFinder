import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  // Update title
  React.useEffect(() => {
    document.title = 'Page Not Found | CampusEvents';
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <div className="text-center max-w-md">
        <Calendar className="h-20 w-20 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;