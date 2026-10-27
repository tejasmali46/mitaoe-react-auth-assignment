import React from 'react';

/**
 * SuccessMessage Component
 * Displays post-registration confirmation with registered account summary
 * and a direct action button to proceed to the login form.
 */
const SuccessMessage = ({ user, onProceedToLogin }) => {
  return (
    <div className="auth-form-card success-card" role="status" aria-live="polite">
      <div className="success-icon-badge">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="success-title">Registration Successful!</h2>
      <p className="success-subtitle">
        Your student account has been created and validated successfully.
      </p>

      <div className="registered-user-summary">
        <div className="summary-row">
          <span className="summary-label">Full Name:</span>
          <span className="summary-value">{user?.fullName || 'N/A'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Email:</span>
          <span className="summary-value">{user?.email || 'N/A'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Mobile:</span>
          <span className="summary-value">+91 {user?.mobile || 'N/A'}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Status:</span>
          <span className="summary-value status-active">Verified & Ready</span>
        </div>
      </div>

      <div className="success-actions">
        <button
          type="button"
          onClick={onProceedToLogin}
          className="btn-primary success-proceed-btn"
        >
          Proceed to Login &rarr;
        </button>
      </div>

      <p className="success-note">
        Note: The credentials have been added to your local browser storage for testing.
      </p>
    </div>
  );
};

export default SuccessMessage;
