import React, { useState, useEffect } from 'react';
import ContentCard from '../components/ContentCard';
import { ContentPost, User } from '../types';
import { getPosts } from '../services/database';
import { UserIcon } from '../components/icons/Icons';

interface HomePageProps {
  onViewProfile: (creatorId: string) => void;
  currentUser: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ onViewProfile, currentUser }) => {
  const [posts, setPosts] = useState<ContentPost[]>([]);

  useEffect(() => {
    // Fetch posts from the centralized mock database
    setPosts(getPosts());
  }, []);

  const WelcomeHero = () => (
     <div className="text-center my-16 p-8 bg-gray-800/30 backdrop-blur-md rounded-3xl border border-white/10">
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
        Welcome to <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">LookSeel</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300 sm:text-xl">
        The ultimate platform where creators connect with their fans. Discover exclusive content, join live streams, and support your favorite artists.
      </p>
      <div className="mt-8 flex justify-center">
         <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transform transition-transform duration-300">
            <UserIcon className="w-6 h-6"/>
            <span>Get Started</span>
        </button>
      </div>
    </div>
  )

  return (
    <div>
      {!currentUser && <WelcomeHero />}
      <h2 className="text-4xl font-bold mb-8 text-white">Art Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <ContentCard key={post.id} post={post} onCreatorClick={onViewProfile} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;