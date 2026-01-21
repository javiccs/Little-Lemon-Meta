import 'react-datepicker/dist/react-datepicker.css';

import { MAX_GUESTS, MIN_GUESTS, OCCASIONS } from '../constants/booking';
import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import { useBookingForm } from '../hooks/useBookingForm';

/**
 * BookingForm component - Accessible form for restaurant reservations
 */
const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    updateField,
    handleBlur,
    handleSubmit
  } = useBookingForm(availableTimes, submitForm);

  const [submitError, setSubmitError] = useState('');

  /**
   * Handles date changes and updates available times
   */
  const handleDateChange = (date) => {
    // Convert Date object to YYYY-MM-DD format
    const dateString = date ? date.toISOString().split('T')[0] : '';
    updateField('date', dateString);
    if (dispatch && dateString) {
      dispatch(dateString);
    }
  };

  /**
   * Wraps form submission with error handling
   */
  const onSubmit = async (e) => {
    try {
      setSubmitError('');
      await handleSubmit(e);
    } catch (error) {
      setSubmitError('Failed to submit booking. Please try again.');
    }
  };

  // Get available times from props or use defaults
  const timeSlots = availableTimes?.availableTimes || [
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  return (
    <section className="booking-form" aria-labelledby="booking-form-title">
      <h1 id="booking-form-title" className="visually-hidden">
        Make a Reservation
      </h1>
      
      <form onSubmit={onSubmit} noValidate>
        <fieldset disabled={isSubmitting}>
          <legend className="visually-hidden">Reservation Details</legend>

          {/* Date Selection */}
          <div className="form-field">
            <label htmlFor="book-date">
              Choose Date<span aria-label="required">*</span>
            </label>
            <DatePicker
              id="book-date"
              selected={formData.date ? new Date(formData.date + 'T00:00:00') : null}
              onChange={handleDateChange}
              onBlur={() => handleBlur('date')}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select a date"
              className={errors.date && touched.date ? 'date-input-error' : ''}
              aria-describedby={errors.date && touched.date ? 'date-error' : undefined}
              aria-invalid={errors.date && touched.date ? 'true' : 'false'}
              aria-required="true"
              required
            />
            {errors.date && touched.date && (
              <span 
                id="date-error" 
                className="error-message" 
                role="alert"
                aria-live="polite"
              >
                {errors.date}
              </span>
            )}
          </div>

          {/* Time Selection */}
          <div className="form-field">
            <label htmlFor="book-time">
              Choose Time<span aria-label="required">*</span>
            </label>
            <select
              id="book-time"
              value={formData.time}
              onChange={(e) => updateField('time', e.target.value)}
              onBlur={() => handleBlur('time')}
              aria-describedby={errors.time && touched.time ? 'time-error' : undefined}
              aria-invalid={errors.time && touched.time ? 'true' : 'false'}
              aria-required="true"
              required
            >
              <option value="">Select a Time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && touched.time && (
              <span 
                id="time-error" 
                className="error-message" 
                role="alert"
                aria-live="polite"
              >
                {errors.time}
              </span>
            )}
          </div>

          {/* Number of Guests */}
          <div className="form-field">
            <label htmlFor="book-guests">
              Number of Guests<span aria-label="required">*</span>
            </label>
            <input
              type="number"
              id="book-guests"
              min={MIN_GUESTS}
              max={MAX_GUESTS}
              value={formData.guests}
              onChange={(e) => updateField('guests', e.target.value)}
              onBlur={() => handleBlur('guests')}
              placeholder="-"
              aria-describedby={errors.guests && touched.guests ? 'guests-error' : 'guests-hint'}
              aria-invalid={errors.guests && touched.guests ? 'true' : 'false'}
              aria-required="true"
              required
            />
            <span id="guests-hint" className="field-hint">
              Maximum {MAX_GUESTS} guests
            </span>
            {errors.guests && touched.guests && (
              <span 
                id="guests-error" 
                className="error-message" 
                role="alert"
                aria-live="polite"
              >
                {errors.guests}
              </span>
            )}
          </div>

          {/* Occasion Selection */}
          <div className="form-field">
            <label htmlFor="book-occasion">
              Occasion<span aria-label="required">*</span>
            </label>
            <select
              id="book-occasion"
              value={formData.occasion}
              onChange={(e) => updateField('occasion', e.target.value)}
              onBlur={() => handleBlur('occasion')}
              aria-describedby={errors.occasion && touched.occasion ? 'occasion-error' : undefined}
              aria-invalid={errors.occasion && touched.occasion ? 'true' : 'false'}
              aria-required="true"
              required
            >
              <option value="">Select Occasion</option>
              {OCCASIONS.map((occasion) => (
                <option key={occasion.value} value={occasion.value}>
                  {occasion.label}
                </option>
              ))}
            </select>
            {errors.occasion && touched.occasion && (
              <span 
                id="occasion-error" 
                className="error-message" 
                role="alert"
                aria-live="polite"
              >
                {errors.occasion}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="reservation-button">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-label={isSubmitting ? 'Submitting reservation' : 'Make your reservation'}
            >
              {isSubmitting ? 'Submitting...' : 'Make Your Reservation'}
            </button>
          </div>

          {/* Global Error Message */}
          {submitError && (
            <div 
              className="submit-error" 
              role="alert" 
              aria-live="assertive"
            >
              {submitError}
            </div>
          )}
        </fieldset>
      </form>
    </section>
  );
};

BookingForm.propTypes = {
  availableTimes: PropTypes.shape({
    availableTimes: PropTypes.arrayOf(PropTypes.string)
  }),
  dispatch: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

BookingForm.defaultProps = {
  availableTimes: {
    availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']
  }
};

export default BookingForm;
