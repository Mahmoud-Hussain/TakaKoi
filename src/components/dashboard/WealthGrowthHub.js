import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { PieChart as PieIcon, Zap, Gauge, ArrowUpRight } from 'lucide-react';
import Card from '../ui/Card';

const WealthGrowthHub = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        <Card>
            <h2 className="text-lg font-semibold text-white mb-4">Net Worth Trend</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data?.netWorthHistory || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} />
                        <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                        <Area type="monotone" dataKey="net" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><PieIcon size={20} className="text-indigo-400" /> Asset Allocation</h2>
                <div className="h-48 flex items-center">
                    <ResponsiveContainer width="50%" height="100%">
                        <PieChart>
                            <Pie data={data?.assetAllocation || []} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                                {data?.assetAllocation?.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="w-50% pl-4 space-y-2">
                        {data?.assetAllocation?.map(asset => (
                            <div key={asset.name} className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
                                <span className="text-slate-300">{asset.name}</span>
                                <span className="text-white ml-auto">${(asset.value / 1000).toFixed(1)}k</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Zap size={20} className="text-emerald-400" /> Passive Income</h2>
                <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.passiveIncome || []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="month" stroke="#94a3b8" axisLine={false} tickLine={false} />
                            <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                            <RechartsTooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                            <Bar dataKey="dividends" stackId="a" fill="#10b981" name="Dividends" />
                            <Bar dataKey="interest" stackId="a" fill="#3b82f6" name="Interest" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2"><Gauge size={20} className="text-purple-400" /> Credit Score Monitor</h2>
                <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative w-36 h-36 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 36 36">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="3" strokeDasharray="100, 100" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">{data?.creditScore?.score || 750}</span>
                            <span className="text-xs text-emerald-400 font-medium flex items-center mt-1"><ArrowUpRight size={12} /> {data?.creditScore?.change || 0} pts</span>
                        </div>
                    </div>
                    <div className="flex-1 w-full space-y-4">
                        {data?.creditScore?.factors?.map((factor, i) => (
                            <div key={i} className="flex justify-between items-center text-sm border-b border-slate-800/50 pb-2 last:border-0">
                                <span className="text-slate-400">{factor.name}</span>
                                <span className={`font-medium ${factor.color}`}>{factor.value}</span>
                            </div>
                        ))}
                        <button className="text-xs text-purple-400 hover:text-purple-300 font-medium pt-1 w-full text-left transition-colors">View full credit report →</button>
                    </div>
                </div>
            </Card>
        </div>
    </div>
);

export default WealthGrowthHub;
