import React from 'react';
import { Target, Activity, ArrowDownRight, ArrowUpRight, Receipt, TrendingDown, Star } from 'lucide-react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const SpendingDebtHub = ({ data }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Target size={20} className="text-indigo-400" /> Zero-Based Budgets</h2>
                </div>
                <div className="space-y-4">
                    {data?.budgets?.map(b => (
                        <div key={b.id}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-white">{b.icon} {b.category}</span>
                                <span className="text-slate-400">${b.spent} / ${b.limit}</span>
                            </div>
                            <ProgressBar current={b.spent} max={b.limit} colorClass={b.spent > b.limit * 0.9 ? 'bg-red-500' : 'bg-indigo-500'} />
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Activity size={20} className="text-emerald-400" /> Split & Shared</h2>
                    <button className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-full hover:bg-indigo-500/30 transition-colors">Settle Up</button>
                </div>
                <div className="space-y-3">
                    {data?.sharedExpenses?.map(exp => (
                        <div key={exp.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{exp.icon}</span>
                                <div>
                                    <p className="text-white text-sm font-medium">{exp.person}</p>
                                    <p className="text-slate-400 text-xs">{exp.note}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-medium text-sm flex items-center justify-end gap-1 ${exp.type === 'owes_me' ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {exp.type === 'owes_me' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                    ${exp.amount.toFixed(2)}
                                </p>
                                <p className="text-xs text-slate-500">{exp.type === 'owes_me' ? 'Owes you' : 'You owe'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Receipt size={20} className="text-rose-400" /> Subscriptions</h2>
                </div>
                <div className="space-y-3">
                    {data?.subscriptions?.map(sub => (
                        <div key={sub.id} className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{sub.icon}</span>
                                <div>
                                    <p className="text-white text-sm font-medium">{sub.name}</p>
                                    <p className="text-slate-400 text-xs">${sub.cost.toFixed(2)}/mo</p>
                                </div>
                            </div>
                            {sub.status === 'Flagged' ? (
                                <button className="px-3 py-1 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20 hover:bg-red-500/20">Cancel For Me</button>
                            ) : (
                                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">Active</span>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2"><TrendingDown size={20} className="text-orange-400" /> Debt Payoff (Avalanche)</h2>
                </div>
                <div className="space-y-4">
                    {data?.debts?.map(debt => (
                        <div key={debt.id} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                            <div className="flex justify-between mb-2">
                                <span className="text-white font-medium flex items-center gap-2">{debt.icon} {debt.name}</span>
                                <span className="text-orange-400 font-bold">${debt.balance.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-2">APR: {debt.apr}% • Min: ${debt.minPayment}</p>
                            <ProgressBar current={0} max={100} colorClass="bg-orange-500" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>

        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Star size={20} className="text-yellow-400" /> Savings Goals</h2>
            </div>
            <div className="space-y-4">
                {data?.goals?.map(goal => (
                    <div key={goal.id}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-white">{goal.icon} {goal.name}</span>
                            <span className="text-slate-400">${goal.saved} / ${goal.target}</span>
                        </div>
                        <ProgressBar current={goal.saved} max={goal.target} colorClass="bg-yellow-500" />
                    </div>
                ))}
            </div>
        </Card>
    </div>
);

export default SpendingDebtHub;
