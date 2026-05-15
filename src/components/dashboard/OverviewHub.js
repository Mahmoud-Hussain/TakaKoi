import React from 'react';
import { TrendingUp, TrendingDown, Sparkles, ArrowUpRight, ArrowDownRight, Plus, Lightbulb } from 'lucide-react';

const OverviewHub = ({ data, onConnectBank, user }) => {
    const totalBalance = data?.totalBalance || 24500;
    const monthlyIncome = 4200;
    const monthlyExpense = 2150;
    const monthlySavings = monthlyIncome - monthlyExpense;
    const budgetRemaining = 750;
    const budgetTotal = 3000;
    const budgetPercent = ((budgetTotal - budgetRemaining) / budgetTotal) * 100;

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Greeting */}
            <div>
                <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{greeting()},</p>
                <h1 className="headline-lg" style={{ color: 'var(--text-primary)' }}>Zenith</h1>
            </div>

            {/* AI Insight Banner */}
            <div className="insight-banner" style={{ animation: 'slide-up 0.5s ease-out' }}>
                <Sparkles size={18} style={{ color: 'var(--income)', flexShrink: 0, marginTop: 2 }} />
                <div>
                    <p className="body-sm" style={{ color: 'var(--income)', fontWeight: 600, marginBottom: 2 }}>
                        You're on track to save ${monthlySavings + 450} more this month
                    </p>
                    <p className="body-sm" style={{ color: 'var(--text-secondary)' }}>
                        Your spending on Entertainment is 15% lower than average. Keep it up!
                    </p>
                </div>
            </div>

            {/* Hero Balance Card */}
            <div className="hero-balance" style={{ animation: 'slide-up 0.6s ease-out' }}>
                <p className="label-caps" style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Total Balance</p>
                <p className="display-lg" style={{ color: 'var(--text-primary)', marginBottom: 16 }}>
                    ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>

                {/* Metrics Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    <div className="stat-card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
                            <ArrowUpRight size={14} style={{ color: 'var(--income)' }} />
                            <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Income</span>
                        </div>
                        <p className="title-md" style={{ color: 'var(--income)' }}>${monthlyIncome.toLocaleString()}</p>
                    </div>
                    <div className="stat-card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
                            <ArrowDownRight size={14} style={{ color: 'var(--expense)' }} />
                            <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Expense</span>
                        </div>
                        <p className="title-md" style={{ color: 'var(--expense)' }}>${monthlyExpense.toLocaleString()}</p>
                    </div>
                    <div className="stat-card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
                            <TrendingUp size={14} style={{ color: 'var(--primary-light)' }} />
                            <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Savings</span>
                        </div>
                        <p className="title-md" style={{ color: 'var(--primary-light)' }}>${monthlySavings.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Budget Status + Connected Accounts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Budget Status */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Budget Status</span>
                        <span className="badge-safe">On Track</span>
                    </div>
                    <p className="headline-lg" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>
                        ${budgetRemaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: 16 }}>
                        left in your monthly budget
                    </p>
                    <div className="progress-track">
                        <div className="progress-fill progress-fill-primary" style={{ width: `${budgetPercent}%` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>${(budgetTotal - budgetRemaining).toLocaleString()} spent</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>${budgetTotal.toLocaleString()} total</span>
                    </div>
                </div>

                {/* Connected Accounts */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Linked Accounts</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{data?.connectedAccounts?.length || 0} active</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                        {data?.connectedAccounts?.map(acc => (
                            <div key={acc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ fontSize: 20 }}>{acc.icon}</span>
                                    <div>
                                        <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{acc.name}</p>
                                        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{acc.type}</p>
                                    </div>
                                </div>
                                <span className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                    ${acc.balance.toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button onClick={onConnectBank} className="btn-ghost" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <Plus size={14} /> Connect Institution
                    </button>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 className="title-md" style={{ color: 'var(--text-primary)' }}>Recent Transactions</h3>
                    <button className="btn-ghost" onClick={() => {}} style={{ fontSize: 12, padding: '6px 12px' }}>View All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {data?.transactions?.map((tx, i) => (
                        <div key={tx.id} className="transaction-row" style={{ borderBottom: i < (data?.transactions?.length || 0) - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{
                                    width: 42, height: 42,
                                    borderRadius: 'var(--radius-sm)',
                                    background: tx.type === 'income' ? 'var(--income-surface)' : 'rgba(255,255,255,0.05)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 20,
                                }}>
                                    {tx.icon}
                                </div>
                                <div>
                                    <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{tx.name}</p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tx.category} • {tx.date}</p>
                                </div>
                            </div>
                            <span style={{
                                fontWeight: 600,
                                fontSize: 15,
                                color: tx.type === 'income' ? 'var(--income)' : 'var(--text-primary)',
                            }}>
                                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Bills */}
            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 className="title-md" style={{ color: 'var(--text-primary)' }}>Upcoming Bills</h3>
                    <span className="badge-warning">3 pending</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                    {data?.upcomingBills?.map(bill => (
                        <div key={bill.id} style={{
                            padding: '14px 16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: 22 }}>{bill.icon}</span>
                                <div>
                                    <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{bill.name}</p>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{bill.date}</p>
                                </div>
                            </div>
                            <span className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                ${bill.amount.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OverviewHub;
