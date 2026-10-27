import React, { useState } from 'react';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import ErrorMessage from './ErrorMessage';
import {
  validateFullName,
  validateEmail,
  validateMobile,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
  isRegistrationFormValid,
} from '../utils/validation';

/**
 * RegisterForm Component
 * Handles user registration with real-time field validation,
 * password strength evaluation, and button enablement control.
 */
const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  // Controlled form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  // Track field validation errors
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

  // Track whether a field has been interacted with (touched)
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    mobile: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  // Submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Real-time field validation helper
  const validateSingleField = (name, value, currentValues = formData) => {
    switch (name) {
      case 'fullName':
        return validateFullName(value);
      case 'email':
        return validateEmail(value);
      case 'mobile':
        return validateMobile(value);
      case 'password': {
        const passErr = validatePassword(value);
        // Also re-validate confirm password if already touched
        if (touched.confirmPassword && currentValues.confirmPassword) {
          const confirmErr = validateConfirmPassword(currentValues.confirmPassword, value);
          setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
        }
        return passErr;
      }
      case 'confirmPassword':
        return validateConfirmPassword(value, currentValues.password);
      case 'terms':
        return validateTerms(value);
      default:
        return '';
    }
  };

  // Handle text, email, password, and number changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const updatedFormData = {
      ...formData,
      [name]: fieldValue,
    };

    setFormData(updatedFormData);

    // Perform real-time validation if the field was already touched or user is actively correcting
    if (touched[name]) {
      const fieldError = validateSingleField(name, fieldValue, updatedFormData);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  // Handle blur event: mark field as touched and run immediate validation
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const fieldError = validateSingleField(name, fieldValue, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // Determine if the form is valid to enable/disable the submit button
  const formIsValid = isRegistrationFormValid(formData, errors);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = {
      fullName: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true,
      terms: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const nameErr = validateFullName(formData.fullName);
    const emailErr = validateEmail(formData.email);
    const mobileErr = validateMobile(formData.mobile);
    const passErr = validatePassword(formData.password);
    const confirmErr = validateConfirmPassword(formData.confirmPassword, formData.password);
    const termsErr = validateTerms(formData.terms);

    const newErrors = {
      fullName: nameErr,
      email: emailErr,
      mobile: mobileErr,
      password: passErr,
      confirmPassword: confirmErr,
      terms: termsErr,
    };

    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((err) => Boolean(err));
    if (hasAnyError) {
      return;
    }

    setIsSubmitting(true);

    // Simulate realistic asynchronous client registration
    setTimeout(() => {
      setIsSubmitting(false);

      const registeredUser = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        mobile: formData.mobile.trim(),
        password: formData.password,
        registeredAt: new Date().toISOString(),
      };

      onRegisterSuccess(registeredUser);
    }, 600);
  };

  // Demo auto-fill helper for quick testing during laboratory assessment
  const handleFillSample = () => {
    const sample = {
      fullName: 'Tejas Mali',
      email: 'tejas.mali@mitaoe.ac.in',
      mobile: '9876543210',
      password: 'SecurePass@2025',
      confirmPassword: 'SecurePass@2025',
      terms: true,
    };
    setFormData(sample);
    setTouched({
      fullName: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });
    setErrors({
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      terms: '',
    });
  };

  return (
    <div className="auth-form-card">
      <div className="form-header">
        <h2 className="form-title">Create an Account</h2>
        <p className="form-subtitle">
          Join AuthPortal to access academic lab tools and student resources.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="auth-form">
        {/* Full Name */}
        <FormInput
          label="Full Name"
          id="register-fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Tejas Mali"
          error={touched.fullName ? errors.fullName : ''}
          required
          autoComplete="name"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
            </svg>
          }
        />

        {/* Email Address */}
        <FormInput
          label="Email Address"
          id="register-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="student@mitaoe.ac.in"
          error={touched.email ? errors.email : ''}
          required
          autoComplete="email"
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
          }
        />

        {/* Mobile Number */}
        <FormInput
          label="Mobile Number"
          id="register-mobile"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="10-digit mobile number (e.g. 9876543210)"
          error={touched.mobile ? errors.mobile : ''}
          required
          maxLength={10}
          autoComplete="tel"
          helperText="Must be exactly 10 digits starting with 6, 7, 8, or 9."
          icon={
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
            </svg>
          }
        />

        {/* Password with Strength Meter */}
        <PasswordInput
          label="Password"
          id="register-password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="At least 8 characters with Aa, 1, @"
          error={touched.password ? errors.password : ''}
          required
          showStrengthMeter={true}
          autoComplete="new-password"
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          id="register-confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Re-enter password"
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          required
          showStrengthMeter={false}
          autoComplete="new-password"
        />

        {/* Terms and Conditions Checkbox */}
        <div className={`form-group checkbox-group ${touched.terms && errors.terms ? 'has-error' : ''}`}>
          <label className="checkbox-label" htmlFor="register-terms">
            <input
              id="register-terms"
              name="terms"
              type="checkbox"
              checked={formData.terms}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="checkbox-input"
            />
            <span className="checkbox-text">
              I agree to the{' '}
              <button
                type="button"
                className="terms-link-btn"
                onClick={() => setShowTermsModal(true)}
              >
                Terms and Conditions
              </button>{' '}
              and Privacy Policy.
            </span>
          </label>
          {touched.terms && <ErrorMessage message={errors.terms} id="register-terms-error" />}
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button
            type="submit"
            disabled={!formIsValid || isSubmitting}
            className={`btn-primary submit-btn ${!formIsValid ? 'btn-disabled' : ''}`}
            title={!formIsValid ? 'Complete all required fields correctly to enable' : 'Click to register'}
          >
            {isSubmitting ? (
              <span className="spinner-wrapper">
                <span className="spinner"></span> Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {!formIsValid && (
            <p className="validation-hint">
              * Fill in all fields correctly with required constraints to enable registration.
            </p>
          )}
        </div>

        {/* Quick Testing Helper */}
        <div className="demo-fill-box">
          <span>Testing lab assessment?</span>
          <button type="button" onClick={handleFillSample} className="btn-link">
            Auto-fill valid sample data
          </button>
        </div>

        {/* Switch to Login Form */}
        <div className="form-footer">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className="auth-switch-link"
              onClick={onSwitchToLogin}
            >
              Log In here
            </button>
          </p>
        </div>
      </form>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="modal-backdrop" onClick={() => setShowTermsModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Terms & Conditions</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowTermsModal(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p><strong>1. Academic Lab Project:</strong> This application is developed strictly for academic demonstration in Web Technology (2304362L) at MIT Academy of Engineering, Pune.</p>
              <p><strong>2. Client-Side Demonstration:</strong> No personal or confidential credentials should be entered. Passwords are validated locally on client device without backend persistence.</p>
              <p><strong>3. Data Privacy:</strong> Demo data is stored exclusively in your browser&apos;s local storage and is never transferred to any remote servers.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, terms: true }));
                  setErrors((prev) => ({ ...prev, terms: '' }));
                  setShowTermsModal(false);
                }}
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
