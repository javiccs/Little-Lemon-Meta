import BookingForm from './BookingForm';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * BookingPage component - Wrapper for the booking form
 */
const BookingPage = ({ availableTimes, dispatch, submitForm }) => {
  return (
    <BookingForm 
      availableTimes={availableTimes} 
      dispatch={dispatch} 
      submitForm={submitForm}
    />
  );
};

BookingPage.propTypes = {
  availableTimes: PropTypes.shape({
    availableTimes: PropTypes.arrayOf(PropTypes.string)
  }),
  dispatch: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default BookingPage;
