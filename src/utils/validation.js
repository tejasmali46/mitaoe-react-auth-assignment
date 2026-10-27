/**
 * Validation Utilities for User Registration and Login Forms
 * Course: Web Technology (2304362L) - Assignment 3
 * MIT Academy of Engineering, Pune
 */

// Regular expression definitions
export const REGEX = {
  // Letters, spaces, hyphens and dots; 3 to 50 characters
  NAME: /^[a-zA-Z\s'.]{3,50}$/,
  // Standard RFC 5322 compliant email regex
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  // Indian standard 10-digit mobile number (starts with 6, 7, 8, or 9)
  MOBILE: /^[6-9]\d{9}$/,
  // Password criteria individual checks
  HAS_UPPERCASE: /[A-Z]/,
  HAS_LOWERCASE: /[a-z]/,
  HAS_NUMBER: /[0-9]/,
  HAS_SPECIAL: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
};

/**
 * Validates full name
 * @param {string} name 
 * @returns {string} Error message or empty string
 */
export const validateFullName = (name) => {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return 'Full name is required.';
  }
  if (trimmed.length < 3) {
    return 'Full name must be at least 3 characters long.';
  }
  if (trimmed.length > 50) {
    return 'Full name must not exceed 50 characters.';
  }
  if (!REGEX.NAME.test(trimmed)) {
    return 'Full name can only contain letters, spaces, and hyphens.';
  }
  return '';
};

/**
 * Validates email address format
 * @param {string} email 
 * @returns {string} Error message or empty string
 */
export const validateEmail = (email) => {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return 'Email address is required.';
  }
  if (!REGEX.EMAIL.test(trimmed)) {
    return 'Please enter a valid email address (e.g., student@mitaoe.ac.in).';
  }
  return '';
};

/**
 * Validates mobile number (10 digits)
 * @param {string} mobile 
 * @returns {string} Error message or empty string
 */
export const validateMobile = (mobile) => {
  const trimmed = (mobile || '').trim();
  if (!trimmed) {
    return 'Mobile number is required.';
  }
  if (!/^\d+$/.test(trimmed)) {
    return 'Mobile number must contain digits only.';
  }
  if (trimmed.length !== 10) {
    return `Mobile number must contain exactly 10 digits (currently ${trimmed.length}).`;
  }
  if (!REGEX.MOBILE.test(trimmed)) {
    return 'Mobile number must start with 6, 7, 8, or 9.';
  }
  return '';
};

/**
 * Evaluates password criteria and returns strength analysis
 * @param {string} password 
 * @returns {object} Strength details and checklist
 */
export const evaluatePasswordStrength = (password = '') => {
  const checks = {
    length: password.length >= 8,
    uppercase: REGEX.HAS_UPPERCASE.test(password),
    lowercase: REGEX.HAS_LOWERCASE.test(password),
    number: REGEX.HAS_NUMBER.test(password),
    special: REGEX.HAS_SPECIAL.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let label = 'Very Weak';
  let color = '#ef4444'; // Red
  let percentage = 20;

  if (score === 5) {
    label = 'Strong';
    color = '#10b981'; // Green
    percentage = 100;
  } else if (score >= 4) {
    label = 'Good';
    color = '#3b82f6'; // Blue
    percentage = 80;
  } else if (score >= 3) {
    label = 'Fair';
    color = '#f59e0b'; // Amber
    percentage = 60;
  } else if (score >= 2) {
    label = 'Weak';
    color = '#f97316'; // Orange
    percentage = 40;
  }

  return {
    score,
    label,
    color,
    percentage,
    checks,
    isValid: score === 5,
  };
};

/**
 * Validates password meets security rules
 * @param {string} password 
 * @returns {string} Error message or empty string
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!REGEX.HAS_UPPERCASE.test(password)) {
    return 'Password must include at least one uppercase letter (A-Z).';
  }
  if (!REGEX.HAS_LOWERCASE.test(password)) {
    return 'Password must include at least one lowercase letter (a-z).';
  }
  if (!REGEX.HAS_NUMBER.test(password)) {
    return 'Password must include at least one digit (0-9).';
  }
  if (!REGEX.HAS_SPECIAL.test(password)) {
    return 'Password must include at least one special character (!@#$%^&*...).';
  }
  return '';
};

/**
 * Validates confirm password matches password
 * @param {string} confirmPassword 
 * @param {string} password 
 * @returns {string} Error message or empty string
 */
export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (confirmPassword !== password) {
    return 'Passwords do not match.';
  }
  return '';
};

/**
 * Validates terms and conditions checkbox
 * @param {boolean} termsAccepted 
 * @returns {string} Error message or empty string
 */
export const validateTerms = (termsAccepted) => {
  if (!termsAccepted) {
    return 'You must accept the Terms and Conditions to register.';
  }
  return '';
};

/**
 * Central field validator helper
 * @param {string} fieldName 
 * @param {any} value 
 * @param {object} allValues 
 * @returns {string} Error message or empty string
 */
export const validateField = (fieldName, value, allValues = {}) => {
  switch (fieldName) {
    case 'fullName':
      return validateFullName(value);
    case 'email':
      return validateEmail(value);
    case 'mobile':
      return validateMobile(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validateConfirmPassword(value, allValues.password || '');
    case 'terms':
      return validateTerms(value);
    default:
      return '';
  }
};

/**
 * Checks if entire registration form is valid
 * @param {object} values Form values
 * @param {object} errors Existing error messages
 * @returns {boolean} True if all valid
 */
export const isRegistrationFormValid = (values, errors) => {
  // 1. All mandatory fields must have non-empty values
  const hasFullName = Boolean(values.fullName && values.fullName.trim());
  const hasEmail = Boolean(values.email && values.email.trim());
  const hasMobile = Boolean(values.mobile && values.mobile.trim());
  const hasPassword = Boolean(values.password);
  const hasConfirmPassword = Boolean(values.confirmPassword);
  const hasAcceptedTerms = Boolean(values.terms);

  if (!hasFullName || !hasEmail || !hasMobile || !hasPassword || !hasConfirmPassword || !hasAcceptedTerms) {
    return false;
  }

  // 2. No recorded errors in the error object
  const hasErrors = Object.values(errors).some((err) => Boolean(err));
  if (hasErrors) {
    return false;
  }

  // 3. Verify clean evaluation of all fields directly
  const nameErr = validateFullName(values.fullName);
  const emailErr = validateEmail(values.email);
  const mobileErr = validateMobile(values.mobile);
  const passErr = validatePassword(values.password);
  const confirmErr = validateConfirmPassword(values.confirmPassword, values.password);
  const termsErr = validateTerms(values.terms);

  return !(nameErr || emailErr || mobileErr || passErr || confirmErr || termsErr);
};

/**
 * Checks if entire login form is valid
 * @param {object} values 
 * @param {object} errors 
 * @returns {boolean}
 */
export const isLoginFormValid = (values, errors) => {
  const hasEmail = Boolean(values.email && values.email.trim());
  const hasPassword = Boolean(values.password && values.password.trim());

  if (!hasEmail || !hasPassword) {
    return false;
  }

  const emailErr = validateEmail(values.email);
  const passErr = values.password.trim() ? '' : 'Password is required.';

  return !emailErr && !passErr && !errors.email && !errors.password;
};
