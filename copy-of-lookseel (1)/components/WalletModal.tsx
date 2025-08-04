
import React from 'react';
import { User } from '../types';
import { CloseIcon, WalletIcon } from './icons/Icons';

interface WalletModalProps {
  onClose: () => void;
  user: User;
  balance: number;
}

const mockTransactions = [
    { id: 1, type: 'Subscription', to: 'CreatorJane', amount: -15.15, date: '2023-10-26' },
    { id: 2, type: 'Tip', to: 'AwesomeLive', amount: -5.15, date: '2023-10-25' },
    { id: 3, type: 'Deposit', to: 'You', amount: 100.00, date: '2023-10-24' },
    { id: 4, type: 'Content Purchase', to: 'ExclusiveArt', amount: -25.15, date: '2023-10-23' },
];

const WalletModal: React.FC<WalletModalProps> = ({ onClose, user, balance }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/80 border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-lg m-4 relative transform transition-all scale-95 hover:scale-100 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6"/>
        </button>

        <div className="flex items-center mb-6">
          <WalletIcon className="w-10 h-10 text-purple-400 mr-4" />
          <h2 className="text-3xl font-bold text-white">My USDT Wallet</h2>
        </div>

        <div className="bg-gray-900/70 p-6 rounded-xl border border-white/10 mb-6">
          <p className="text-gray-400 text-sm">Total Balance (Simulated)</p>
          <p className="text-4xl font-bold text-white tracking-tight">${balance.toFixed(2)} <span className="text-2xl text-gray-400">USDT</span></p>
           <div className="mt-4 text-sm text-gray-500">
                <p className="font-mono break-all">My Address: {user.walletAddress}</p>
            </div>
          <div className="flex space-x-4 mt-4">
              <button className="flex-1 bg-green-500/80 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors">Deposit</button>
              <button className="flex-1 bg-red-500/80 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500 transition-colors">Withdraw</button>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Recent Transactions (Simulated)</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {mockTransactions.map(tx => (
              <div key={tx.id} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg">
                <div>
                  <p className="font-semibold text-white">{tx.type} to {tx.to}</p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <p className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USDT
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;