import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import { useAuth } from '../contexts/AuthContext';
import { Event, EventType, EventMode } from '../types/event';

const AddEventPage: React.FC = () => {
  const { addEvent } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    description: '',
    college: '',
    event_type: '' as EventType,
    mode: '' as EventMode,
    location: '',
    event_date: '',
    end_date: '',
    registration_link: '',
    image_url: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Event types for the select dropdown
  const eventTypes: { value: EventType; label: string }[] = [
    { value: 'hackathon', label: 'Hackathon' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'competition', label: 'Competition' },
    { value: 'tech_talk', label: 'Tech Talk' },
    { value: 'other', label: 'Other' },
  ];

  // Event modes for the select dropdown
  const eventModes: { value: EventMode; label: string }[] = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'hybrid', label: 'Hybrid' },
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = ['name', 'short_description', 'description', 'college', 'event_type', 'mode', 'event_date', 'registration_link'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Short description length
    if (formData.short_description.length > 150) {
      newErrors.short_description = 'Short description must be less than 150 characters';
    }
    
    // URL validation for registration link
    if (formData.registration_link && !isValidUrl(formData.registration_link)) {
      newErrors.registration_link = 'Please enter a valid URL';
    }
    
    // URL validation for image URL (if provided)
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      newErrors.image_url = 'Please enter a valid URL';
    }
    
    // Date validation
    if (formData.event_date && formData.end_date && new Date(formData.event_date) > new Date(formData.end_date)) {
      newErrors.end_date = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare event data
      const eventData: Omit<Event, 'id' | 'created_at'> = {
        ...formData,
        event_type: formData.event_type as EventType,
        mode: formData.mode as EventMode,
        featured: false,
        status: 'pending', // Events start as pending until approved
        created_by: user?.id || null,
      };
      
      await addEvent(eventData);
      
      // Show success message
      alert('Your event has been submitted for review! The admin team will approve it shortly.');
      
      // Redirect to home page
      navigate('/');
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('There was an error submitting your event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set page title
  React.useEffect(() => {
    document.title = 'Add Event | CampusEvents';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Event</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Share your college's tech event with the community. All submissions will be reviewed before being published.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="e.g., CodeFest 2025"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>
            
            {/* Short Description */}
            <div>
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Description* (max 150 characters)
              </label>
              <input
                type="text"
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                maxLength={150}
                className={`w-full px-4 py-2 border ${
                  errors.short_description ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Brief overview of your event"
              />
              <div className="mt-1 flex justify-between">
                {errors.short_description ? (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.short_description}</p>
                ) : (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Appears on event cards
                  </span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.short_description.length}/150
                </span>
              </div>
            </div>
            
            {/* Full Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-2 border ${
                  errors.description ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Detailed information about your event"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
            </div>
            
            {/* College/Organization */}
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                College/Organization*
              </label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.college ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="e.g., MIT, Stanford University"
              />
              {errors.college && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.college}</p>}
            </div>
            
            {/* Two-column layout for type and mode */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Type */}
              <div>
                <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Type*
                </label>
                <select
                  id="event_type"
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.event_type ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                  <option value="">Select Event Type</option>
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.event_type && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.event_type}</p>}
              </div>
              
              {/* Event Mode */}
              <div>
                <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Mode*
                </label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.mode ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                  <option value="">Select Event Mode</option>
                  {eventModes.map((mode) => (
                    <option key={mode.value} value={mode.value}>
                      {mode.label}
                    </option>
                  ))}
                </select>
                {errors.mode && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.mode}</p>}
              </div>
            </div>
            
            {/* Location (conditionally required based on mode) */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location {formData.mode === 'online' ? '(Optional)' : '*'}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.location ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder={formData.mode === 'online' ? 'Optional for online events' : 'Address or venue name'}
              />
              {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
            </div>
            
            {/* Two-column layout for dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Date */}
              <div>
                <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  id="event_date"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.event_date ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {errors.event_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.event_date}</p>}
              </div>
              
              {/* End Date (Optional) */}
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.end_date ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {errors.end_date && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.end_date}</p>}
              </div>
            </div>
            
            {/* Registration Link */}
            <div>
              <label htmlFor="registration_link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Registration Link*
              </label>
              <input
                type="url"
                id="registration_link"
                name="registration_link"
                value={formData.registration_link}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.registration_link ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="https://..."
              />
              {errors.registration_link && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.registration_link}</p>}
            </div>
            
            {/* Image URL (Optional) */}
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.image_url ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="https://..."
              />
              {errors.image_url && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image_url}</p>}
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Provide a URL to an image for your event. If left blank, a default image will be used.
              </p>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                } transition flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Event for Review'
                )}
              </button>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                Your event will be reviewed by our team before being published.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;