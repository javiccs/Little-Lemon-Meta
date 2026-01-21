/**
 * Formatting utilities
 */

/**
 * Formats a date string to a readable format
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formats a time string to 12-hour format
 * @param {string} time - Time in HH:MM format
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  if (!time) return '';

  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

  return `${displayHour}:${minutes} ${period}`;
};

/**
 * Formats guest count with proper pluralization
 * @param {number} count - Number of guests
 * @returns {string} Formatted guest count string
 */
export const formatGuestCount = (count) => {
  if (!count) return '';
  return `${count} ${count === 1 ? 'Guest' : 'Guests'}`;
};
