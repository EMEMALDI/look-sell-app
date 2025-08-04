import React from 'react';
import { User, View } from '../types';
import { WalletIcon, UserIcon, SettingsIcon, StreamIcon, DashboardIcon, BellIcon, CompassIcon } from './icons/Icons';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onWalletClick: () => void;
  onNavigate: (view: View, id?: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onSignupClick, onWalletClick, onNavigate }) => {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              LookSeel
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white transition-colors duration-300">Art Gallery</button>
            <button onClick={() => onNavigate('discover')} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <CompassIcon className="w-5 h-5 mr-2" />
                Discover
            </button>
            {user && <button onClick={() => onNavigate('profile', user.id)} className="text-gray-300 hover:text-white transition-colors duration-300">My Profile</button>}
            {user && user.isCreator && (
                <button onClick={() => onNavigate('dashboard')} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                    <DashboardIcon className="w-5 h-5 mr-2" />
                    Dashboard
                </button>
            )}
            <button onClick={() => onNavigate('live')} className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center">
                <StreamIcon className="w-5 h-5 mr-2" />
                Live
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button onClick={onWalletClick} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                  <WalletIcon className="w-6 h-6 text-white" />
                </button>
                 <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 relative">
                  <BellIcon className="w-6 h-6 text-white" />
                  <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-pink-500 border-2 border-black/20"></span>
                </button>
                <button onClick={() => onNavigate('settings')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                    <SettingsIcon className="w-6 h-6 text-white"/>
                </button>
                <div onClick={() => onNavigate('profile', user.id)} className="flex items-center space-x-3 cursor-pointer">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-purple-500" />
                  <span className="hidden sm:block font-medium text-gray-200">{user.name}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                    onClick={onLoginClick}
                    className="flex items-center space-x-2 bg-white/10 text-white font-semibold py-2 px-6 rounded-full hover:bg-white/20 transform transition-all duration-300"
                >
                    <span>Login</span>
                </button>
                 <button
                    onClick={onSignupClick}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transform transition-transform duration-300"
                >
                    <UserIcon className="w-5 h-5"/>
                    <span>Sign Up</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;