import React, { useState } from 'react';
import { Flame, Briefcase, CreditCard, ScanLine, Activity, Camera, CheckCircle2, Users } from 'lucide-react';
import Card from '../ui/Card';

const PowerToolsHub = ({ data }) => {
    const [fireAge, setFireAge] = useState(45);
    const [savingsRate, setSavingsRate] = useState(30);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);

    const handleScan = () => {
        setIsScanning(true);
        setScanResult(null);
        setTimeout(() => {
            setIsScanning(false);
            setScanResult({ merchant: "Home Depot", amount: 145.20, category: "Home Improvement", tax: 11.25 });
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <Card className="border-indigo-500/30">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><Flame size={20} className="text-orange-500" /> F.I.R.E. Engine Simulator</h2>
                <p className="text-slate-400 text-sm mb-6">Play with your numbers to see when you can reach Financial Independence.</p>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <label className="text-white">Target Retirement Age</label>
                                <span className="text-indigo-400 font-bold">{fireAge}</span>
                            </div>
                            <input type="range" min="30" max="70" value={fireAge} onChange={(e) => setFireAge(e.target.value)} className="w-full accent-indigo-500" />
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <label className="text-white">Monthly Savings Rate</label>
                                <span className="text-indigo-400 font-bold">{savingsRate}%</span>
                            </div>
                            <input type="range" min="5" max="80" value={savingsRate} onChange={(e) => setSavingsRate(e.target.value)} className="w-full accent-indigo-500" />
                        </div>
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                            <p className="text-sm text-slate-400">Projected Nest Egg at {fireAge}</p>
                            <p className="text-2xl font-bold text-emerald-400 mt-1">$1,450,000</p>
                            <p className="text-xs text-slate-500 mt-1">Assuming 7% avg market return.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <h3 className="text-white font-medium mb-2 flex items-center gap-2"><Briefcase size={16} className="text-indigo-400" /> Tax & Freelance Hub</h3>
                            <p className="text-sm text-slate-400">AI found 3 potential write-offs this month saving you an estimated <span className="text-emerald-400 font-bold">$142</span>.</p>
                            <button className="mt-3 text-sm text-indigo-400 hover:text-indigo-300 font-medium">Review Deductions →</button>
                        </div>

                        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <h3 className="text-white font-medium mb-2 flex items-center gap-2"><CreditCard size={16} className="text-purple-400" /> Card Optimizer</h3>
                            <p className="text-sm text-slate-400">Use <span className="text-white font-medium">Chase Sapphire</span> for Dining (3x pts) and <span className="text-white font-medium">Amex Gold</span> for Groceries (4x pts).</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="border-indigo-500/30 bg-gradient-to-br from-slate-900 to-indigo-950/20">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2"><ScanLine size={20} className="text-indigo-400" /> AI Receipt Scanner</h2>
                    <span className="text-xs font-medium px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">Beta</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">Instantly extract line-items, tax data, and categorize purchases for your business or budget by uploading a receipt.</p>

                {!scanResult ? (
                    <div
                        onClick={handleScan}
                        className={`border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center cursor-pointer hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all ${isScanning ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <div className="w-14 h-14 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800 shadow-lg">
                            {isScanning ? <Activity className="text-indigo-400 animate-pulse" size={24} /> : <Camera className="text-slate-400" size={24} />}
                        </div>
                        <p className="text-white font-medium mb-1">{isScanning ? 'Extracting merchant data...' : 'Click to scan or drop receipt here'}</p>
                        <p className="text-xs text-slate-500">Supports JPG, PNG, PDF</p>
                    </div>
                ) : (
                    <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 shadow-lg shadow-emerald-500/5">
                        <div className="flex items-center gap-2 text-emerald-400 mb-5">
                            <CheckCircle2 size={18} />
                            <span className="font-medium text-sm">Receipt successfully processed</span>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Merchant</span><span className="text-white">{scanResult.merchant}</span></div>
                            <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Category</span><span className="text-indigo-400 font-medium bg-indigo-500/10 px-2 py-0.5 rounded">{scanResult.category}</span></div>
                            <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Tax Detected</span><span className="text-white">${scanResult.tax.toFixed(2)}</span></div>
                            <div className="flex justify-between pt-1"><span className="text-slate-400 font-medium">Total Logged</span><span className="text-white font-bold text-base">${scanResult.amount.toFixed(2)}</span></div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">Add to Transactions</button>
                            <button onClick={() => setScanResult(null)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors">Scan Another</button>
                        </div>
                    </div>
                )}
            </Card>

            <Card>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Users size={20} className="text-indigo-400" /> Family & Household Sync</h2>
                <div className="space-y-3">
                    {data?.family?.map(member => (
                        <div key={member.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{member.icon}</span>
                                <div>
                                    <p className="text-white font-medium">{member.name}</p>
                                    <p className="text-slate-400 text-xs">{member.status}</p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg">Manage</button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default PowerToolsHub;
