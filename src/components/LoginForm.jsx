import React, { useState } from 'react';
import FormInput from './FormInput';
import PasswordInput from './PasswordInput';
import ErrorMessage from './ErrorMessage';
import { validateEmail, isLoginFormValid } from '../utils/validation';

/**
 * LoginForm Component
 * Handles user login with client-side validation, Remember Me option,
 * Show/Hide password toggle, and demo authentication matching.
 */
const LoginForm = ({ onLoginSuccess, onSwitchToRegister, registeredUsers = [] }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState('');

  // Validate single login field
  const validateSingleField = (name, value) => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return value.trim() ? '' : 'Password is required.';
      default:
        return '';
    }
  };

  // Handle inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setCredentials((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear general error when user modifies fields
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: '' }));
    }

    if (touched[name]) {
      const err = validateSingleField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateSingleField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Button disabled state
  const formIsValid = isLoginFormValid(credentials, errors);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const emailErr = validateEmail(credentials.email);
    const passErr = credentials.password.trim() ? '' : 'Password is required.';

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr, general: '' });
      return;
    }

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, general: '' }));

    // Simulate authenticating against registered demo accounts (client-side demonstration)
    setTimeout(() => {
      setIsLoading(false);

      const targetEmail = credentials.email.trim().toLowerCase();
      const targetPass = credentials.password;

      // Look up in registered users or default demo user
      const matchedUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === targetEmail && u.password === targetPass
      );

      if (matchedUser) {
        onLoginSuccess(matchedUser, credentials.rememberMe);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: 'Invalid email or password. Please verify your credentials or register a new account.',
        }));
      }
    }, 500);
  };

  // Quick fill demo credentials for quick faculty review
  const handleQuickDemoFill = () => {
    // Pick the most recent registered user or default sample
    const sample = registeredUsers.length > 0
      ? registeredUsers[registeredUsers.length - 1]
      : { email: 'demo@mitaoe.ac.in', password: 'DemoUser@2025' };

    setCredentials({
      email: sample.email,
      password: sample.password,
      rememberMe: true,
    });
    setTouched({ email: true, password: true });
    setErrors({ email: '', password: '', general: '' });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotPasswordMsg(
      'Demonstration notice: In this client-side lab assignment, password resets are simulated. You may re-register with your email or use the demo credentials provided below.'
    );
  };

  return (
    <div className="auth-form-card">
      <div className="form-header">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">
          Sign in to access your dashboard and lab workspace.
        </p>
      </div>

      {errors.general && (
        <div className="alert-box alert-error" role="alert">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <strong>Authentication Failed</strong>
            <p>{errors.general}</p>
          </div>
        </div>
      )}

      {forgotPasswordMsg && (
        <div className="alert-box alert-info" role="status">
          <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p>{forgotPasswordMsg}</p>
            <button
              type="button"
              className="btn-dismiss-inline"
              onClick={() => setForgotPasswordMsg('')}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="auth-form">
        {/* Email Address */}
        <FormInput
          label="Email Address"
          id="login-email"
          name="email"
          type="email"
          value={credentials.email}
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

        {/* Password */}
        <PasswordInput
          label="Password"
          id="login-password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="••••••••"
          error={touched.password ? errors.password : ''}
          required
          showStrengthMeter={false}
          autoComplete="current-password"
        />

        {/* Remember Me & Forgot Password row */}
        <div className="form-row-between">
          <label className="checkbox-label" htmlFor="login-rememberMe">
            <input
              id="login-rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={credentials.rememberMe}
              onChange={handleChange}
              className="checkbox-input"
            />
            <span className="checkbox-text">Remember me</span>
          </label>

          <a href="#forgot" onClick={handleForgotPassword} className="forgot-password-link">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button
            type="submit"
            disabled={!formIsValid || isLoading}
            className={`btn-primary submit-btn ${!formIsValid ? 'btn-disabled' : ''}`}
            title={!formIsValid ? 'Enter valid email and password to log in' : 'Click to log in'}
          >
            {isLoading ? (
              <span className="spinner-wrapper">
                <span className="spinner"></span> Signing in...
              </span>
            ) : (
              'Log In'
            )}
          </button>

          {!formIsValid && (
            <p className="validation-hint">
              * Enter a valid email format and non-empty password to enable login.
            </p>
          )}
        </div>

        {/* Demo Fast Autofill */}
        <div className="demo-fill-box">
          <span>Need demo credentials?</span>
          <button type="button" onClick={handleQuickDemoFill} className="btn-link">
            Auto-fill demo credentials
          </button>
        </div>

        {/* Switch to Register Form */}
        <div className="form-footer">
          <p>
            Don&apos;t have an account yet?{' '}
            <button
              type="button"
              className="auth-switch-link"
              onClick={onSwitchToRegister}
            >
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
