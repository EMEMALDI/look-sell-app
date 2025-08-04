import React, { useState } from 'react';
import { User } from '../types';
import { CloseIcon, WalletIcon } from './icons/Icons';
import { openConnectModal } from '../services/walletConnectService';
import { getUserById, createNewUser } from '../services/database';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
  initialMode: 'login' | 'signup';
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, initialMode }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectedWallet, setConnectedWallet] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [show2FA, setShow2FA] = useState(false);

  const handleConnectWallet = async () => {
    const address = await openConnectModal();
    if (address) {
        setConnectedWallet(address);
    }
  }

  const handleInitialAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup' && !connectedWallet) {
        alert("Please connect your ERC20 wallet to sign up.");
        return;
    }
    if (email && password) {
      setShow2FA(true);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleFinalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let user: User | null = null;
    
    if (mode === 'login') {
      // Simulate logging in by fetching a pre-existing creator user
      user = getUserById('user-1'); // Fetches 'Demo Creator'
    } else {
      // Simulate signing up a new user
      user = createNewUser(connectedWallet);
    }
    
    if(user) {
        onLogin(user);
    } else {
        alert("Login failed. User not found.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-800/80 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 relative transform transition-all scale-95 hover:scale-100 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <CloseIcon className="w-6 h-6"/>
        </button>

        {!show2FA ? (
          <form onSubmit={handleInitialAuth}>
            {mode === 'login' ? (
                <>
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
                    <p className="text-center text-gray-400 mb-6">Login to access your world.</p>
                </>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-center text-white mb-2">Create Account</h2>
                    <p className="text-center text-gray-400 mb-6">Join the LookSeel community.</p>
                </>
            )}
            <div className="space-y-4">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
               {mode === 'signup' && (
                 <div>
                    {connectedWallet ? (
                        <div className="w-full bg-gray-900/70 border border-green-500/50 rounded-lg px-4 py-3 text-white">
                            <p className="text-xs text-green-400">Wallet Connected:</p>
                            <p className="font-mono text-sm break-all">{connectedWallet}</p>
                        </div>
                    ) : (
                        <button type="button" onClick={handleConnectWallet} className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transform transition-all duration-300">
                            <WalletIcon className="w-6 h-6 text-purple-400" />
                            <span>Connect Wallet</span>
                        </button>
                    )}
                 </div>
               )}
            </div>
            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:scale-105 transform transition-transform duration-300">
              Continue
            </button>
             <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full text-center text-gray-400 mt-4 hover:text-white text-sm">
                {mode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleFinalLogin}>
            <h2 className="text-3xl font-bold text-center text-white mb-2">2-Factor Authentication</h2>
            <p className="text-center text-gray-400 mb-6">Enter the code from your authenticator app.</p>
            <input 
              type="text" 
              placeholder="6-digit code" 
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white text-center tracking-[0.5em] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-lg hover:scale-105 transform transition-transform duration-300">
              Verify & {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;