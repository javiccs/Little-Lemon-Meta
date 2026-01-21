/**
 * Custom hook for managing booking form state and logic
 */

import { useCallback, useState } from 'react';
import {
  validateBookingForm,
  validateDate,
  validateGuests,
  validateOccasion,
  validateTime
} from '../utils/validators';

export const useBookingForm = (availableTimes, submitForm) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Updates a form field value
   */
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate on change if field was already touched
    if (touched[field]) {
      const fieldValidators = {
        date: () => validateDate(value),
        time: () => validateTime(value),
        guests: () => validateGuests(value),
        occasion: () => validateOccasion(value)
      };
      
      const validator = fieldValidators[field];
      if (validator) {
        const validation = validator();
        if (!validation.isValid) {
          setErrors(prev => ({ ...prev, [field]: validation.message }));
        } else {
          setErrors(prev => ({ ...prev, [field]: '' }));
        }
      }
    } else if (errors[field]) {
      // Clear error when user starts typing if not yet touched
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors, touched]);

  /**
   * Marks a field as touched and validates it
   */
  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate the field on blur
    const fieldValue = formData[field];
    const fieldValidators = {
      date: () => validateDate(fieldValue),
      time: () => validateTime(fieldValue),
      guests: () => validateGuests(fieldValue),
      occasion: () => validateOccasion(fieldValue)
    };
    
    const validator = fieldValidators[field];
    if (validator) {
      const validation = validator();
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.message }));
      }
    }
  }, [formData]);

  /**
   * Validates the entire form
   */
  const validateForm = useCallback(() => {
    const validationResults = validateBookingForm(formData);
    const newErrors = {};

    Object.keys(validationResults).forEach(field => {
      if (!validationResults[field].isValid) {
        newErrors[field] = validationResults[field].message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      date: true,
      time: true,
      guests: true,
      occasion: true
    });

    // Validate form
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    // Submit form
    setIsSubmitting(true);
    try {
      await submitForm(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit booking. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, submitForm, validateForm]);

  /**
   * Resets the form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData({
      date: '',
      time: '',
      guests: '',
      occasion: ''
    });
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    updateField,
    handleBlur,
    handleSubmit,
    resetForm
  };
};
