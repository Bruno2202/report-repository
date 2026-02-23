import type { LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'outline' | 'outlineDark' | 'danger';
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    icon?: LucideIcon;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant = 'primary',
    disabled,
    loading,
    className = "",
    icon: Icon
}) => {
    const baseStyles = "flex items-center justify-center text-sm font-medium transition-all rounded-xl cursor-pointer gap-2.5";

    const variantStyles = {
        primary: "bg-blue hover:bg-blue-hover text-white border-transparent p-2",
        outline: "border text-gray-400 hover:text-white border-border-dark hover:border-border-hover bg-transparent p-2",
        outlineDark: "flex flex-1 items-center justify-center border bg-light-black border-border-dark text-xs hover:border-border-hover text-white/75 hover:text-white py-2",
        danger: "bg-error/10 hover:bg-error text-error hover:text-white border border-error/20 hover:border-error p-2 shadow-sm shadow-error/5"
    };

    const combinedStyles = twMerge(
        baseStyles, 
        variantStyles[variant], 
        (disabled || loading) && 'opacity-70 cursor-not-allowed',
        !disabled && !loading && 'active:scale-95',
        className
    );

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={combinedStyles}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                    {Icon && <Icon size={18} className="shrink-0" />}
                    <span>{text}</span>
                </>
            )}
        </button>
    );
}

export default Button;