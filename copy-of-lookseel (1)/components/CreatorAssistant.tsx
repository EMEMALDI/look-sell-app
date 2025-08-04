
import React, { useState } from 'react';
import { generateContentIdea } from '../services/geminiService';

const CreatorAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setIdea('');
    const result = await generateContentIdea(prompt);
    setIdea(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 my-8">
      <h3 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Creator AI Assistant
      </h3>
      <p className="text-gray-400 mb-4">Stuck on what to post next? Describe a theme, and let our AI spark some ideas for you.</p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A cozy autumn afternoon'"
          className="flex-grow bg-gray-900/70 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? 'Generating...' : 'Get Ideas'}
        </button>
      </div>

      {isLoading && <div className="text-center p-8 text-gray-300">Thinking...</div>}

      {idea && (
        <div className="mt-6 p-4 bg-gray-900/70 border border-white/10 rounded-lg">
          <h4 className="font-semibold text-lg text-white mb-2">Here are some ideas:</h4>
          <p className="text-gray-300 whitespace-pre-wrap">{idea}</p>
        </div>
      )}
    </div>
  );
};

export default CreatorAssistant;