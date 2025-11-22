import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
    return (
        <div
            className={`
        bg-white border border-border-light rounded-xl shadow-sm
        ${hover ? 'hover:border-accent-blue/50 hover:shadow-md transition-all duration-300' : ''} 
        ${className}
      `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
