
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Claims from './components/Claims';
import AccountsReceivable from './components/AccountsReceivable';
import CreditsWallets from './components/CreditsWallets';
import Settings from './components/Settings';

type View = 'dashboard' | 'claims' | 'ar' | 'credits' | 'settings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const pageTitle = useMemo(() => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'claims': return 'Claims Management';
      case 'ar': return 'Accounts Receivable';
      case 'credits': return 'Credits & Wallets';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  }, [activeView]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'claims': return <Claims />;
      case 'ar': return <AccountsReceivable />;
      case 'credits': return <CreditsWallets />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-clarte-gray-50 text-clarte-gray-800">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-clarte-gray-100 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
