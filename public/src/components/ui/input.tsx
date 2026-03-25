import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
    rightElement?: React.ReactNode;
    error?: string;
    isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, rightElement, type, error, isRequired, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        const paddingLeft = Icon ? 'pl-10' : 'pl-2';
        const paddingRight = (isPassword || rightElement) ? 'pr-12' : 'pr-4';

        return (
            <div className="w-full text-left">
                <div className="flex justify-between items-center mb-2">
                    {label && (
                        <label className={`font-medium text-sm ${error ? 'text-red-500' : 'text-foreground'}`}>
                            {label}
                            {isRequired && <span className="text-primary ml-1">*</span>}
                        </label>
                    )}
                    {rightElement}
                </div>

                <div className="relative">
                    {Icon && (
                        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${error ? 'text-red-500' : 'text-accent-foreground'}`} />
                    )}

                    <input
                        {...props}
                        ref={ref}
                        type={inputType}
                        className={`
                            w-full py-2 bg-accent/20 border rounded-xl text-base
                            focus:outline-none font-medium focus:ring-2 transition-all 
                            placeholder:text-accent-foreground/50 text-foreground
                            ${error
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : 'border-border focus:ring-primary focus:border-primary'
                            }
                            ${paddingLeft} 
                            ${paddingRight} 
                        `}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-foreground hover:text-foreground cursor-pointer"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                {error && (
                    <span className="text-red-500 text-xs mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);