import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, Wallet, LineChart as TrendIcon, Sparkles, Bot, 
    LogOut 
} from 'lucide-react';
import { supabase } from './supabase';
import './styles.css';

import AuthScreen from './components/auth/AuthScreen';
import OverviewHub from './components/dashboard/OverviewHub';
import SpendingDebtHub from './components/dashboard/SpendingDebtHub';
import WealthGrowthHub from './components/dashboard/WealthGrowthHub';
import PowerToolsHub from './components/dashboard/PowerToolsHub';
import AIAdvisorHub from './components/dashboard/AIAdvisorHub';

export default function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [financeData, setFinanceData] = useState(null);

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

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-indigo-500">Loading OmniFinance...</div>;
    if (!user) return <AuthScreen />;

    const NAV_ITEMS = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'spending', label: 'Spending & Debt', icon: Wallet },
        { id: 'wealth', label: 'Wealth & Growth', icon: TrendIcon },
        { id: 'tools', label: 'Power Tools', icon: Sparkles },
        { id: 'ai', label: 'AI Advisor', icon: Bot },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewHub data={financeData} onConnectBank={handleConnectBank} />;
            case 'spending': return <SpendingDebtHub data={financeData} />;
            case 'wealth': return <WealthGrowthHub data={financeData} />;
            case 'tools': return <PowerToolsHub data={financeData} />;
            case 'ai': return <AIAdvisorHub />;
            default: return <OverviewHub data={financeData} onConnectBank={handleConnectBank} />;
        }
    };

    return (
        <div className="min-h-screen font-sans flex flex-col md:flex-row selection:bg-indigo-500/30 text-slate-200">
            <nav className="md:w-64 glass-panel p-4 md:p-6 flex flex-col gap-6 md:min-h-screen z-10">
                <div className="flex items-center gap-3 px-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">Zenith Finance</span>
                </div>

                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible hide-scrollbar flex-1">
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all whitespace-nowrap md:whitespace-normal ${activeTab === item.id
                                    ? 'bg-indigo-500/20 text-indigo-400 font-medium'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? 'stroke-[2.5px]' : ''} />
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="mt-auto hidden md:block pt-6 border-t border-slate-800">
                    <div className="flex items-center justify-between px-2">
                        <div className="text-sm truncate pr-2">
                            <p className="text-white font-medium truncate">{user.email}</p>
                            <p className="text-slate-500 text-xs">Supabase Synced</p>
                        </div>
                        <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 p-2 rounded-lg hover:bg-slate-800 transition-colors" title="Log Out">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto h-screen">
                <div className="max-w-6xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
