import React from 'react';
import { ShieldAlert, CheckCircle2, Plus, Calendar } from 'lucide-react';
import Card from '../ui/Card';

const OverviewHub = ({ data, onConnectBank }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <ShieldAlert className="text-indigo-400" size={24} />
                <div>
                    <p className="text-white font-medium">Smart Insights Active</p>
                    <p className="text-slate-300 text-sm">You have an upcoming bill for $54.99 (Adobe) in 2 days. No anomalies detected.</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border-emerald-500/30">
                <h3 className="text-slate-400 text-sm font-medium">Safe to Spend</h3>
                <p className="text-4xl font-bold text-white mt-2">${data?.safeToSpend?.toFixed(2) || '0.00'}</p>
                <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1"><CheckCircle2 size={16} /> All bills covered</p>
            </Card>
            <Card>
                <h3 className="text-slate-400 text-sm font-medium">Total Balance</h3>
                <p className="text-3xl font-bold text-white mt-2">${data?.totalBalance?.toLocaleString() || '0'}</p>
            </Card>
            <Card className="border-indigo-500/30">
                <h3 className="text-slate-400 text-sm font-medium mb-3">Linked Accounts</h3>
                <div className="space-y-2 mb-3">
                    {data?.connectedAccounts?.map(acc => (
                        <div key={acc.id} className="flex justify-between items-center text-sm">
                            <span className="text-slate-300">{acc.icon} {acc.name}</span>
                            <span className="text-white font-medium">${acc.balance.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <button onClick={onConnectBank} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                    <Plus size={16} /> Connect Institution
                </button>
            </Card>
        </div>

        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2"><Calendar size={20} className="text-indigo-400" /> Upcoming Cash Flow</h2>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">View Calendar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.upcomingBills?.map(bill => (
                    <div key={bill.id} className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-xl shadow-inner">{bill.icon}</div>
                            <div>
                                <p className="text-white font-medium text-sm">{bill.name}</p>
                                <p className="text-slate-400 text-xs">{bill.date}</p>
                            </div>
                        </div>
                        <p className="font-medium text-white">${bill.amount.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </Card>

        <Card>
            <h3 className="text-slate-400 text-sm font-medium mb-4">Recent Transactions</h3>
            <div className="space-y-3">
                {data?.transactions?.map(tx => (
                    <div key={tx.id} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{tx.icon}</span>
                            <div>
                                <p className="text-white font-medium">{tx.name}</p>
                                <p className="text-slate-400 text-sm">{tx.category} • {tx.date}</p>
                            </div>
                        </div>
                        <span className={`font-medium ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                            {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </Card>
    </div>
);

export default OverviewHub;
