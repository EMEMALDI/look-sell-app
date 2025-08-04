import { User, ContentPost } from '../types';

// --- MOCK DATABASE ---
// In a real application, this data would come from a backend API.

const users: User[] = [
    {
      id: 'user-1',
      name: 'Demo Creator',
      avatar: 'https://picsum.photos/seed/user1/100/100',
      walletAddress: '0xMockAddressForLoginUser',
      isCreator: true,
      isVerified: true,
      banner: 'https://picsum.photos/seed/banner1/1200/400',
      bio: 'Your favorite creator. Join my journey and get exclusive content!',
      followers: 5234,
      subscriptionPrice: 10.00,
    },
    {
      id: 'jane-doe',
      name: 'CreatorJane',
      avatar: 'https://picsum.photos/seed/jane/100/100',
      walletAddress: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      isCreator: true,
      isVerified: true,
      banner: 'https://picsum.photos/seed/banner/1200/400',
      bio: 'Just a creator sharing my world. ✨ Exclusive content for my biggest supporters.',
      followers: 1200000,
      subscriptionPrice: 15.00,
    },
    {
      id: 'live-guy',
      name: 'AwesomeLive',
      avatar: 'https://picsum.photos/seed/liveguy/100/100',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      isCreator: true,
      isVerified: true,
      banner: 'https://picsum.photos/seed/banner2/1200/400',
      bio: 'Bringing you the best live content, every single day. Don\'t miss out!',
      followers: 876000,
      subscriptionPrice: 12.50,
    },
    {
      id: 'artist-x',
      name: 'ExclusiveArt',
      avatar: 'https://picsum.photos/seed/art/100/100',
      walletAddress: '0x1cE3858c351b79BDe4e64f891b4A532B5b3b6C9D',
      isCreator: true,
      isVerified: false,
      banner: 'https://picsum.photos/seed/banner3/1200/400',
      bio: 'Exploring the boundaries of digital art. Each piece tells a story.',
      followers: 7800,
      subscriptionPrice: 25.00,
    },
     {
      id: 'fit-fam',
      name: 'FitFam',
      avatar: 'https://picsum.photos/seed/fit/100/100',
      walletAddress: '0x2aF3A22E4e1A7A73E47B228806A575e84A31e0d5',
      isCreator: true,
      isVerified: true,
      banner: 'https://picsum.photos/seed/banner4/1200/400',
      bio: 'Your daily dose of motivation and fitness. Let\'s get strong together!',
      followers: 450000,
      subscriptionPrice: 7.99,
    },
    {
        id: 'new-user',
        name: 'NewFan',
        avatar: 'https://picsum.photos/seed/newfan/100/100',
        walletAddress: '', // Will be set on creation
        isCreator: false,
        isVerified: false,
        banner: 'https://picsum.photos/seed/banner5/1200/400',
        bio: 'Just here to support my favorite creators!',
        followers: 0,
        subscriptionPrice: 0,
    }
];

