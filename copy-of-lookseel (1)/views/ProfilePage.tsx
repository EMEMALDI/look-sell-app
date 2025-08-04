import React, { useState, useEffect } from 'react';
import { User, ContentPost, View } from '../types';
import ContentCard from '../components/ContentCard';
import CreatorAssistant from '../components/CreatorAssistant';
import { VerifiedIcon } from '../components/icons/Icons';
import { getUserById, getPostsByCreatorId } from '../services/database';

interface ProfilePageProps {
  currentUser: User | null;
  viewingProfileId: string | null;
  onPayment: (creatorAddress: string, amount: number) => Promise<void>;
  onNavigate: (view: View, id: string | null) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ currentUser, viewingProfileId, onPayment, onNavigate }) => {
  const [profileData, setProfileData] = useState<User | null>(null);
  const [profilePosts, setProfilePosts] = useState<ContentPost[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [tipAmount, setTipAmount] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const profileIdToLoad = viewingProfileId || currentUser?.id;

    if (profileIdToLoad) {
      const user = getUserById(profileIdToLoad);
      const posts = getPostsByCreatorId(profileIdToLoad);
      setProfileData(user);
      setProfilePosts(posts);
    } else {
      setProfileData(null);
      setProfilePosts([]);
    }
    setIsLoading(false);
  }, [viewingProfileId, currentUser]);

  if (isLoading) {
    return <div className="text-center py-20 text-white text-2xl">Loading Profile...</div>;
  }

  if (!profileData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-white">Profile Not Found</h2>
        <p className="text-gray-400 mt-2">Could not find the requested user profile.</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profileData.id;

  const handleSubscribe = () => {
    onPayment(profileData.walletAddress, profileData.subscriptionPrice);
  };

  const handleTip = () => {
    if (tipAmount > 0) {
      onPayment(profileData.walletAddress, tipAmount);
    } else {
      alert("Please enter a valid tip amount.");
    }
  };
  
  const formatFollowers = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num;
  }

  return (
    <div className="text-white">
      <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
        <img src={profileData.banner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 -mt-16 sm:-mt-24">
        <div className="flex flex-col sm:flex-row items-center sm:items-end">
          <img src={profileData.avatar} alt={profileData.name} className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-purple-600 bg-gray-800" />
          <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold flex items-center justify-center sm:justify-start">
              {profileData.name} {profileData.isVerified && <VerifiedIcon className="w-8 h-8 ml-3 text-blue-400" />}
            </h1>
            <p className="text-lg text-gray-400 mt-1">{formatFollowers(profileData.followers)} Followers</p>
          </div>
           {!isOwnProfile && currentUser && (
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 sm:mt-0 sm:ml-auto">
                <button
                  onClick={handleSubscribe}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transform transition-transform duration-300"
                >
                  Subscribe for ${profileData.subscriptionPrice.toFixed(2)}
                </button>
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                    className="w-24 bg-gray-900/70 border border-white/10 rounded-full px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-center"
                  />
                  <button
                    onClick={handleTip}
                    className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 transform transition-transform duration-300"
                  >
                    Tip
                  </button>
                </div>
              </div>
            )}
        </div>
        <p className="mt-6 max-w-3xl text-gray-300 text-center sm:text-left">{profileData.bio}</p>
      </div>
      
      <div className="mt-10 border-b border-white/10">
        <div className="flex space-x-8">
          <button onClick={() => setActiveTab('posts')} className={`py-4 px-1 text-lg font-semibold transition-colors ${activeTab === 'posts' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>Posts</button>
          {isOwnProfile && profileData.isCreator && (
              <button onClick={() => setActiveTab('assistant')} className={`py-4 px-1 text-lg font-semibold transition-colors ${activeTab === 'assistant' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}>AI Assistant</button>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profilePosts.map(post => <ContentCard key={post.id} post={post} onCreatorClick={(id) => onNavigate('profile', id)} />)}
          </div>
        )}
        {activeTab === 'assistant' && isOwnProfile && profileData.isCreator && <CreatorAssistant />}
      </div>
    </div>
  );
};

export default ProfilePage;