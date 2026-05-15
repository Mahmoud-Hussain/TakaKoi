import React, { useState } from 'react';
import { Flame, Briefcase, CreditCard, ScanLine, Activity, Camera, CheckCircle2, Users } from 'lucide-react';

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
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div>
                <h1 className="headline-lg" style={{ color: 'var(--text-primary)', marginBottom: 4 }}>Power Tools</h1>
                <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Advanced financial instruments</p>
            </div>

            {/* FIRE Engine */}
            <div className="glass-card" style={{ border: '1px solid rgba(79,70,229,0.2)' }}>
                <h2 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Flame size={20} style={{ color: '#F97316' }} /> F.I.R.E. Engine Simulator
                </h2>
                <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
                    Play with your numbers to see when you can reach Financial Independence.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                                <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Target Retirement Age</label>
                                <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>{fireAge}</span>
                            </div>
                            <input type="range" min="30" max="70" value={fireAge} onChange={(e) => setFireAge(e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--primary)' }} />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                                <label style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Monthly Savings Rate</label>
                                <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>{savingsRate}%</span>
                            </div>
                            <input type="range" min="5" max="80" value={savingsRate} onChange={(e) => setSavingsRate(e.target.value)}
                                style={{ width: '100%', accentColor: 'var(--primary)' }} />
                        </div>
                        <div style={{
                            padding: 20,
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)',
                        }}>
                            <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Projected Nest Egg at {fireAge}</p>
                            <p className="headline-lg" style={{ color: 'var(--income)', marginTop: 4 }}>$1,450,000</p>
                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Assuming 7% avg market return.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                            <h3 style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                                <Briefcase size={16} style={{ color: 'var(--primary-light)' }} /> Tax & Freelance Hub
                            </h3>
                            <p className="body-sm" style={{ color: 'var(--text-muted)' }}>
                                AI found 3 potential write-offs this month saving you an estimated <span style={{ color: 'var(--income)', fontWeight: 700 }}>$142</span>.
                            </p>
                            <button style={{ marginTop: 12, background: 'none', border: 'none', color: 'var(--primary-light)', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0 }}>
                                Review Deductions →
                            </button>
                        </div>

                        <div style={{ padding: 20, background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                            <h3 style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                                <CreditCard size={16} style={{ color: '#A855F7' }} /> Card Optimizer
                            </h3>
                            <p className="body-sm" style={{ color: 'var(--text-muted)' }}>
                                Use <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Chase Sapphire</span> for Dining (3x pts) and{' '}
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Amex Gold</span> for Groceries (4x pts).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Receipt Scanner */}
            <div className="glass-card-elevated" style={{ background: 'linear-gradient(135deg, var(--bg-raised), rgba(79,70,229,0.05))' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h2 className="title-md" style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <ScanLine size={20} style={{ color: 'var(--primary-light)' }} /> AI Receipt Scanner
                    </h2>
                    <span className="badge-safe" style={{ background: 'var(--primary-surface)', color: 'var(--primary-light)', border: '1px solid rgba(79,70,229,0.2)' }}>Beta</span>
                </div>
                <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
                    Instantly extract line-items, tax data, and categorize purchases for your business or budget.
                </p>

                {!scanResult ? (
                    <div
                        onClick={handleScan}
                        style={{
                            border: '2px dashed rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 40,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            opacity: isScanning ? 0.5 : 1,
                            pointerEvents: isScanning ? 'none' : 'auto',
                        }}
                    >
                        <div style={{
                            width: 56, height: 56, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.05)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                            border: '1px solid var(--border-subtle)',
                        }}>
                            {isScanning ?
                                <Activity size={24} style={{ color: 'var(--primary-light)' }} className="animate-pulse-soft" /> :
                                <Camera size={24} style={{ color: 'var(--text-muted)' }} />
                            }
                        </div>
                        <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: 4 }}>
                            {isScanning ? 'Extracting merchant data...' : 'Click to scan or drop receipt here'}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Supports JPG, PNG, PDF</p>
                    </div>
                ) : (
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: 24,
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid rgba(16,185,129,0.2)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--income)', marginBottom: 20 }}>
                            <CheckCircle2 size={18} />
                            <span style={{ fontWeight: 500, fontSize: 14 }}>Receipt successfully processed</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, fontSize: 14 }}>
                                <span style={{ color: 'var(--text-muted)' }}>Merchant</span>
                                <span style={{ color: 'var(--text-primary)' }}>{scanResult.merchant}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, fontSize: 14 }}>
                                <span style={{ color: 'var(--text-muted)' }}>Category</span>
                                <span className="badge-safe" style={{ background: 'var(--primary-surface)', color: 'var(--primary-light)' }}>{scanResult.category}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10, fontSize: 14 }}>
                                <span style={{ color: 'var(--text-muted)' }}>Tax Detected</span>
                                <span style={{ color: 'var(--text-primary)' }}>${scanResult.tax.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4, fontSize: 14 }}>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Total Logged</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 16 }}>${scanResult.amount.toFixed(2)}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                            <button className="btn-primary" style={{ flex: 1 }}>Add to Transactions</button>
                            <button className="btn-ghost" onClick={() => setScanResult(null)} style={{ flex: 1 }}>Scan Another</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Family Sync */}
            <div className="glass-card">
                <h2 className="title-md" style={{ color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Users size={20} style={{ color: 'var(--primary-light)' }} /> Family & Household Sync
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {data?.family?.map(member => (
                        <div key={member.id} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '14px 16px',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-sm)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 24 }}>{member.icon}</span>
                                <div>
                                    <p className="body-sm" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{member.name}</p>
                                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{member.status}</p>
                                </div>
                            </div>
                            <button className="btn-ghost" style={{ fontSize: 12, padding: '6px 14px' }}>Manage</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PowerToolsHub;
