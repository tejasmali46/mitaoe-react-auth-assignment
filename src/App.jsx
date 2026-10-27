import React, { useState, useEffect } from 'react';
import AuthLayout from './components/AuthLayout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SuccessMessage from './components/SuccessMessage';
import UserDashboard from './components/UserDashboard';

const STORAGE_KEY = 'mitaoe_auth_demo_users';
const SESSION_KEY = 'mitaoe_auth_active_user';

// Default seeded demo user for immediate evaluation
const DEFAULT_DEMO_USER = {
  fullName: 'Tejas Mali',
  email: 'tejas.mali@mitaoe.ac.in',
  mobile: '9876543210',
  password: 'DemoUser@2025',
  registeredAt: new Date().toISOString(),
};

function App() {
  // Current view: 'login' | 'register' | 'success' | 'dashboard'
  const [currentView, setCurrentView] = useState('register');
  
  // Registered users stored in localStorage
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  // Active logged-in user
  const [currentUser, setCurrentUser] = useState(null);
  
  // Last registered user data for the success screen
  const [lastRegisteredUser, setLastRegisteredUser] = useState(null);

  // Initialize stored users and active session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRegisteredUsers(parsed);
        } else {
          setRegisteredUsers([DEFAULT_DEMO_USER]);
          localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
        }
      } else {
        setRegisteredUsers([DEFAULT_DEMO_USER]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      }

      // Check for saved session
      const savedSession = sessionStorage.getItem(SESSION_KEY);
      if (savedSession) {
        const user = JSON.parse(savedSession);
        setCurrentUser(user);
        setCurrentView('dashboard');
      }
    } catch (err) {
      console.warn('Storage read failed; fallback to in-memory state.', err);
      setRegisteredUsers([DEFAULT_DEMO_USER]);
    }
  }, []);

  // Handle successful registration
  const handleRegisterSuccess = (newUser) => {
    const updatedUsers = [...registeredUsers.filter((u) => u.email !== newUser.email), newUser];
    setRegisteredUsers(updatedUsers);
    setLastRegisteredUser(newUser);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
    } catch (err) {
      console.error('Failed to write to localStorage', err);
    }

    setCurrentView('success');
  };

  // Handle successful login
  const handleLoginSuccess = (user, rememberMe) => {
    setCurrentUser(user);
    if (rememberMe) {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } catch (err) {
        console.error('Failed to write session', err);
      }
    }
    setCurrentView('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (err) {
      console.error('Failed to clear session', err);
    }
    setCurrentView('login');
  };

  // Switch between Login and Register tabs
  const handleTabChange = (tab) => {
    setCurrentView(tab);
  };

  return (
    <AuthLayout
      activeTab={currentView}
      onTabChange={handleTabChange}
      stats={{ registeredCount: registeredUsers.length }}
    >
      {currentView === 'register' && (
        <RegisterForm
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'login' && (
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setCurrentView('register')}
          registeredUsers={registeredUsers}
        />
      )}

      {currentView === 'success' && (
        <SuccessMessage
          user={lastRegisteredUser}
          onProceedToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'dashboard' && (
        <UserDashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      )}
    </AuthLayout>
  );
}

export default App;
