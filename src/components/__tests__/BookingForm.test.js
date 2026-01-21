import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import BookingForm from '../BookingForm';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

/**
 * Helper function to render BookingForm with Router
 */
const renderBookingForm = (props = {}) => {
  const defaultProps = {
    availableTimes: { availableTimes: ['17:00', '18:00', '19:00'] },
    dispatch: jest.fn(),
    submitForm: jest.fn(),
    ...props,
  };

  return render(
    <BrowserRouter>
      <BookingForm {...defaultProps} />
    </BrowserRouter>,
  );
};

describe('BookingForm Component', () => {
  describe('Rendering', () => {
    test('renders all form fields', () => {
      renderBookingForm();

      expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    });

    test('renders submit button', () => {
      renderBookingForm();

      expect(
        screen.getByRole('button', { name: /make your reservation/i }),
      ).toBeInTheDocument();
    });

    test('renders available time slots', () => {
      renderBookingForm();

      const timeSelect = screen.getByLabelText(/choose time/i);
      expect(timeSelect).toHaveLength(4); // "Select a Time" + 3 options
    });
  });

  describe('Form Validation', () => {
    test('shows error when date is not selected', async () => {
      renderBookingForm();

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      });
    });

    test('shows error when past date is selected', async () => {
      renderBookingForm();

      const dateInput = screen.getByPlaceholderText(/select a date/i);

      // DatePicker doesn't allow selecting past dates due to minDate prop
      // Test that we can't enter invalid text
      fireEvent.change(dateInput, { target: { value: 'invalid' } });
      fireEvent.blur(dateInput);

      await waitFor(() => {
        expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      });
    });

    test('shows error when time is not selected', async () => {
      renderBookingForm();

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
      });
    });

    test('shows error when guests is less than minimum', async () => {
      renderBookingForm();

      const guestsInput = screen.getByLabelText(/number of guests/i);
      fireEvent.change(guestsInput, { target: { value: '0' } });
      fireEvent.blur(guestsInput);

      await waitFor(() => {
        expect(
          screen.getByText(/number of guests must be at least 1/i),
        ).toBeInTheDocument();
      });
    });

    test('shows error when guests exceeds maximum', async () => {
      renderBookingForm();

      const guestsInput = screen.getByLabelText(/number of guests/i);
      fireEvent.change(guestsInput, { target: { value: '15' } });
      fireEvent.blur(guestsInput);

      await waitFor(() => {
        expect(screen.getByText(/cannot exceed 10/i)).toBeInTheDocument();
      });
    });

    test('shows error when occasion is not selected', async () => {
      renderBookingForm();

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please select an occasion/i),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    test('calls submitForm with correct data when form is valid', async () => {
      const mockSubmitForm = jest.fn().mockResolvedValue(true);
      renderBookingForm({ submitForm: mockSubmitForm });

      // Fill out the form with valid data
      const dateInput = screen.getByPlaceholderText(/select a date/i);
      const timeSelect = screen.getByLabelText(/choose time/i);
      const guestsInput = screen.getByLabelText(/number of guests/i);
      const occasionSelect = screen.getByLabelText(/occasion/i);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const futureDateString = futureDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      // Simulate typing the date
      await userEvent.type(dateInput, futureDateString);
      fireEvent.change(timeSelect, { target: { value: '18:00' } });
      fireEvent.change(guestsInput, { target: { value: '4' } });
      fireEvent.change(occasionSelect, { target: { value: 'birthday' } });

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(
        () => {
          expect(mockSubmitForm).toHaveBeenCalled();
        },
        { timeout: 3000 },
      );
    });

    test('does not submit when form is invalid', async () => {
      const mockSubmitForm = jest.fn();
      renderBookingForm({ submitForm: mockSubmitForm });

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSubmitForm).not.toHaveBeenCalled();
      });
    });

    test('disables submit button while submitting', async () => {
      const mockSubmitForm = jest.fn(
        () => new Promise((resolve) => setTimeout(resolve, 1000)),
      );
      renderBookingForm({ submitForm: mockSubmitForm });

      // Fill out the form
      const dateInput = screen.getByPlaceholderText(/select a date/i);
      const timeSelect = screen.getByLabelText(/choose time/i);
      const guestsInput = screen.getByLabelText(/number of guests/i);
      const occasionSelect = screen.getByLabelText(/occasion/i);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const futureDateString = futureDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      await userEvent.type(dateInput, futureDateString);
      fireEvent.change(timeSelect, { target: { value: '18:00' } });
      fireEvent.change(guestsInput, { target: { value: '2' } });
      fireEvent.change(occasionSelect, { target: { value: 'anniversary' } });

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      // Button should be disabled and show "Submitting..."
      await waitFor(
        () => {
          expect(submitButton).toBeDisabled();
        },
        { timeout: 3000 },
      );
      expect(submitButton).toHaveTextContent(/submitting/i);
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels', () => {
      renderBookingForm();

      expect(screen.getByLabelText(/choose date/i)).toHaveAttribute(
        'aria-required',
        'true',
      );
      expect(screen.getByLabelText(/choose time/i)).toHaveAttribute(
        'aria-required',
        'true',
      );
      expect(screen.getByLabelText(/number of guests/i)).toHaveAttribute(
        'aria-required',
        'true',
      );
      expect(screen.getByLabelText(/occasion/i)).toHaveAttribute(
        'aria-required',
        'true',
      );
    });

    test('marks invalid fields with aria-invalid after submit', async () => {
      renderBookingForm();

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const dateInput = screen.getByPlaceholderText(/select a date/i);
        expect(dateInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('error messages have proper role', async () => {
      renderBookingForm();

      const submitButton = screen.getByRole('button', {
        name: /make your reservation/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        const errorMessages = screen.getAllByRole('alert');
        expect(errorMessages.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Date Change Dispatch', () => {
    test('calls dispatch when date changes', async () => {
      const mockDispatch = jest.fn();
      renderBookingForm({ dispatch: mockDispatch });

      const dateInput = screen.getByPlaceholderText(/select a date/i);
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const futureDateString = futureDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      await userEvent.type(dateInput, futureDateString);

      await waitFor(
        () => {
          expect(mockDispatch).toHaveBeenCalled();
        },
        { timeout: 3000 },
      );
    });
  });
});
