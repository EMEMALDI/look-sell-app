import React from 'react';
import { ContentPost } from '../types';
import { LockIcon, VerifiedIcon, HeartIcon, ChatIcon } from './icons/Icons';

interface ContentCardProps {
  post: ContentPost;
  onCreatorClick: (creatorId: string) => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ post, onCreatorClick }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden group transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative">
        <img src={post.url} alt={post.caption} className="w-full h-80 object-cover" />
        {post.isExclusive && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <LockIcon className="w-12 h-12 text-white/80 mb-4" />
            <h3 className="text-xl font-bold text-white">Exclusive Content</h3>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full hover:scale-105 transform transition-transform duration-300">
              Unlock for {post.price ? `$${post.price} USDT` : 'Free'}
            </button>
          </div>
        )}
        <div 
          className="absolute top-3 left-3 flex items-center bg-black/50 backdrop-blur-sm p-1.5 rounded-full cursor-pointer transition-all hover:bg-black/80"
          onClick={() => onCreatorClick(post.creatorId)}
        >
            <img src={post.creatorAvatar} className="w-8 h-8 rounded-full" alt={post.creatorName} />
            <span className="text-white font-semibold ml-2 pr-2">{post.creatorName}</span>
        </div>
        {post.isVerified && (
            <div className="absolute top-3 right-3 flex items-center bg-blue-500/80 backdrop-blur-sm p-1.5 rounded-full text-white text-xs font-bold">
                <VerifiedIcon className="w-4 h-4 mr-1"/>
                <span>Verified</span>
            </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-gray-300">{post.caption}</p>
        <div className="flex justify-between items-center mt-4 text-gray-400">
            <div className="flex space-x-4">
                <button className="flex items-center space-x-1 hover:text-pink-400 transition-colors"><HeartIcon className="w-5 h-5"/> <span>1.2k</span></button>
                <button className="flex items-center space-x-1 hover:text-purple-400 transition-colors"><ChatIcon className="w-5 h-5"/> <span>89</span></button>
            </div>
            <p className="text-xs">{post.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;