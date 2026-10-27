import React from 'react';

/**
 * UserDashboard Component
 * Displayed upon successful login. Demonstrates completed authentication lifecycle.
 */
const UserDashboard = ({ user, onLogout }) => {
  return (
    <div className="auth-form-card dashboard-card">
      <div className="dashboard-header">
        <div className="avatar-circle">
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h2 className="dashboard-title">Welcome, {user?.fullName || 'Student'}!</h2>
          <p className="dashboard-email">{user?.email}</p>
        </div>
      </div>

      <div className="session-status-badge">
        <span className="live-dot"></span> Active Demonstration Session
      </div>

      <div className="profile-details-table">
        <div className="profile-row">
          <span className="profile-key">Full Name</span>
          <span className="profile-val">{user?.fullName || 'N/A'}</span>
        </div>
        <div className="profile-row">
          <span className="profile-key">Registered Email</span>
          <span className="profile-val">{user?.email || 'N/A'}</span>
        </div>
        <div className="profile-row">
          <span className="profile-key">Contact Mobile</span>
          <span className="profile-val">{user?.mobile ? `+91 ${user.mobile}` : 'N/A'}</span>
        </div>
        <div className="profile-row">
          <span className="profile-key">Course</span>
          <span className="profile-val">Web Technology (2304362L)</span>
        </div>
        <div className="profile-row">
          <span className="profile-key">Institution</span>
          <span className="profile-val">MIT Academy of Engineering, Pune</span>
        </div>
      </div>

      <div className="dashboard-alert">
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zm0 7.5a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          Client-side authentication successful. The form data was validated in real-time using custom regex patterns and React state hooks.
        </span>
      </div>

      <div className="dashboard-actions">
        <button
          type="button"
          onClick={onLogout}
          className="btn-secondary logout-btn"
        >
          Sign Out of Account
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
