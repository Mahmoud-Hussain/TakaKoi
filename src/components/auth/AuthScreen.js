import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../supabase';
import { DEFAULT_FINANCE_DATA } from '../../constants';

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
                    options: {
                        emailRedirectTo: window.location.origin,
                    },
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
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-base)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
        }}>
            <div className="animate-fade-in" style={{ width: '100%', maxWidth: 420 }}>
                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{
                        width: 56, height: 56,
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, var(--primary), #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px var(--primary-glow)',
                        margin: '0 auto 16px',
                    }}>
                        <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%' }} />
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                        Zenith Finance
                    </h1>
                    <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Your personal financial operating system</p>
                </div>

                {/* Card */}
                <div className="glass-card" style={{ padding: 32 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 24 }}>
                        {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset password'}
                    </h2>

                    {message.text && (
                        <div style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: 20,
                            fontSize: 13,
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 8,
                            background: message.type === 'error' ? 'var(--expense-surface)' : 'var(--income-surface)',
                            border: `1px solid ${message.type === 'error' ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)'}`,
                            color: message.type === 'error' ? 'var(--expense)' : 'var(--income)',
                        }}>
                            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                            <span>{message.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label className="body-sm" style={{ display: 'block', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 6 }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                                <input
                                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                    style={{ paddingLeft: 42 }}
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {mode !== 'forgot' && (
                            <div>
                                <label className="body-sm" style={{ display: 'block', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 6 }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                                    <input
                                        type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="input-field"
                                        style={{ paddingLeft: 42 }}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        <button disabled={loading} type="submit" className="btn-primary" style={{
                            width: '100%',
                            marginTop: 8,
                            padding: '14px 24px',
                            opacity: loading ? 0.6 : 1,
                        }}>
                            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link')}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border-subtle)', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {mode === 'login' ? (
                            <>
                                <button onClick={() => setMode('forgot')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, transition: 'color 0.2s' }}>
                                    Forgot your password?
                                </button>
                                <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                                    Don't have an account?{' '}
                                    <button onClick={() => setMode('signup')} style={{ background: 'none', border: 'none', color: 'var(--primary-light)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
                                        Sign up
                                    </button>
                                </p>
                            </>
                        ) : (
                            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                                Back to{' '}
                                <button onClick={() => setMode('login')} style={{ background: 'none', border: 'none', color: 'var(--primary-light)', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>
                                    Sign in
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
