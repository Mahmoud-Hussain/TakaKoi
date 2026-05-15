import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../supabase';
import { DEFAULT_FINANCE_DATA } from '../../constants';
import Card from '../ui/Card';

const AuthScreen = () => {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            if (mode === 'signup') {
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                
                if (authError) throw authError;

                if (authData.user) {
                    // Initialize user profile data
                    const { error: profileError } = await supabase
                        .from('profiles')
                        .update({ data: DEFAULT_FINANCE_DATA })
                        .eq('id', authData.user.id);
                    
                    if (profileError) console.error("Profile Init Error:", profileError);
                    setMessage({ text: 'Signup successful! Please check your email for confirmation.', type: 'success' });
                }
            } else if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } else if (mode === 'forgot') {
                const { error } = await supabase.auth.resetPasswordForEmail(email);
                if (error) throw error;
                setMessage({ text: 'Password reset link sent to your email.', type: 'success' });
            }
        } catch (err) {
            setMessage({ text: err.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
            <div className="w-full max-w-md animate-fade-in">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mx-auto mb-4">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">OmniFinance</h1>
                    <p className="text-slate-400">Your personal financial operating system</p>
                </div>

                <Card className="p-8 border-slate-800">
                    <h2 className="text-xl font-semibold text-white mb-6">
                        {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset password'}
                    </h2>

                    {message.text && (
                        <div className={`p-3 rounded-lg mb-6 text-sm flex items-start gap-2 ${message.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
                            <AlertCircle size={16} className="shrink-0 mt-0.5" />
                            <span>{message.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                                <input
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {mode !== 'forgot' && (
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                                    <input
                                        type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        <button disabled={loading} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-colors flex justify-center items-center gap-2 mt-6">
                            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link')}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-center flex flex-col gap-3">
                        {mode === 'login' ? (
                            <>
                                <button onClick={() => setMode('forgot')} className="text-slate-400 hover:text-indigo-400 transition-colors">Forgot your password?</button>
                                <p className="text-slate-400">Don't have an account? <button onClick={() => setMode('signup')} className="text-indigo-400 font-medium hover:underline">Sign up</button></p>
                            </>
                        ) : (
                            <p className="text-slate-400">Back to <button onClick={() => setMode('login')} className="text-indigo-400 font-medium hover:underline">Sign in</button></p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AuthScreen;
