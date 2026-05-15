import React from 'react';

const ProgressBar = ({ current, max, colorClass = "bg-indigo-500" }) => {
    const percent = Math.min(100, Math.max(0, (current / max) * 100));
    return (
        <div className="w-full bg-slate-800/50 rounded-full h-2 mt-2">
            <div className={`h-2 rounded-full ${colorClass}`} style={{ width: `${percent}%` }}></div>
        </div>
    );
};

export default ProgressBar;
