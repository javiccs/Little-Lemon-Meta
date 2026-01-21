/**
 * Booking-related constants
 */

export const OCCASIONS = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'business', label: 'Business' },
  { value: 'other', label: 'Other' }
];

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 10;

export const VALIDATION_MESSAGES = {
  DATE_REQUIRED: 'Please select a date',
  DATE_PAST: 'Please select a future date',
  TIME_REQUIRED: 'Please select a time',
  GUESTS_REQUIRED: 'Please enter number of guests',
  GUESTS_MIN: `Number of guests must be at least ${MIN_GUESTS}`,
  GUESTS_MAX: `Number of guests cannot exceed ${MAX_GUESTS}`,
  OCCASION_REQUIRED: 'Please select an occasion'
};
