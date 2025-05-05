/**
 * Format a date string to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Format a date string to show just the date (no time)
 * @param dateString - ISO date string
 * @returns Formatted date string without time
 */
export function formatDateOnly(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Check if a date is in the future
 * @param dateString - ISO date string
 * @returns Boolean indicating if date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
}

/**
 * Check if a date is in the past
 * @param dateString - ISO date string
 * @returns Boolean indicating if date is in the past
 */
export function isPastDate(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
}

/**
 * Calculate days remaining until a date
 * @param dateString - ISO date string
 * @returns String representation of days remaining
 */
export function getDaysRemaining(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  
  // Calculate difference in days
  const diffTime = Math.abs(date.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (date < now) {
    return 'Event has passed';
  }
  
  if (diffDays === 0) {
    return 'Today';
  }
  
  if (diffDays === 1) {
    return 'Tomorrow';
  }
  
  return `${diffDays} days`;
}