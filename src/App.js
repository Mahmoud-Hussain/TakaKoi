import React, { useState, useEffect } from 'react';
import { 
    Home, Receipt, Wallet, BarChart3, 
    LogOut, Sparkles, Bot, Settings,
    Menu, X
} from 'lucide-react';
import { supabase } from './supabase';
import './styles.css';

import AuthScreen from './components/auth/AuthScreen';
import OverviewHub from './components/dashboard/OverviewHub';
import TransactionsHub from './components/dashboard/TransactionsHub';
import BudgetHub from './components/dashboard/BudgetHub';
import AnalyticsHub from './components/dashboard/AnalyticsHub';
import PowerToolsHub from './components/dashboard/PowerToolsHub';
import AIAdvisorHub from './components/dashboard/AIAdvisorHub';

export default function App() {
    const [activeTab, setActiveTab] = useState('home');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [financeData, setFinanceData] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);

    // Initialize Supabase Auth
    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
        };

        getInitialSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch and Subscribe to Profile Data
    useEffect(() => {
        if (!user) {
            setFinanceData(null);
            return;
        }

        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('data')
                .eq('id', user.id)
                .single();
            
            if (error) {
                console.error("Data Fetch Error:", error);
            } else if (data) {
                setFinanceData(data.data);
            }
        };

        fetchProfile();

        // Subscribe to real-time updates
        const channel = supabase
            .channel('public:profiles')
            .on('postgres_changes', { 
                event: 'UPDATE', 
                schema: 'public', 
                table: 'profiles', 
                filter: `id=eq.${user.id}` 
            }, payload => {
                setFinanceData(payload.new.data);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user]);

    const handleConnectBank = async () => {
        if (!user || !financeData) return;
        const newAccount = { id: Date.now(), name: "Fidelity Investments", balance: 15400, type: "Investment", icon: "💎" };
        
        const updatedData = {
            ...financeData,
            totalBalance: (financeData.totalBalance || 0) + newAccount.balance,
            connectedAccounts: [...(financeData.connectedAccounts || []), newAccount]
        };

        const { error } = await supabase
            .from('profiles')
            .update({ data: updatedData })
            .eq('id', user.id);
        
        if (error) console.error("Update Error:", error);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'var(--bg-base)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{
                    width: 48, height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, var(--primary), #8B5CF6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 30px var(--primary-glow)',
                    animation: 'pulse-soft 1.5s ease-in-out infinite'
                }}>
                    <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%' }} />
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500 }}>Loading Zenith...</span>
            </div>
        );
    }

    if (!user) return <AuthScreen />;

    const NAV_ITEMS = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'transactions', label: 'Transactions', icon: Receipt },
        { id: 'budget', label: 'Budget', icon: Wallet },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    const SECONDARY_NAV = [
        { id: 'tools', label: 'Power Tools', icon: Sparkles },
        { id: 'ai', label: 'AI Advisor', icon: Bot },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <OverviewHub data={financeData} onConnectBank={handleConnectBank} user={user} />;
            case 'transactions': return <TransactionsHub data={financeData} />;
            case 'budget': return <BudgetHub data={financeData} />;
            case 'analytics': return <AnalyticsHub data={financeData} />;
            case 'tools': return <PowerToolsHub data={financeData} />;
            case 'ai': return <AIAdvisorHub />;
            default: return <OverviewHub data={financeData} onConnectBank={handleConnectBank} user={user} />;
        }
    };

    return (
        <div style={{ minHeight: '100vh', fontFamily: "'Inter', sans-serif", display: 'flex' }}>
            {/* Desktop Sidebar */}
            <nav className="glass-panel" style={{
                width: 260,
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                minHeight: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 40,
            }}
            id="desktop-sidebar"
            >
                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 12px', marginBottom: 24 }}>
                    <div style={{
                        width: 36, height: 36,
                        borderRadius: 'var(--radius-sm)',
                        background: 'linear-gradient(135deg, var(--primary), #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 20px var(--primary-glow)',
                    }}>
                        <div style={{ width: 12, height: 12, background: '#fff', borderRadius: '50%' }} />
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Zenith</span>
                </div>

                {/* Primary Nav */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ padding: '0 12px', marginBottom: 8 }}>
                        <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Main</span>
                    </div>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '10px 12px',
                                borderRadius: 'var(--radius-sm)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: activeTab === item.id ? 'var(--primary-glow)' : 'transparent',
                                color: activeTab === item.id ? 'var(--primary-light)' : 'var(--text-secondary)',
                                fontWeight: activeTab === item.id ? 600 : 400,
                                fontSize: 14,
                                fontFamily: 'inherit',
                                width: '100%',
                                textAlign: 'left',
                            }}
                        >
                            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.8} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Secondary Nav */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 16 }}>
                    <div style={{ padding: '0 12px', marginBottom: 8 }}>
                        <span className="label-caps" style={{ color: 'var(--text-muted)' }}>Tools</span>
                    </div>
                    {SECONDARY_NAV.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '10px 12px',
                                borderRadius: 'var(--radius-sm)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                background: activeTab === item.id ? 'var(--primary-glow)' : 'transparent',
                                color: activeTab === item.id ? 'var(--primary-light)' : 'var(--text-secondary)',
                                fontWeight: activeTab === item.id ? 600 : 400,
                                fontSize: 14,
                                fontFamily: 'inherit',
                                width: '100%',
                                textAlign: 'left',
                            }}
                        >
                            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.8} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* User Section */}
                <div style={{
                    marginTop: 'auto',
                    paddingTop: 16,
                    borderTop: '1px solid var(--border-subtle)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
                        <div style={{ minWidth: 0 }}>
                            <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: 11 }}>Synced with Supabase</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Log Out"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                padding: 8,
                                borderRadius: 'var(--radius-sm)',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                            }}
                            onMouseEnter={e => { e.target.style.color = 'var(--expense)'; e.target.style.background = 'var(--expense-surface)'; }}
                            onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.background = 'transparent'; }}
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: 260,
                padding: '32px 40px',
                minHeight: '100vh',
                overflowY: 'auto',
                paddingBottom: 100,
            }}
            id="main-content"
            >
                <div style={{ maxWidth: 960, margin: '0 auto' }}>
                    {renderContent()}
                </div>
            </main>

            {/* Mobile Bottom Tab Bar */}
            <div className="bottom-tabs" id="mobile-tabs" style={{ display: 'none' }}>
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`tab-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                        <span className="tab-icon-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 1.8} />
                        </span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    #desktop-sidebar { display: none !important; }
                    #main-content { margin-left: 0 !important; padding: 20px 16px 100px !important; }
                    #mobile-tabs { display: flex !important; }
                }
            `}</style>
        </div>
    );
}
