import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const TransactionsHub = ({ data }) => {
    const transactions = data?.transactions || [];

    // Group transactions by date
    const groupedByDate = transactions.reduce((groups, tx) => {
        const date = tx.date;
        if (!groups[date]) groups[date] = [];
        groups[date].push(tx);
        return groups;
    }, {});

    // Calculate daily net for each group
    const getDayNet = (txs) => {
        return txs.reduce((sum, tx) => {
            return sum + (tx.type === 'income' ? tx.amount : -tx.amount);
        }, 0);
    };

    const formatDate = (dateStr) => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (dateStr === today) return 'Today';
        if (dateStr === yesterday) return 'Yesterday';
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div>
                <h1 className="headline-lg" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Transactions</h1>
                <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Your recent financial activity</p>
            </div>

            {/* Search / Filter Bar */}
            <div style={{ display: 'flex', gap: 12 }}>
                <input
                    type="text"
                    placeholder="Search transactions..."
                    className="input-field"
                    style={{ flex: 1 }}
                />
                <button className="btn-ghost" style={{ padding: '10px 20px' }}>
                    Filter
                </button>
            </div>

            {/* Transaction Groups */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Object.entries(groupedByDate).map(([date, txs]) => {
                    const dayNet = getDayNet(txs);
                    return (
                        <div key={date} className="glass-card" style={{ padding: 0 }}>
                            {/* Day Header */}
                            <div className="day-header" style={{ padding: '14px 24px 10px', margin: 0, borderBottom: '1px solid var(--border-subtle)' }}>
                                <span className="label-caps" style={{ color: 'var(--text-muted)' }}>
                                    {formatDate(date)}
                                </span>
                                <span style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: dayNet >= 0 ? 'var(--income)' : 'var(--expense)',
                                    display: 'flex', alignItems: 'center', gap: 4,
                                }}>
                                    {dayNet >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {dayNet >= 0 ? '+' : ''}${dayNet.toFixed(2)}
                                </span>
                            </div>

                            {/* Transactions */}
                            <div style={{ padding: '4px 24px 12px' }}>
                                {txs.map((tx, i) => (
                                    <div key={tx.id} className="transaction-row" style={{
                                        borderBottom: i < txs.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                        padding: '14px 0',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{
                                                width: 44, height: 44,
                                                borderRadius: 'var(--radius-sm)',
                                                background: tx.type === 'income' ? 'var(--income-surface)' : 'rgba(255,255,255,0.05)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 22,
                                            }}>
                                                {tx.icon}
                                            </div>
                                            <div>
                                                <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 2 }}>{tx.name}</p>
                                                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                                    {tx.category}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{
                                                fontWeight: 600,
                                                fontSize: 15,
                                                color: tx.type === 'income' ? 'var(--income)' : 'var(--text-primary)',
                                                marginBottom: 2,
                                            }}>
                                                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Subscriptions Summary */}
            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 className="title-md" style={{ color: 'var(--text-primary)' }}>Active Subscriptions</h3>
                    <span className="label-caps" style={{ color: 'var(--text-muted)' }}>
                        ${data?.subscriptions?.reduce((s, sub) => s + sub.cost, 0).toFixed(2)}/mo
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {data?.subscriptions?.map(sub => (
                        <div key={sub.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '12px 16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-subtle)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 20 }}>{sub.icon}</span>
                                <div>
                                    <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{sub.name}</p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>${sub.cost.toFixed(2)}/mo</p>
                                </div>
                            </div>
                            {sub.status === 'Flagged' ? (
                                <span className="badge-danger">⚠ Review</span>
                            ) : (
                                <span className="badge-safe">Active</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionsHub;
