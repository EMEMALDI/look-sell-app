
import React from 'react';

interface SettingsPageProps {
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout }) => {
    const handleDataDeletion = () => {
        if (window.confirm("Are you sure you want to permanently delete your account and all associated data? This action cannot be undone.")) {
            alert("Your account and data have been scheduled for deletion.");
            onLogout();
        }
    }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-white">Settings</h2>
      
      <div className="space-y-8">
        {/* Security Settings */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="2fa-toggle" className="text-gray-300">Enable 2-Factor Authentication (2FA)</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="2fa-toggle" value="" className="sr-only peer" defaultChecked/>
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
             <button className="text-white bg-white/10 hover:bg-white/20 font-semibold py-2 px-4 rounded-lg transition-colors">
                Change Password
            </button>
          </div>
        </div>

        {/* Language and Region */}
        <div className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Language & Region</h3>
          <div>
            <label htmlFor="language-select" className="text-gray-300 block mb-2">Language</label>
            <select id="language-select" className="w-full max-w-xs bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
              <option>English</option>
              <option>فارسی (Farsi)</option>
              <option>Español</option>
              <option>日本語</option>
            </select>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-red-900/50 backdrop-blur-lg border border-red-500/50 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-red-300 mb-4">Data Management</h3>
          <p className="text-red-300 mb-4">Permanently delete your account and all of your content. This cannot be undone.</p>
          <button 
            onClick={handleDataDeletion}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Delete My Account
          </button>
        </div>

        {/* Logout */}
        <div className="text-center pt-4">
            <button onClick={onLogout} className="text-gray-400 hover:text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Logout
            </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;