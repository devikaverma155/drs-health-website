/**
 * Phone validation utility for all forms
 * Handles Indian 10-digit mobile numbers with various input formats
 */

export function validatePhone(phoneStr: string): { isValid: boolean; error: string } {
  // Remove all non-digit characters
  let digitsOnly = phoneStr.replace(/\D/g, '');
  
  if (digitsOnly.length === 0) {
    return { isValid: false, error: '' };
  }
  
  // If number starts with 0, remove it (handles cases like 09691760562)
  if (digitsOnly.startsWith('0')) {
    digitsOnly = digitsOnly.substring(1);
  }
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: `Please enter 10 digit number only (${digitsOnly.length}/10)` };
  }
  
  if (digitsOnly.length > 10) {
    return { isValid: false, error: 'Please enter 10 digit number only' };
  }
  
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(digitsOnly)) {
    return { isValid: false, error: 'Phone number must start with 6, 7, 8, or 9' };
  }
  
  return { isValid: true, error: '' };
}
