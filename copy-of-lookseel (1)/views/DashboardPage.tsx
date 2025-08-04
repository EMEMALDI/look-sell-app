import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../services/database';

interface DashboardData {
  totalRevenue: number;
  subscribers: number;
  monthlyChange: number;
  recentActivities: { id: number; type: string; user: string; amount: number; date: string; }[];
}

const StatCard: React.FC<{ title: string; value: string; change?: string; }> = ({ title, value, change }) => (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transform transition-all hover:border-purple-400/50 hover:shadow-xl hover:-translate-y-1">
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && <p className="text-sm text-green-400 mt-2">{change}</p>}
    </div>
);

const DashboardPage: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        setData(getDashboardData());
    }, []);

    if (!data) {
        return <div className="text-center p-8">Loading dashboard...</div>;
    }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-8 text-white">Creator Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Revenue (Simulated)" value={`$${data.totalRevenue.toFixed(2)}`} change={`+${data.monthlyChange}% this month`} />
        <StatCard title="Subscribers" value={data.subscribers.toString()} />
        <StatCard title="Last Payout" value="$1,230.00" />
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">Recent Activity (Simulated)</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {data.recentActivities.map(activity => (
            <div key={activity.id} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-lg hover:bg-gray-900/80 transition-colors">
              <div>
                <p className="font-semibold text-white">{activity.type} from {activity.user}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
              <p className={`font-bold ${activity.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {activity.amount > 0 ? '+' : ''}{activity.amount.toFixed(2)} USDT
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;