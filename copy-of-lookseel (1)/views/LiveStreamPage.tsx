
import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { HeartIcon } from '../components/icons/Icons';

interface LiveStreamPageProps {
  onPayment: (creatorAddress: string, amount: number) => Promise<void>;
}

const LIVE_CREATOR_WALLET = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"; // Mock streamer wallet

const initialMessages: Message[] = [
    { id: '1', username: 'CoolCat123', avatar: 'https://picsum.photos/seed/cat/100/100', text: 'Love this stream!', isTip: false },
    { id: '2', username: 'BigSpender', avatar: 'https://picsum.photos/seed/spender/100/100', text: 'Great content!', isTip: true, tipAmount: 25 },
    { id: '3', username: 'JaneFan', avatar: 'https://picsum.photos/seed/fan/100/100', text: 'You are the best!', isTip: false },
];

const mockChatUsers = [
    { name: "NightOwl", avatar: "https://picsum.photos/seed/owl/100/100", message: "This is amazing!" },
    { name: "SuperFan99", avatar: "https://picsum.photos/seed/super/100/100", message: "Can't wait for the next one!" },
    { name: "Observer", avatar: "https://picsum.photos/seed/observer/100/100", message: "Just watching." },
];

const LiveStreamPage: React.FC<LiveStreamPageProps> = ({ onPayment }) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [tipAmount, setTipAmount] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomUser = mockChatUsers[Math.floor(Math.random() * mockChatUsers.length)];
            const newMessage: Message = {
                id: new Date().toISOString(),
                username: randomUser.name,
                avatar: randomUser.avatar,
                text: randomUser.message,
                isTip: false
            };
            setMessages(prev => [...prev, newMessage].slice(-20)); // Keep chat history from growing too large
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newMessage.trim()) return;
        const msg: Message = {
            id: new Date().toISOString(),
            username: 'You',
            avatar: 'https://picsum.photos/seed/user1/100/100',
            text: newMessage,
            isTip: false,
        };
        setMessages([...messages, msg]);
        setNewMessage('');
    };

    const handleSendTip = async () => {
        const tipMessage: Message = {
            id: new Date().toISOString(),
            username: 'You',
            avatar: 'https://picsum.photos/seed/user1/100/100',
            text: `Tipped $${tipAmount} USDT!`,
            isTip: true,
            tipAmount: tipAmount
        };
        await onPayment(LIVE_CREATOR_WALLET, tipAmount);
        setMessages(prev => [...prev, tipMessage]);
    }
    
  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Stream Video */}
        <div className="flex-grow lg:w-2/3 bg-black rounded-2xl overflow-hidden border border-white/10 aspect-video flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">LIVE STREAM</h2>
                <p className="text-gray-400">(Video Player Placeholder)</p>
            </div>
        </div>

        {/* Chat & Tipping */}
        <div className="lg:w-1/3 bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col h-[70vh]">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-xl font-bold text-white text-center">Live Chat</h3>
            </div>
            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.isTip ? 'bg-purple-600/30 p-2 rounded-lg border border-purple-500' : ''}`}>
                        <img src={msg.avatar} alt={msg.username} className="w-8 h-8 rounded-full" />
                        <div>
                            <span className={`font-semibold ${msg.isTip ? 'text-purple-300' : 'text-gray-400'}`}>{msg.username}</span>
                            <p className="text-white">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-white/10">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                        type="text" 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Send a message..."
                        className="flex-grow bg-gray-900/70 border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                     <button type="submit" className="bg-purple-600 text-white rounded-full p-2.5 hover:bg-purple-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </form>
                <div className="flex items-center gap-2 mt-4">
                    <select value={tipAmount} onChange={(e) => setTipAmount(Number(e.target.value))} className="bg-gray-900/70 border border-white/10 rounded-full py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 appearance-none">
                        <option value={5}>$5</option>
                        <option value={10}>$10</option>
                        <option value={25}>$25</option>
                        <option value={100}>$100</option>
                    </select>
                    <button onClick={handleSendTip} className="flex-grow bg-gradient-to-r from-pink-500 to-amber-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:scale-105 transform transition-transform">
                        <HeartIcon className="w-5 h-5" />
                        <span>Tip USDT</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LiveStreamPage;