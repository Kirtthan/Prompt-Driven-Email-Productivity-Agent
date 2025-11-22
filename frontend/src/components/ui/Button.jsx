import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans";

    const variants = {
        primary: "bg-gradient-to-br from-accent-blue to-[#38BDF8] text-white shadow-lg shadow-accent-blue/20 hover:shadow-accent-blue/40 hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-white text-text-secondary border border-border-light hover:bg-bg-hover hover:text-text-primary hover:border-border-medium hover:-translate-y-0.5 active:translate-y-0 shadow-sm",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-hover",
        danger: "bg-red-50 text-status-error border border-red-100 hover:bg-red-100",
        glass: "bg-white/50 backdrop-blur-md border border-white/20 text-text-primary hover:bg-white/70"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "p-2"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : icon ? (
                <span className={`${children ? 'mr-2' : ''} flex items-center`}>{icon}</span>
            ) : null}
            {children}
        </button>
    );
};

export default Button;
