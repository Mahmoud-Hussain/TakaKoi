import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Lightbulb, ArrowUpRight, Gauge } from 'lucide-react';

const AnalyticsHub = ({ data }) => {
    // Spending breakdown for pie chart
    const spendingCategories = [
        { name: 'Food & Dining', value: 1240, transactions: 24, color: '#6366f1' },
        { name: 'Transport', value: 560, transactions: 12, color: '#8B5CF6' },
        { name: 'Shopping', value: 415, transactions: 8, color: '#10B981' },
        { name: 'Entertainment', value: 285, transactions: 6, color: '#F59E0B' },
        { name: 'Utilities', value: 350, transactions: 4, color: '#F43F5E' },
    ];

    // Income vs expense chart data
    const incomeExpenseData = [
        { name: 'Week 1', income: 1050, expense: 520 },
        { name: 'Week 2', income: 1050, expense: 680 },
        { name: 'Week 3', income: 1050, expense: 450 },
        { name: 'Week 4', income: 1050, expense: 500 },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    background: 'var(--bg-overlay)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '10px 14px',
                    fontSize: 12,
                }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
                            {p.name}: ${p.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div>
                <h1 className="headline-lg" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Analytics</h1>
                <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Your financial insights at a glance</p>
            </div>

            {/* AI Financial Insight */}
            <div className="insight-banner-ai" style={{ animation: 'slide-up 0.5s ease-out' }}>
                <Lightbulb size={18} style={{ color: 'var(--primary-light)', flexShrink: 0, marginTop: 2 }} />
                <div>
                    <p className="body-sm" style={{ color: 'var(--primary-light)', fontWeight: 600, marginBottom: 2 }}>
                        AI Financial Insight
                    </p>
                    <p className="body-sm" style={{ color: 'var(--text-secondary)' }}>
                        Your largest expense category this month is 'Food & Dining'. Reducing it by 10% could add $124 to your savings.
                    </p>
                </div>
            </div>

            {/* Income vs Expense Chart */}
            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                        <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Income vs Expense</h3>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Last 30 days performance</p>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--income)' }} />
                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Income</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--expense)' }} />
                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Expense</span>
                        </div>
                    </div>
                </div>
                <div style={{ height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={incomeExpenseData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                            <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} fontSize={12} />
                            <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} fontSize={12} tickFormatter={v => `$${v}`} />
                            <RechartsTooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#incomeGrad)" name="Income" />
                            <Area type="monotone" dataKey="expense" stroke="#F43F5E" strokeWidth={2.5} fillOpacity={1} fill="url(#expenseGrad)" name="Expense" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Spending Habits + Top Categories */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Donut Chart */}
                <div className="glass-card">
                    <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Spending Habits</h3>
                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={spendingCategories}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={85}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {spendingCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
                        {spendingCategories.map(cat => (
                            <div key={cat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color }} />
                                    <span className="body-sm" style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                                </div>
                                <span className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                                    ${cat.value.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Categories */}
                <div className="glass-card">
                    <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Top Spending Categories</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {spendingCategories.sort((a, b) => b.value - a.value).map((cat, i) => (
                            <div key={cat.name} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '14px 16px',
                                background: i === 0 ? 'var(--primary-surface)' : 'rgba(255,255,255,0.03)',
                                borderRadius: 'var(--radius-sm)',
                                border: i === 0 ? '1px solid rgba(79,70,229,0.2)' : '1px solid var(--border-subtle)',
                            }}>
                                <div>
                                    <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>
                                        {cat.name}
                                    </p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                        {cat.transactions} transactions
                                    </p>
                                </div>
                                <span className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                                    ${cat.value.toLocaleString()}.00
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Net Worth & Credit Score Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Net Worth Trend */}
                <div className="glass-card">
                    <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Net Worth Trend</h3>
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data?.netWorthHistory || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-muted)" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="net" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNet)" name="Net Worth" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Credit Score */}
                <div className="glass-card">
                    <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Gauge size={20} style={{ color: '#A855F7' }} />
                        Credit Score
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                        {/* Score Ring */}
                        <div style={{ position: 'relative', width: 130, height: 130 }}>
                            <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeDasharray="100, 100" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="#a855f7" strokeWidth="3"
                                    strokeDasharray={`${((data?.creditScore?.score || 782) / 850) * 100}, 100`}
                                    strokeLinecap="round" />
                            </svg>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
                                    {data?.creditScore?.score || 782}
                                </span>
                                <span style={{ fontSize: 11, color: 'var(--income)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <ArrowUpRight size={12} /> +{data?.creditScore?.change || 14} pts
                                </span>
                            </div>
                        </div>

                        {/* Factors */}
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {data?.creditScore?.factors?.map((factor, i) => (
                                <div key={i} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '8px 0',
                                    borderBottom: i < (data?.creditScore?.factors?.length || 0) - 1 ? '1px solid var(--border-subtle)' : 'none',
                                }}>
                                    <span className="body-sm" style={{ color: 'var(--text-muted)' }}>{factor.name}</span>
                                    <span className="body-sm" style={{ fontWeight: 600, color: factor.color?.includes('emerald') ? 'var(--income)' : factor.color?.includes('yellow') ? 'var(--warning)' : 'var(--text-primary)' }}>
                                        {factor.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Asset Allocation */}
            <div className="glass-card">
                <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Asset Allocation</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                    <div style={{ width: '40%', height: 180 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data?.assetAllocation || []}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={75}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {data?.assetAllocation?.map((entry, index) => (
                                        <Cell key={`alloc-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {data?.assetAllocation?.map(asset => (
                            <div key={asset.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: 4, background: asset.color }} />
                                    <span className="body-sm" style={{ color: 'var(--text-secondary)' }}>{asset.name}</span>
                                </div>
                                <span className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                    ${(asset.value / 1000).toFixed(1)}k
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHub;
