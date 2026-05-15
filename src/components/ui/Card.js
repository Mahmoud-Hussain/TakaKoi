import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`glass-card p-6 ${className}`}>
        {children}
    </div>
);

export default Card;
