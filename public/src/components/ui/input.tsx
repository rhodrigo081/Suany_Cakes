import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: LucideIcon;
    rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, rightElement, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        const paddingLeft = Icon ? 'pl-10' : 'pl-2';

        const paddingRight = (isPassword || rightElement) ? 'pr-12' : 'pr-4';

        return (
            <div className="w-full text-left">
                <div className="flex justify-between items-center mb-2">
                    {label && (
                        <label className="text-foreground font-medium text-sm">
                            {label}
                        </label>
                    )}
                    {rightElement}
                </div>
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-foreground w-5 h-5" />
                    )}

                    <input
                        {...props}
                        ref={ref}
                        type={inputType}
                        className={`
                            w-full py-2 bg-accent/20 border border-border rounded-xl 
                            focus:outline-none font-medium focus:ring-2 focus:ring-primary 
                            focus:border-primary transition-all placeholder:text-accent-foreground/50 
                            text-foreground
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
            </div>
        );
    }
);