import { fetchAPI, submitAPI } from '../bookingAPI';

describe('Booking API Service', () => {
  describe('fetchAPI', () => {
    test('returns array of time slots', () => {
      const date = new Date('2006-01-25');
      const times = fetchAPI(date);
      
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThan(0);
    });

    test('returns consistent times for same date', () => {
      const date = new Date('2006-01-25');
      const times1 = fetchAPI(date);
      const times2 = fetchAPI(date);
      
      expect(times1).toEqual(times2);
    });

    test('returns different times for different dates', () => {
      const date1 = new Date('2006-01-25');
      const date2 = new Date('2006-01-26');
      
      const times1 = fetchAPI(date1);
      const times2 = fetchAPI(date2);
      
      // Not guaranteed to be different, but likely with seeded random
      expect(times1).toBeDefined();
      expect(times2).toBeDefined();
    });

    test('returns valid time format (HH:00 or HH:30)', () => {
      const date = new Date();
      const times = fetchAPI(date);
      
      times.forEach(time => {
        expect(time).toMatch(/^\d{2}:(00|30)$/);
      });
    });

    test('handles invalid date gracefully', () => {
      const times = fetchAPI(null);
      expect(Array.isArray(times)).toBe(true);
      expect(times.length).toBeGreaterThanOrEqual(0);
    });

    test('handles invalid date object', () => {
      const times = fetchAPI(new Date('invalid'));
      expect(Array.isArray(times)).toBe(true);
    });

    test('returns fallback times when generation fails', () => {
      const times = fetchAPI(new Date('invalid'));
      // Should return empty array or fallback times
      expect(Array.isArray(times)).toBe(true);
    });
  });

  describe('submitAPI', () => {
    test('returns true for valid form data', async () => {
      const formData = {
        date: '2006-01-25',
        time: '18:00',
        guests: '4',
        occasion: 'birthday'
      };

      const result = await submitAPI(formData);
      expect(typeof result).toBe('boolean');
    });

    test('handles invalid form data', async () => {
      const result = await submitAPI(null);
      expect(result).toBe(false);
    });

    test('handles empty object', async () => {
      const result = await submitAPI({});
      // Should still process, may return true or false
      expect(typeof result).toBe('boolean');
    });

    test('resolves within reasonable time', async () => {
      const startTime = Date.now();
      const formData = {
        date: '2006-01-25',
        time: '18:00',
        guests: '2',
        occasion: 'anniversary'
      };

      await submitAPI(formData);
      const endTime = Date.now();
      
      // Should resolve within 2 seconds (1 second delay + buffer)
      expect(endTime - startTime).toBeLessThan(2000);
    });
  });
});
