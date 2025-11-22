import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: "bg-bg-tertiary text-text-secondary border-border-light",
        primary: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
        accent: "bg-accent-clay/10 text-accent-clay border-accent-clay/20",
        success: "bg-status-success/10 text-status-success border-status-success/20",
        warning: "bg-status-warning/10 text-status-warning border-status-warning/20",
        danger: "bg-status-error/10 text-status-error border-status-error/20",
        secondary: "bg-bg-tertiary text-text-secondary border-border-light",
    };

    return (
        <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${variants[variant] || variants.default}
      ${className}
    `}>
            {children}
        </span>
    );
};

export default Badge;
