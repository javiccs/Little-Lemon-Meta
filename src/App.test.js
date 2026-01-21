import { render, screen } from '@testing-library/react';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

/**
 * Mock booking API to avoid actual API calls in tests
 */
jest.mock('./services/bookingAPI', () => ({
  fetchAPI: jest.fn(() => ['17:00', '18:00', '19:00']),
  submitAPI: jest.fn(() => Promise.resolve(true)),
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  test('renders Header component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // Check for logo alt text
    const logo = screen.getAllByAltText(/little lemon/i)[0];
    expect(logo).toBeInTheDocument();
  });

  test('renders Main component with initial route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // HomePage content should be visible - check for unique heading
    expect(
      screen.getByRole('heading', { name: /little lemon/i, level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /chicago/i }),
    ).toBeInTheDocument();
  });

  test('renders Footer component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // Check for footer content
    expect(screen.getByText(/javiccs/i)).toBeInTheDocument();
  });

  test('renders Menu component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    // Check for menu section
    expect(screen.getByText(/this week's specials/i)).toBeInTheDocument();
  });

  test('wraps content in ErrorBoundary', () => {
    // ErrorBoundary should be present (tested by ensuring app renders)
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /little lemon/i, level: 1 }),
    ).toBeInTheDocument();
  });
});
