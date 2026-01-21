/**
 * Form validation utilities
 */

import { MAX_GUESTS, MIN_GUESTS, VALIDATION_MESSAGES } from '../constants/booking';

/**
 * Validates if a date is in the future
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Object} Validation result with isValid and message
 */
export const validateDate = (dateString) => {
  if (!dateString) {
    return { isValid: false, message: VALIDATION_MESSAGES.DATE_REQUIRED };
  }

  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return { isValid: false, message: VALIDATION_MESSAGES.DATE_PAST };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates the selected time
 * @param {string} time - Time string
 * @returns {Object} Validation result with isValid and message
 */
export const validateTime = (time) => {
  if (!time || time === 'Select a Time') {
    return { isValid: false, message: VALIDATION_MESSAGES.TIME_REQUIRED };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates number of guests
 * @param {string|number} guests - Number of guests
 * @returns {Object} Validation result with isValid and message
 */
export const validateGuests = (guests) => {
  const numGuests = parseInt(guests, 10);

  if (!guests || isNaN(numGuests)) {
    return { isValid: false, message: VALIDATION_MESSAGES.GUESTS_REQUIRED };
  }

  if (numGuests < MIN_GUESTS) {
    return { isValid: false, message: VALIDATION_MESSAGES.GUESTS_MIN };
  }

  if (numGuests > MAX_GUESTS) {
    return { isValid: false, message: VALIDATION_MESSAGES.GUESTS_MAX };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates the selected occasion
 * @param {string} occasion - Occasion type
 * @returns {Object} Validation result with isValid and message
 */
export const validateOccasion = (occasion) => {
  if (!occasion) {
    return { isValid: false, message: VALIDATION_MESSAGES.OCCASION_REQUIRED };
  }

  return { isValid: true, message: '' };
};

/**
 * Validates all form fields
 * @param {Object} formData - Form data object
 * @returns {Object} Validation results for all fields
 */
export const validateBookingForm = (formData) => {
  return {
    date: validateDate(formData.date),
    time: validateTime(formData.time),
    guests: validateGuests(formData.guests),
    occasion: validateOccasion(formData.occasion)
  };
};
