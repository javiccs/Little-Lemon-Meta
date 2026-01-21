import { render, screen } from '@testing-library/react';

import BookingPage from '../BookingPage';
import { BrowserRouter } from 'react-router-dom';

/**
 * Helper to render BookingPage with Router
 */
const renderBookingPage = (props = {}) => {
  const defaultProps = {
    availableTimes: { availableTimes: ['17:00', '18:00', '19:00'] },
    dispatch: jest.fn(),
    submitForm: jest.fn(),
    ...props
  };

  return render(
    <BrowserRouter>
      <BookingPage {...defaultProps} />
    </BrowserRouter>
  );
};

describe('BookingPage Component', () => {
  test('renders BookingForm component', () => {
    renderBookingPage();
    
    // Check if form elements are rendered
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  });

  test('passes props correctly to BookingForm', () => {
    const mockDispatch = jest.fn();
    const mockSubmitForm = jest.fn();
    const mockAvailableTimes = { availableTimes: ['19:00', '20:00'] };

    renderBookingPage({
      availableTimes: mockAvailableTimes,
      dispatch: mockDispatch,
      submitForm: mockSubmitForm
    });

    // Verify the form is rendered with the correct props
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  });
});
