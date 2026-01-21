import React, { useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { fetchAPI, submitAPI } from '../services/bookingAPI';

import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import HomePage from '../pages/HomePage';

/**
 * Main component - Handles routing and booking state management
 */
const Main = () => {
  // Initialize available times with today's date
  const initialState = { availableTimes: fetchAPI(new Date()) };
  const [state, dispatch] = useReducer(updateTimes, initialState);

  /**
   * Reducer function to update available times based on selected date
   * @param {Object} state - Current state
   * @param {string} dateString - Selected date string
   * @returns {Object} Updated state with new available times
   */
  function updateTimes(state, dateString) {
    const date = dateString ? new Date(dateString) : new Date();
    return { availableTimes: fetchAPI(date) };
  }

  const navigate = useNavigate();

  /**
   * Handles form submission and navigation
   * @param {Object} formData - Form data to submit
   */
  async function submitForm(formData) {
    try {
      const success = await submitAPI(formData);
      if (success) {
        navigate('/confirmed');
      } else {
        throw new Error('Booking submission failed');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error;
    }
  }

  return (
    <main id="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/booking" 
          element={
            <BookingPage 
              availableTimes={state} 
              dispatch={dispatch} 
              submitForm={submitForm} 
            />
          } 
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
};

export default Main;
