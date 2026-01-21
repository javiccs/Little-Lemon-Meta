import React from 'react';

/**
 * ConfirmedBooking component - Success page after booking
 */
const ConfirmedBooking = () => {
  return (
    <div className="confirm" role="main" aria-labelledby="confirmation-title">
      <h1 id="confirmation-title">
        Booking has been <span>confirmed!</span>
      </h1>
      <p>Thank you for choosing Little Lemon. We look forward to serving you!</p>
      <p>A confirmation email has been sent to your email address.</p>
    </div>
  );
};

export default ConfirmedBooking;