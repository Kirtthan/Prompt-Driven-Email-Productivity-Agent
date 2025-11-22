import React from 'react';

const Input = ({ label, error, icon, className = '', ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
                        {icon}
                    </div>
                )}
                <input
                    className={`
            w-full bg-white border border-border-light rounded-lg 
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 
            text-text-primary placeholder-text-tertiary
            focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-status-error focus:border-status-error focus:ring-status-error/10' : ''}
          `}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-status-error">{error}</p>
            )}
        </div>
    );
};

export default Input;
