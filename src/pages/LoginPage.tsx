import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { user, signIn, signUp, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we should show signup form
  const searchParams = new URLSearchParams(location.search);
  const showSignUp = searchParams.get('signup') === 'true';
  
  const [isSignUp, setIsSignUp] = useState(showSignUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);
  
  // Update title based on mode
  useEffect(() => {
    document.title = isSignUp ? 'Sign Up | CampusEvents' : 'Login | CampusEvents';
  }, [isSignUp]);
  
  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormError(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Form validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (isSignUp) {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        setFormError('Password must be at least 6 characters');
        return;
      }
      
      try {
        await signUp(email, password);
      } catch (err) {
        console.error('Sign up error:', err);
      }
    } else {
      try {
        await signIn(email, password);
      } catch (err) {
        console.error('Sign in error:', err);
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Calendar className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          
          {/* Error display */}
          {(error || formError) && (
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded-md mb-6">
              {formError || error}
            </div>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-blue-600 text-white rounded-lg ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              } transition flex items-center justify-center`}
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                  {isSignUp ? 'Creating Account...' : 'Logging In...'}
                </>
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Login'
              )}
            </button>
          </form>
          
          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={toggleAuthMode}
                className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;