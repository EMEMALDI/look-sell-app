import React, { useState, useEffect } from 'react';
import { User, View } from '../types';
import { getCreators } from '../services/database';
import { VerifiedIcon } from '../components/icons/Icons';

interface DiscoverPageProps {
  onNavigate: (view: View, id: string | null) => void;
}

const CreatorCard: React.FC<{ creator: User; onClick: () => void; }> = ({ creator, onClick }) => {
    const formatFollowers = (num: number) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num;
    }

    return (
        <div 
            className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            onClick={onClick}
        >
            <div className="h-32 bg-cover bg-center" style={{backgroundImage: `url(${creator.banner})`}}></div>
            <div className="p-4 flex flex-col items-center -mt-16">
                <img src={creator.avatar} alt={creator.name} className="w-24 h-24 rounded-full border-4 border-purple-500" />
                <h3 className="text-xl font-bold text-white mt-2 flex items-center">
                    {creator.name} {creator.isVerified && <VerifiedIcon className="w-5 h-5 ml-2 text-blue-400" />}
                </h3>
                <p className="text-sm text-gray-400">{formatFollowers(creator.followers)} Followers</p>
                <p className="text-center text-gray-300 mt-2 text-sm h-10 overflow-hidden">{creator.bio}</p>
                 <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transform transition-transform duration-300">
                    View Profile
                </button>
            </div>
        </div>
    )
}


const DiscoverPage: React.FC<DiscoverPageProps> = ({ onNavigate }) => {
  const [creators, setCreators] = useState<User[]>([]);

  useEffect(() => {
    setCreators(getCreators());
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8 text-white">Discover Creators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} onClick={() => onNavigate('profile', creator.id)} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;