import React, { useState } from 'react';
import ErrorMessage from './ErrorMessage';
import { evaluatePasswordStrength } from '../utils/validation';

/**
 * Reusable PasswordInput component
 * Supports show/hide password toggle and dynamic password strength indicator.
 */
const PasswordInput = ({
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = '••••••••',
  error = '',
  required = false,
  showStrengthMeter = false,
  autoComplete = 'current-password',
  helperText = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  // Evaluate password strength if enabled and user has typed something
  const strength = showStrengthMeter ? evaluatePasswordStrength(value) : null;

  return (
    <div className={`form-group ${hasError ? 'has-error' : ''}`}>
      <div className="label-row">
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-star" aria-hidden="true"> *</span>}
        </label>
        {showStrengthMeter && value && (
          <span
            className="strength-badge"
            style={{ color: strength.color, borderColor: strength.color }}
          >
            {strength.label}
          </span>
        )}
      </div>

      <div className="input-wrapper">
        <span className="input-leading-icon">
          {/* Lock SVG Icon */}
          <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
              clipRule="evenodd"
            />
          </svg>
        </span>

        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          className={`form-input has-leading-icon has-trailing-btn ${hasError ? 'input-error' : ''}`}
        />

        {/* Show / Hide Toggle Button */}
        <button
          type="button"
          onClick={toggleShowPassword}
          className="password-toggle-btn"
          aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
          title={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={0}
        >
          {showPassword ? (
            /* Eye Off Icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            /* Eye Icon */
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Password Strength Progress Bar & Checklist */}
      {showStrengthMeter && value && (
        <div className="strength-container" aria-live="polite">
          <div className="strength-bar-track">
            <div
              className="strength-bar-fill"
              style={{
                width: `${strength.percentage}%`,
                backgroundColor: strength.color,
              }}
            />
          </div>

          <ul className="strength-rules-list">
            <li className={strength.checks.length ? 'rule-met' : 'rule-unmet'}>
              <span className="rule-dot"></span> 8+ characters
            </li>
            <li className={strength.checks.uppercase ? 'rule-met' : 'rule-unmet'}>
              <span className="rule-dot"></span> 1 uppercase (A-Z)
            </li>
            <li className={strength.checks.lowercase ? 'rule-met' : 'rule-unmet'}>
              <span className="rule-dot"></span> 1 lowercase (a-z)
            </li>
            <li className={strength.checks.number ? 'rule-met' : 'rule-unmet'}>
              <span className="rule-dot"></span> 1 number (0-9)
            </li>
            <li className={strength.checks.special ? 'rule-met' : 'rule-unmet'}>
              <span className="rule-dot"></span> 1 special symbol (!@#$)
            </li>
          </ul>
        </div>
      )}

      {helperText && !hasError && !showStrengthMeter && (
        <p id={helperId} className="helper-text">
          {helperText}
        </p>
      )}

      <ErrorMessage message={error} id={errorId} />
    </div>
  );
};

export default PasswordInput;