const posts: ContentPost[] = [
  { id: '1', creatorId: 'jane-doe', creatorName: 'CreatorJane', creatorAvatar: 'https://picsum.photos/seed/jane/100/100', type: 'photo', url: 'https://picsum.photos/seed/post1/600/800', caption: 'Chasing sunsets. ✨', isExclusive: false, isVerified: true, timestamp: '2 hours ago' },
  { id: '2', creatorId: 'live-guy', creatorName: 'AwesomeLive', creatorAvatar: 'https://picsum.photos/seed/liveguy/100/100', type: 'video', url: 'https://picsum.photos/seed/post2/600/800', caption: 'New dance routine is up! Check it out.', isExclusive: true, price: 10, isVerified: true, timestamp: '5 hours ago' },
  { id: '3', creatorId: 'artist-x', creatorName: 'ExclusiveArt', creatorAvatar: 'https://picsum.photos/seed/art/100/100', type: 'photo', url: 'https://picsum.photos/seed/post3/600/800', caption: 'A quiet moment in the studio.', isExclusive: false, isVerified: false, timestamp: '1 day ago' },
  { id: '4', creatorId: 'jane-doe', creatorName: 'CreatorJane', creatorAvatar: 'https://picsum.photos/seed/jane/100/100', type: 'photo', url: 'https://picsum.photos/seed/post4/600/800', caption: 'My exclusive behind-the-scenes set. 🤫', isExclusive: true, price: 15, isVerified: true, timestamp: '2 days ago' },
  { id: '5', creatorId: 'fit-fam', creatorName: 'FitFam', creatorAvatar: 'https://picsum.photos/seed/fit/100/100', type: 'video', url: 'https://picsum.photos/seed/post5/600/800', caption: 'Morning workout routine!', isExclusive: false, isVerified: true, timestamp: '3 days ago' },
  { id: '6', creatorId: 'live-guy', creatorName: 'AwesomeLive', creatorAvatar: 'https://picsum.photos/seed/liveguy/100/100', type: 'photo', url: 'https://picsum.photos/seed/post6/600/800', caption: 'Sneak peek from my upcoming video.', isExclusive: false, isVerified: true, timestamp: '4 days ago' },
  { id: 'p1', creatorId: 'jane-doe', creatorName: 'CreatorJane', creatorAvatar: 'https://picsum.photos/seed/jane/100/100', type: 'photo', url: 'https://picsum.photos/seed/prof1/600/800', caption: 'Good morning! ☀️', isExclusive: false, isVerified: true, timestamp: 'Just now' },
  { id: 'p2', creatorId: 'jane-doe', creatorName: 'CreatorJane', creatorAvatar: 'https://picsum.photos/seed/jane/100/100', type: 'photo', url: 'https://picsum.photos/seed/prof2/600/800', caption: 'Exclusive beach day gallery! 🏖️', isExclusive: true, price: 20, isVerified: true, timestamp: '1 day ago' },
  { id: 'p3', creatorId: 'jane-doe', creatorName: 'CreatorJane', creatorAvatar: 'https://picsum.photos/seed/jane/100/100', type: 'video', url: 'https://picsum.photos/seed/prof3/600/800', caption: 'My thoughts on this week.', isExclusive: false, isVerified: true, timestamp: '3 days ago' },
  { id: 'u1-p1', creatorId: 'user-1', creatorName: 'Demo Creator', creatorAvatar: 'https://picsum.photos/seed/user1/100/100', type: 'photo', url: 'https://picsum.photos/seed/demopost1/600/800', caption: 'Testing out the new platform!', isExclusive: false, isVerified: true, timestamp: '1 hour ago' },
  { id: 'u1-p2', creatorId: 'user-1', creatorName: 'Demo Creator', creatorAvatar: 'https://picsum.photos/seed/user1/100/100', type: 'video', url: 'https://picsum.photos/seed/demopost2/600/800', caption: 'A quick hello to my new subscribers!', isExclusive: true, price: 5, isVerified: true, timestamp: '3 hours ago' },
];

const dashboardData = {
  totalRevenue: 4521.50,
  subscribers: 351,
  monthlyChange: 12.5,
  recentActivities: [
    { id: 1, type: 'Subscription', user: 'SuperFan99', amount: 15.00, date: '1 day ago' },
    { id: 2, type: 'Tip', user: 'BigSpender', amount: 25.00, date: '2 days ago' },
    { id: 3, type: 'Subscription', user: 'NewFollower', amount: 15.00, date: '2 days ago' },
    { id: 4, type: 'Payout', user: 'You', amount: -1230.00, date: '3 days ago' },
    { id: 5, type: 'Tip', user: 'JaneFan', amount: 5.00, date: '4 days ago' },
    { id: 6, type: 'Subscription', user: 'CoolCat123', amount: 15.00, date: '5 days ago' },
  ],
};


// --- API FUNCTIONS ---

export const getUserById = (id: string): User | null => {
    return users.find(u => u.id === id) || null;
}

export const getPosts = (): ContentPost[] => {
    return posts.filter(p => p.creatorId !== 'user-1'); // Exclude demo user posts from main feed
}

export const getPostsByCreatorId = (creatorId: string): ContentPost[] => {
    return posts.filter(p => p.creatorId === creatorId);
}

export const getCreators = (): User[] => {
    return users.filter(u => u.isCreator);
}

export const createNewUser = (walletAddress: string): User => {
    const newUser = { ...users.find(u => u.id === 'new-user')! };
    newUser.walletAddress = walletAddress;
    return newUser;
}

export const getDashboardData = () => {
    return dashboardData;
}
