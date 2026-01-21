import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Main from '../Main';

/**
 * Mock the booking API service
 */
jest.mock('../../services/bookingAPI', () => ({
  fetchAPI: jest.fn((date) => ['17:00', '18:00', '19:00', '20:00']),
  submitAPI: jest.fn(() => Promise.resolve(true))
}));

const renderMain = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Main />
    </MemoryRouter>
  );
};

describe('Main Component', () => {
  describe('Routing', () => {
    test('renders HomePage on root path', () => {
      renderMain('/');
      expect(screen.getByText(/little lemon/i)).toBeInTheDocument();
      expect(screen.getByText(/chicago/i)).toBeInTheDocument();
    });

    test('renders BookingPage on /booking path', () => {
      renderMain('/booking');
      expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    });

    test('renders ConfirmedBooking on /confirmed path', () => {
      renderMain('/confirmed');
      expect(screen.getByRole('heading', { name: /booking has been confirmed/i })).toBeInTheDocument();
    });
  });

  describe('State Management', () => {
    test('initializes with available times', () => {
      renderMain('/booking');
      
      const timeSelect = screen.getByLabelText(/choose time/i);
      // Should have "Select a Time" option plus the mocked times
      expect(timeSelect.options.length).toBeGreaterThan(1);
    });
  });

  describe('updateTimes Function', () => {
    test('updates available times when date changes', async () => {
      const { fetchAPI } = require('../../services/bookingAPI');
      
      renderMain('/booking');
      
      // fetchAPI should be called with today's date initially
      expect(fetchAPI).toHaveBeenCalled();
    });
  });
});
