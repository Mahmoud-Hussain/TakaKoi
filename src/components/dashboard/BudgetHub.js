import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb, Target, TrendingDown, Star, Plane } from 'lucide-react';

const BudgetHub = ({ data }) => {
    const budgets = data?.budgets || [];
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const now = new Date();
    const currentMonth = months[now.getMonth()];
    const currentYear = now.getFullYear();

    const getBudgetStatus = (spent, limit) => {
        const ratio = spent / limit;
        if (ratio > 1) return { type: 'danger', label: `$${(spent - limit).toFixed(0)} over budget`, icon: XCircle };
        if (ratio > 0.85) return { type: 'warning', label: 'Nearing monthly limit', icon: AlertTriangle };
        return { type: 'safe', label: 'Safe budget zone', icon: CheckCircle2 };
    };

    const getProgressColor = (spent, limit) => {
        const ratio = spent / limit;
        if (ratio > 1) return 'progress-fill-danger';
        if (ratio > 0.85) return 'progress-fill-warning';
        return 'progress-fill-income';
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div>
                <h1 className="headline-lg" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>This Month's Budget</h1>
                <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Planning for {currentMonth} {currentYear}</p>
            </div>

            {/* Total Spent Hero */}
            <div className="hero-balance">
                <p className="label-caps" style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>Total Spent</p>
                <p className="display-lg" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>
                    ${totalSpent.toFixed(2)}
                </p>
                <p className="body-sm" style={{ color: 'var(--text-muted)' }}>
                    of ${totalBudget.toFixed(2)} budgeted
                </p>
                <div className="progress-track" style={{ marginTop: 16 }}>
                    <div
                        className={`progress-fill ${getProgressColor(totalSpent, totalBudget)}`}
                        style={{ width: `${Math.min(100, (totalSpent / totalBudget) * 100)}%` }}
                    />
                </div>
            </div>

            {/* Smart Insight */}
            <div className="insight-banner" style={{ animation: 'slide-up 0.5s ease-out' }}>
                <Lightbulb size={18} style={{ color: 'var(--income)', flexShrink: 0, marginTop: 2 }} />
                <div>
                    <p className="body-sm" style={{ color: 'var(--income)', fontWeight: 600, marginBottom: 2 }}>
                        Smart Insight
                    </p>
                    <p className="body-sm" style={{ color: 'var(--text-secondary)' }}>
                        You've spent 15% less on Entertainment than last month. Keep it up!
                    </p>
                </div>
            </div>

            {/* Category Cards */}
            <div>
                <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 16 }}>Categories</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {budgets.map(b => {
                        const status = getBudgetStatus(b.spent, b.limit);
                        const StatusIcon = status.icon;
                        const percent = Math.min(100, (b.spent / b.limit) * 100);
                        return (
                            <div key={b.id} className="glass-card" style={{ padding: '20px 24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 24 }}>{b.icon}</span>
                                        <div>
                                            <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.category}</p>
                                            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>${b.spent.toFixed(2)}</span>
                                                {' / '}${b.limit.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`badge-${status.type}`}>
                                        <StatusIcon size={12} />
                                        {status.label}
                                    </span>
                                </div>
                                <div className="progress-track">
                                    <div
                                        className={`progress-fill ${getProgressColor(b.spent, b.limit)}`}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Debt Payoff */}
            {data?.debts && data.debts.length > 0 && (
                <div>
                    <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TrendingDown size={20} style={{ color: 'var(--warning)' }} />
                        Debt Payoff
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {data.debts.map(debt => (
                            <div key={debt.id} className="glass-card" style={{ padding: '20px 24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ fontSize: 20 }}>{debt.icon}</span>
                                        {debt.name}
                                    </span>
                                    <span style={{ color: 'var(--warning)', fontWeight: 700, fontSize: 16 }}>
                                        ${debt.balance.toLocaleString()}
                                    </span>
                                </div>
                                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
                                    APR: {debt.apr}% • Minimum: ${debt.minPayment}/mo
                                </p>
                                <div className="progress-track progress-track-thin">
                                    <div className="progress-fill progress-fill-warning" style={{ width: '15%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Savings Goals */}
            {data?.goals && data.goals.length > 0 && (
                <div>
                    <h3 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Star size={20} style={{ color: '#F59E0B' }} />
                        Savings Goals
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {data.goals.map(goal => {
                            const percent = Math.min(100, (goal.saved / goal.target) * 100);
                            const remaining = goal.target - goal.saved;
                            const monthsToGo = Math.ceil(remaining / 400);
                            return (
                                <div key={goal.id} className="glass-card" style={{ padding: '20px 24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                        <span style={{ color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontSize: 20 }}>{goal.icon}</span>
                                            {goal.name}
                                        </span>
                                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                                            <span style={{ color: 'var(--income)', fontWeight: 600 }}>${goal.saved.toLocaleString()}</span>
                                            {' / '}${goal.target.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="progress-track" style={{ marginBottom: 8 }}>
                                        <div className="progress-fill progress-fill-income" style={{ width: `${percent}%` }} />
                                    </div>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                        Keep saving $400/mo to reach your goal in ~{monthsToGo} months
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Shared Expenses */}
            {data?.sharedExpenses && data.sharedExpenses.length > 0 && (
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 className="title-md" style={{ color: 'var(--text-primary)' }}>Split & Shared</h3>
                        <button className="btn-primary" style={{ fontSize: 12, padding: '8px 16px' }}>Settle Up</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {data.sharedExpenses.map(exp => (
                            <div key={exp.id} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '12px 16px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: 'var(--radius-sm)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 22 }}>{exp.icon}</span>
                                    <div>
                                        <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{exp.person}</p>
                                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{exp.note}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{
                                        fontWeight: 600, fontSize: 14,
                                        color: exp.type === 'owes_me' ? 'var(--income)' : 'var(--expense)',
                                    }}>
                                        ${exp.amount.toFixed(2)}
                                    </p>
                                    <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                        {exp.type === 'owes_me' ? 'Owes you' : 'You owe'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetHub;
