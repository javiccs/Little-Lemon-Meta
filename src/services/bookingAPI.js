/**
 * Booking API Service
 * Simulates API calls for the Little Lemon booking system
 */

/**
 * Seeded random number generator for consistent time slots
 * @param {number} seed - The seed value (typically the date)
 * @returns {Function} Random number generator function
 */
const seedRandom = (seed) => {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => {
    s = (s * a) % m;
    return s / m;
  };
};

/**
 * Fetches available time slots for a given date
 * @param {Date} date - The reservation date
 * @returns {string[]} Array of available time slots
 */
export const fetchAPI = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date provided to fetchAPI');
    return [];
  }

  const result = [];
  const random = seedRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(`${i}:00`);
    }
    if (random() > 0.5) {
      result.push(`${i}:30`);
    }
  }

  return result.length > 0 ? result : ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
};

/**
 * Submits booking form data to the API
 * @param {Object} formData - The booking form data
 * @returns {Promise<boolean>} Success status
 */
export const submitAPI = async (formData) => {
  try {
    // Validate form data
    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid form data');
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real application, this would make an HTTP request
    console.log('Submitting booking:', formData);

    // Simulate 95% success rate
    return Math.random() > 0.05;
  } catch (error) {
    console.error('Error submitting booking:', error);
    return false;
  }
};
