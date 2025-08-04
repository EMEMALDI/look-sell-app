export interface User {
  id: string;
  name: string;
  avatar: string;
  walletAddress: string;
  isCreator: boolean;
  isVerified: boolean;
  banner: string;
  bio: string;
  followers: number;
  subscriptionPrice: number;
}

export interface ContentPost {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  type: 'photo' | 'video';
  url: string;
  caption: string;
  isExclusive: boolean;
  price?: number;
  isVerified: boolean; // Creator's verification status at time of post
  timestamp: string;
}

export interface Message {
    id: string;
    username: string;
    avatar: string;
    text: string;
    isTip: boolean;
    tipAmount?: number;
}

export type View = 'home' | 'profile' | 'settings' | 'live' | 'dashboard' | 'discover';