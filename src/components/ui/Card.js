import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg ${className}`}>
        {children}
    </div>
);

export default Card;
