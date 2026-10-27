/**
 * Comprehensive Validation Test Suite
 * Tests every rule required in Assignment 3
 */

import {
  validateFullName,
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
  evaluatePasswordStrength,
  isRegistrationFormValid,
  isLoginFormValid,
} from './src/utils/validation.js';

let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('--- TESTING REGISTRATION VALIDATION RULES ---');

// 1. Full Name
assert(validateFullName('') === 'Full name is required.', 'Empty name rejected');
assert(validateFullName('Al') === 'Full name must be at least 3 characters long.', 'Short name rejected (<3)');
assert(validateFullName('Tejas123') === 'Full name can only contain letters, spaces, and hyphens.', 'Numbers in name rejected');
assert(validateFullName('Tejas Mali') === '', 'Valid name accepted');

// 2. Email Address
assert(validateEmail('') === 'Email address is required.', 'Empty email rejected');
assert(validateEmail('invalid-email') === 'Please enter a valid email address (e.g., student@mitaoe.ac.in).', 'Invalid email format rejected');
assert(validateEmail('test@') !== '', 'Incomplete email rejected');
assert(validateEmail('tejas.mali@mitaoe.ac.in') === '', 'Valid college email accepted');

// 3. Mobile Number
assert(validateMobile('') === 'Mobile number is required.', 'Empty mobile rejected');
assert(validateMobile('12345') === 'Mobile number must contain exactly 10 digits (currently 5).', 'Short mobile rejected');
assert(validateMobile('abcdefghij') === 'Mobile number must contain digits only.', 'Non-digit mobile rejected');
assert(validateMobile('1234567890') === 'Mobile number must start with 6, 7, 8, or 9.', 'Invalid starting digit rejected');
assert(validateMobile('9876543210') === '', 'Valid 10-digit mobile accepted');

// 4. Password Criteria
assert(validatePassword('') === 'Password is required.', 'Empty password rejected');
assert(validatePassword('short') === 'Password must be at least 8 characters long.', 'Password < 8 chars rejected');
assert(validatePassword('lowercase123!') === 'Password must include at least one uppercase letter (A-Z).', 'Missing uppercase rejected');
assert(validatePassword('UPPERCASE123!') === 'Password must include at least one lowercase letter (a-z).', 'Missing lowercase rejected');
assert(validatePassword('NoNumbersHere!') === 'Password must include at least one digit (0-9).', 'Missing digit rejected');
assert(validatePassword('NoSpecialChar123') === 'Password must include at least one special character (!@#$%^&*...).', 'Missing special char rejected');
assert(validatePassword('Valid@Pass2025') === '', 'Valid complex password accepted');

// 5. Password Strength Meter
const weak = evaluatePasswordStrength('abc');
assert(weak.score < 3 && weak.label !== 'Strong', 'Weak password score calculated correctly');
const strong = evaluatePasswordStrength('Valid@Pass2025');
assert(strong.score === 5 && strong.label === 'Strong', 'Strong password score = 5 and label = Strong');

// 6. Confirm Password
assert(validateConfirmPassword('', 'Valid@Pass2025') === 'Please confirm your password.', 'Empty confirmation rejected');
assert(validateConfirmPassword('Mismatch@1', 'Valid@Pass2025') === 'Passwords do not match.', 'Mismatched passwords rejected');
assert(validateConfirmPassword('Valid@Pass2025', 'Valid@Pass2025') === '', 'Matching passwords accepted');

// 7. Terms & Conditions
assert(validateTerms(false) === 'You must accept the Terms and Conditions to register.', 'Unchecked terms rejected');
assert(validateTerms(true) === '', 'Checked terms accepted');

// 8. Register Button State (isRegistrationFormValid)
const invalidForm = {
  fullName: 'Tejas',
  email: 'bad-email',
  mobile: '9876543210',
  password: 'Valid@Pass2025',
  confirmPassword: 'Valid@Pass2025',
  terms: true,
};
assert(isRegistrationFormValid(invalidForm, { email: 'Error' }) === false, 'Form with error marks button disabled');

const validForm = {
  fullName: 'Tejas Mali',
  email: 'tejas.mali@mitaoe.ac.in',
  mobile: '9876543210',
  password: 'Valid@Pass2025',
  confirmPassword: 'Valid@Pass2025',
  terms: true,
};
assert(isRegistrationFormValid(validForm, {}) === true, 'Valid form marks button enabled');

console.log('\n--- TESTING LOGIN VALIDATION RULES ---');
assert(isLoginFormValid({ email: '', password: '' }, {}) === false, 'Empty login form disabled');
assert(isLoginFormValid({ email: 'bad-email', password: 'secret' }, {}) === false, 'Invalid login email disabled');
assert(isLoginFormValid({ email: 'student@mitaoe.ac.in', password: '' }, {}) === false, 'Missing login password disabled');
assert(isLoginFormValid({ email: 'student@mitaoe.ac.in', password: 'Valid@Pass2025' }, {}) === true, 'Valid login form enabled');

console.log(`\nTEST RESULTS: ${passed}/${total} passed (${Math.round((passed / total) * 100)}%)`);

if (passed === total) {
  console.log('ALL VALIDATION REQUIREMENTS PASSED SUCCESSFULLY!');
} else {
  process.exit(1);
}
