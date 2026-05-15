import React, { useState } from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';

const AIAdvisorHub = () => {
    const [chat, setChat] = useState([
        { role: 'ai', text: "Hey! I'm your Zenith AI assistant. I can analyze your spending, predict trends, or give you a reality check. Do you want me to Roast you or Hype you up?" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (text = input) => {
        if (!text.trim()) return;
        setChat(prev => [...prev, { role: 'user', text }]);
        setInput('');

        setTimeout(() => {
            let response = "I'm analyzing your data... Looks like you're on track for your monthly goals.";
            if (text.toLowerCase().includes('roast')) {
                response = "Alright, let's look at last weekend... You spent $142 on 'Groceries' at Whole Foods, but your receipt says mostly organic Kombucha and artisanal cheese. Your emergency fund is crying. 😭";
            } else if (text.toLowerCase().includes('hype')) {
                response = "Let's GO! 🚀 You transferred $500 to Vanguard this month, your Net Worth is up 4%, and you haven't touched your Emergency Fund. You are literally building an empire!";
            }
            setChat(prev => [...prev, { role: 'ai', text: response }]);
        }, 1000);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Header */}
            <div>
                <h1 className="headline-lg" style={{ color: 'var(--text-primary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Bot size={28} style={{ color: 'var(--primary-light)' }} />
                    Zenith AI
                </h1>
                <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Your intelligent financial companion</p>
            </div>

            {/* Chat Container */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: 560, padding: 0 }}>
                {/* Messages */}
                <div className="hide-scrollbar" style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 24,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                }}>
                    {chat.map((msg, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                            animation: 'slide-up 0.3s ease-out',
                        }}>
                            <div style={{
                                maxWidth: '80%',
                                padding: '12px 16px',
                                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                fontSize: 14,
                                lineHeight: 1.5,
                                background: msg.role === 'user'
                                    ? 'var(--primary)'
                                    : 'rgba(255,255,255,0.05)',
                                color: msg.role === 'user'
                                    ? '#fff'
                                    : 'var(--text-secondary)',
                                border: msg.role === 'user'
                                    ? 'none'
                                    : '1px solid var(--border-subtle)',
                            }}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div style={{ padding: '0 24px 12px', display: 'flex', gap: 8 }}>
                    <button onClick={() => handleSend("Roast my spending 🔥")} style={{
                        fontSize: 12, padding: '6px 14px',
                        background: 'var(--expense-surface)',
                        color: 'var(--expense)',
                        border: '1px solid rgba(244,63,94,0.2)',
                        borderRadius: 'var(--radius-pill)',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s ease',
                    }}>
                        🔥 Roast Me
                    </button>
                    <button onClick={() => handleSend("Hype me up 🚀")} style={{
                        fontSize: 12, padding: '6px 14px',
                        background: 'var(--income-surface)',
                        color: 'var(--income)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 'var(--radius-pill)',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s ease',
                    }}>
                        🚀 Hype Me
                    </button>
                    <button onClick={() => handleSend("Give me a savings tip")} style={{
                        fontSize: 12, padding: '6px 14px',
                        background: 'var(--primary-surface)',
                        color: 'var(--primary-light)',
                        border: '1px solid rgba(79,70,229,0.2)',
                        borderRadius: 'var(--radius-pill)',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s ease',
                    }}>
                        <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                        Savings Tip
                    </button>
                </div>

                {/* Input */}
                <div style={{
                    padding: '12px 24px 20px',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: 10,
                }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about your finances..."
                        className="input-field"
                        style={{ flex: 1 }}
                    />
                    <button onClick={() => handleSend()} className="btn-primary" style={{ padding: '10px 14px' }}>
                        <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAdvisorHub;
