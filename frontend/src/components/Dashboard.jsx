import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Mail, Clock, CheckCircle, AlertCircle, TrendingUp, Activity } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

const data = [
    { name: 'Mon', emails: 45, drafts: 24 },
    { name: 'Tue', emails: 52, drafts: 30 },
    { name: 'Wed', emails: 38, drafts: 20 },
    { name: 'Thu', emails: 65, drafts: 45 },
    { name: 'Fri', emails: 48, drafts: 28 },
    { name: 'Sat', emails: 25, drafts: 15 },
    { name: 'Sun', emails: 15, drafts: 10 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <Card className="p-6 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-white/5 ${color} text-white`}>
                    <Icon size={24} />
                </div>
                <span className={`text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change > 0 ? '+' : ''}{change}%
                </span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-white/60 text-sm">{title}</p>
        </div>
    </Card>
);

const Dashboard = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="relative rounded-2xl overflow-hidden p-8 md:p-12">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Good Evening, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-white">Alex</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mb-8">
                        You have 3 urgent emails requiring attention and 5 drafts ready for review.
                        Your productivity is up 12% this week.
                    </p>
                    <div className="flex gap-4">
                        <Button variant="primary" size="lg" icon={<Mail size={20} />}>
                            Process Inbox
                        </Button>
                        <Button variant="secondary" size="lg" icon={<Activity size={20} />}>
                            View Analytics
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Emails"
                    value="1,284"
                    change={12}
                    icon={Mail}
                    color="text-blue-400"
                />
                <StatCard
                    title="Pending Drafts"
                    value="14"
                    change={-5}
                    icon={Clock}
                    color="text-yellow-400"
                />
                <StatCard
                    title="Action Items"
                    value="28"
                    change={8}
                    icon={AlertCircle}
                    color="text-accent-light"
                />
                <StatCard
                    title="Completed"
                    value="452"
                    change={24}
                    icon={CheckCircle}
                    color="text-green-400"
                />
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Velocity Chart */}
                <Card className="lg:col-span-2 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Email Velocity</h3>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Week</Button>
                            <Button variant="ghost" size="sm">Month</Button>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8C4A2F" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8C4A2F" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.4)"
                                    tick={{ fill: 'rgba(255,255,255,0.4)' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.4)"
                                    tick={{ fill: 'rgba(255,255,255,0.4)' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="emails"
                                    stroke="#8C4A2F"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorEmails)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                        <Mail size={18} className="text-white/70" />
                                    </div>
                                    {i !== 4 && (
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/10"></div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-white font-medium">Drafted reply to "Project Update"</p>
                                    <p className="text-white/40 text-sm">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-6 text-sm">
                        View All Activity
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
