import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Menu, X, Moon, Sun, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm dark:bg-gray-900/95 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">CampusEvents</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/add-event" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Add Event
          </Link>
          {isAdmin && (
            <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
              Admin
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </button>

          {user ? (
            <div className="relative flex items-center gap-2">
              <span className="text-sm text-gray-700 dark:text-gray-200">
                {user.email?.split('@')[0]}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link 
                to="/login?signup=true" 
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2">
              Home
            </Link>
            <Link to="/add-event" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2">
              Add Event
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 py-2">
                Admin
              </Link>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2 flex flex-col gap-3">
              <button 
                onClick={toggleTheme} 
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-gray-700" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
              
              {user ? (
                <>
                  <div className="flex items-center gap-2 py-2">
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/login?signup=true" 
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-200 py-2"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;