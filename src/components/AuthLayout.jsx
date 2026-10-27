import React from 'react';

/**
 * AuthLayout Component
 * Provides the overarching container, institution branding header,
 * interactive feature showcase side panel, tab navigation switcher,
 * and academic footer.
 */
const AuthLayout = ({
  activeTab,
  onTabChange,
  children,
  stats = { registeredCount: 0 },
}) => {
  return (
    <div className="auth-app-wrapper">
      {/* Top Academic Ribbon */}
      <header className="academic-ribbon">
        <div className="ribbon-container">
          <div className="ribbon-brand">
            <span className="institute-badge">MITAOE</span>
            <div className="ribbon-text">
              <span className="ribbon-title">MIT Academy of Engineering, Pune</span>
              <span className="ribbon-sub">Department of Computer Engineering &bull; AY 2025–26</span>
            </div>
          </div>
          <div className="ribbon-meta">
            <span className="meta-tag">Web Technology (2304362L)</span>
            <span className="meta-tag highlight">Assignment 3: ReactJS</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="auth-main-container">
        <div className="auth-layout-grid">
          {/* Left Column: Visual Brand & Feature Showcase */}
          <aside className="auth-info-column">
            <div className="brand-header">
              <div className="brand-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="brand-shield-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="brand-heading">AuthPortal</h1>
                <p className="brand-tagline">Client-Side Authentication & Real-Time Validation</p>
              </div>
            </div>

            <p className="project-description">
              A high-precision ReactJS front-end application built with Vite, demonstrating controlled components, custom hook workflows, dynamic regex validators, and accessible form controls.
            </p>

            {/* Feature highlights list */}
            <div className="feature-cards-list">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Real-Time Validation</h4>
                  <p className="feature-desc">Immediate input evaluation with touch tracking and friendly error hints.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Password Strength Meter</h4>
                  <p className="feature-desc">Dynamic multi-factor complexity scoring (Uppercase, Lowercase, Number, Symbol).</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <div>
                  <h4 className="feature-title">Strict Button Safeguards</h4>
                  <p className="feature-desc">Buttons disabled until all field requirements and terms are satisfied.</p>
                </div>
              </div>
            </div>

            {/* Quick Architecture Pills */}
            <div className="tech-badge-container">
              <span className="tech-pill">React 18</span>
              <span className="tech-pill">Vite</span>
              <span className="tech-pill">Controlled Inputs</span>
              <span className="tech-pill">Custom Hooks</span>
              <span className="tech-pill">Pure CSS3</span>
            </div>

            {/* Quick Demo Registry Status */}
            <div className="registry-status-bar">
              <span className="registry-dot"></span>
              <span>Local Demo Accounts Registered: <strong>{stats.registeredCount}</strong></span>
            </div>
          </aside>

          {/* Right Column: Interactive Form Card */}
          <section className="auth-interactive-column">
            {/* Top Tab Navigator (Hidden when viewing dashboard or success) */}
            {activeTab !== 'dashboard' && activeTab !== 'success' && (
              <div className="tab-switcher" role="tablist" aria-label="Authentication Options">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'login'}
                  onClick={() => onTabChange('login')}
                  className={`tab-btn ${activeTab === 'login' ? 'active-tab' : ''}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'register'}
                  onClick={() => onTabChange('register')}
                  className={`tab-btn ${activeTab === 'register' ? 'active-tab' : ''}`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                  </svg>
                  <span>Register Account</span>
                </button>
              </div>
            )}

            {/* Form Slot */}
            <div className="form-card-wrapper">
              {children}
            </div>
          </section>
        </div>
      </main>

      {/* Academic Lab Footer */}
      <footer className="auth-footer">
        <div className="footer-content">
          <p className="footer-student">
            <strong>Student:</strong> Tejas Mali &bull; <strong>PRN:</strong> 202401040083 &bull; <strong>TE Comp B.Tech</strong>
          </p>
          <p className="footer-credits">
            MIT Academy of Engineering, Alandi (D.), Pune &bull; Subject: Web Technology (2304362L) &bull; Assignment 3 (ReactJS)
          </p>
          <p className="footer-disclaimer">
            Academic Project Disclaimer: This application was created solely for laboratory evaluation. Client-side authentication uses browser-local storage for testing.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
