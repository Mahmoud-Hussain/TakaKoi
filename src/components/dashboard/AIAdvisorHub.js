import React, { useState } from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';

const AIAdvisorHub = () => {
    const [chat, setChat] = useState([
        { role: 'ai', text: "Hey! I'm your OmniFinance assistant. I can analyze your spending, or give you a reality check. Do you want me to Roast you or Hype you up?" }
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
        <Card className="flex flex-col h-[600px]">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><Bot size={20} className="text-indigo-400" /> Omni Assistant</h2>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {chat.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 mb-3">
                <button onClick={() => handleSend("Roast my spending 🔥")} className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-full hover:bg-red-500/20 transition-colors">🔥 Roast Me</button>
                <button onClick={() => handleSend("Hype me up 🚀")} className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full hover:bg-emerald-500/20 transition-colors">🚀 Hype Me</button>
            </div>

            <div className="flex gap-2">
                <input
                    type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about your finances..."
                    className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl py-2 px-4 focus:outline-none focus:border-indigo-500 text-sm"
                />
                <button onClick={() => handleSend()} className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-colors">
                    <ArrowRight size={20} />
                </button>
            </div>
        </Card>
    );
};

export default AIAdvisorHub;
