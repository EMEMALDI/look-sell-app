
import React, { useState, useEffect } from 'react';
import { User, View } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import WalletModal from './components/WalletModal';
import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';
import SettingsPage from './views/SettingsPage';
import LiveStreamPage from './views/LiveStreamPage';
import DashboardPage from './views/DashboardPage';
import DiscoverPage from './views/DiscoverPage'; 
import { sendPayment } from './services/walletService';
import { disconnect, getConnectedAddress } from './services/walletConnectService';
import { getUserById } from './services/database';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('home');
  const [viewingProfileId, setViewingProfileId] = useState<string | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isWalletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  
  const [walletBalance, setWalletBalance] = useState<number>(1250.75);

  useEffect(() => {
    // Check for persisted user in local storage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser) as User;
      const walletAddress = getConnectedAddress();
      // Ensure wallet is still connected, or update user state
      if (walletAddress && walletAddress.toLowerCase() === user.walletAddress.toLowerCase()) {
        setCurrentUser(user);
      } else {
        // Clear stale user if wallet is disconnected
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setAuthModalOpen(false);
  };

  const handleLogout = async () => {
    await disconnect();
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveView('home');
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleNavigate = (view: View, id: string | null = null) => {
    setActiveView(view);
    if (view === 'profile') {
        // If navigating to 'My Profile', use current user's ID. Otherwise, use provided ID.
        setViewingProfileId(id || currentUser?.id || null);
    } else {
        setViewingProfileId(null);
    }
  };

  const handlePayment = async (creatorAddress: string, amount: number) => {
    if (!currentUser) {
      openLoginModal();
      return;
    }
    
    const success = await sendPayment(creatorAddress, amount);
    if (success) {
      setWalletBalance(prev => {
          const newBalance = prev - amount;
          return newBalance < 0 ? 0 : newBalance;
      });
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'profile':
        return <ProfilePage currentUser={currentUser} viewingProfileId={viewingProfileId} onPayment={handlePayment} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onLogout={handleLogout} />;
      case 'live':
        return <LiveStreamPage onPayment={handlePayment} />;
      case 'dashboard':
        return currentUser?.isCreator ? <DashboardPage /> : <HomePage onViewProfile={(id) => handleNavigate('profile', id)} currentUser={currentUser} />;
      case 'discover':
        return <DiscoverPage onNavigate={handleNavigate}/>;
      case 'home':
      default:
        return <HomePage onViewProfile={(id) => handleNavigate('profile', id)} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen w-full font-sans text-white relative">
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 -z-10"></div>
      <div className="fixed inset-0 backdrop-blur-3xl -z-10"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          user={currentUser} 
          onLoginClick={openLoginModal}
          onSignupClick={openSignupModal}
          onWalletClick={() => setWalletModalOpen(true)}
          onNavigate={handleNavigate}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          {renderView()}
        </main>
        <Footer />
      </div>

      {isAuthModalOpen && (
        <LoginModal 
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)} 
          onLogin={handleLogin} 
        />
      )}

      {isWalletModalOpen && currentUser && (
        <WalletModal 
          onClose={() => setWalletModalOpen(false)} 
          user={currentUser}
          balance={walletBalance} 
        />
      )}
    </div>
  );
};

export default App;
