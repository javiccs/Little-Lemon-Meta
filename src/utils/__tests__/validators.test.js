import {
  validateBookingForm,
  validateDate,
  validateGuests,
  validateOccasion,
  validateTime
} from '../validators';

describe('Validators', () => {
  describe('validateDate', () => {
    test('returns error for empty date', () => {
      const result = validateDate('');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('select a date');
    });

    test('returns error for past date', () => {
      const pastDate = '2020-01-01';
      const result = validateDate(pastDate);
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('future date');
    });

    test('returns valid for future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);
      const futureDateString = futureDate.toISOString().split('T')[0];
      
      const result = validateDate(futureDateString);
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('');
    });

    test('returns valid for today', () => {
      const today = new Date().toISOString().split('T')[0];
      const result = validateDate(today);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateTime', () => {
    test('returns error for empty time', () => {
      const result = validateTime('');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('select a time');
    });

    test('returns error for "Select a Time"', () => {
      const result = validateTime('Select a Time');
      expect(result.isValid).toBe(false);
    });

    test('returns valid for valid time', () => {
      const result = validateTime('18:00');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('');
    });
  });

  describe('validateGuests', () => {
    test('returns error for empty guests', () => {
      const result = validateGuests('');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('enter number');
    });

    test('returns error for guests less than minimum', () => {
      const result = validateGuests('0');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('at least 1');
    });

    test('returns error for guests more than maximum', () => {
      const result = validateGuests('15');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('cannot exceed 10');
    });

    test('returns valid for valid number of guests', () => {
      const result = validateGuests('5');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('');
    });

    test('returns error for non-numeric input', () => {
      const result = validateGuests('abc');
      expect(result.isValid).toBe(false);
    });

    test('handles edge cases: minimum guests (1)', () => {
      const result = validateGuests('1');
      expect(result.isValid).toBe(true);
    });

    test('handles edge cases: maximum guests (10)', () => {
      const result = validateGuests('10');
      expect(result.isValid).toBe(true);
    });
  });

  describe('validateOccasion', () => {
    test('returns error for empty occasion', () => {
      const result = validateOccasion('');
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('select an occasion');
    });

    test('returns valid for valid occasion', () => {
      const result = validateOccasion('birthday');
      expect(result.isValid).toBe(true);
      expect(result.message).toBe('');
    });
  });

  describe('validateBookingForm', () => {
    test('validates entire form correctly', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const futureDateString = futureDate.toISOString().split('T')[0];

      const formData = {
        date: futureDateString,
        time: '18:00',
        guests: '4',
        occasion: 'birthday'
      };

      const result = validateBookingForm(formData);
      
      expect(result.date.isValid).toBe(true);
      expect(result.time.isValid).toBe(true);
      expect(result.guests.isValid).toBe(true);
      expect(result.occasion.isValid).toBe(true);
    });

    test('returns errors for invalid form data', () => {
      const formData = {
        date: '',
        time: '',
        guests: '0',
        occasion: ''
      };

      const result = validateBookingForm(formData);
      
      expect(result.date.isValid).toBe(false);
      expect(result.time.isValid).toBe(false);
      expect(result.guests.isValid).toBe(false);
      expect(result.occasion.isValid).toBe(false);
    });
  });
});
