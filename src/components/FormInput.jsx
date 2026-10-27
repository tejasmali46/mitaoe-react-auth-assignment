import React from 'react';
import ErrorMessage from './ErrorMessage';

/**
 * Reusable FormInput component for controlled text/email/tel inputs
 * Includes accessible labels, icons, real-time error messages, and helper text.
 */
const FormInput = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  error = '',
  required = false,
  helperText = '',
  icon = null,
  autoComplete = 'off',
  maxLength,
  disabled = false,
}) => {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className={`form-group ${hasError ? 'has-error' : ''}`}>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="required-star" aria-hidden="true"> *</span>}
      </label>

      <div className="input-wrapper">
        {icon && <span className="input-leading-icon">{icon}</span>}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          disabled={disabled}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          className={`form-input ${icon ? 'has-leading-icon' : ''} ${hasError ? 'input-error' : ''}`}
        />
      </div>

      {helperText && !hasError && (
        <p id={helperId} className="helper-text">
          {helperText}
        </p>
      )}

      <ErrorMessage message={error} id={errorId} />
    </div>
  );
};

export default FormInput;
