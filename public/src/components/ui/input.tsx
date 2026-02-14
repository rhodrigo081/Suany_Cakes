import React, { useState } from 'react';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
    rightElement?: React.ReactNode;
}

export const Input = ({ label, icon: Icon, rightElement, type, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-2">
                <label className="text-foreground font-medium text-sm">{label}</label>
                {rightElement}
            </div>
            <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-foreground w-5 h-5" />
                <input
                    {...props}
                    type={inputType}
                    className="w-full pl-10 pr-12 py-2 bg-accent/20 border border-border rounded-xl focus:outline-none font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-accent-foreground"
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
        </div>
    );
};