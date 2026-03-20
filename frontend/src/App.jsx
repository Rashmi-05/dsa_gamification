import React, { useState } from 'react';
import AuthPage from './pages/AuthPage.jsx';
import ConnectPage from './pages/ConnectPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

export default function App() {
  // page: 'auth' | 'connect' | 'dashboard'
  const [page, setPage] = useState('auth');
  const [user, setUser] = useState(null);
  const [platformData, setPlatformData] = useState(null);
  const [goalData, setGoalData] = useState(null);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setPage('connect');
  };

  const handleConnectSuccess = (data) => {
    setPlatformData(data);
    setGoalData(null); // ensure goal modal shows fresh
    setPage('dashboard');
  };

  const handleGoalSet = (data) => {
    setGoalData(data);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      {page === 'auth' && (
        <AuthPage onSuccess={handleAuthSuccess} />
      )}
      {page === 'connect' && (
        <ConnectPage user={user} onSuccess={handleConnectSuccess} />
      )}
      {page === 'dashboard' && (
        <DashboardPage
          user={user}
          platformData={platformData}
          goalData={goalData}
          onGoalSet={handleGoalSet}
        />
      )}
    </div>
  );
}
