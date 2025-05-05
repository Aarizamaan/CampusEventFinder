import React from 'react';
import { Calendar, Mail, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and about */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">CampusEvents</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover and connect with tech events happening across colleges and universities.
              From hackathons to workshops, find your next opportunity to learn and grow.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/add-event" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Add Event
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Subscribe to our newsletter to get updates on upcoming events.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm flex-grow"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © {currentYear} CampusEvents. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a 
              href="mailto:info@campusevents.com" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Contact us via email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com/campusevents" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              aria-label="Visit our GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;