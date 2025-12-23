interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant = 'primary',
    disabled,
    loading
}) => {
    const baseStyles = "text-sm font-medium transition-all rounded-xl p-2 cursor-pointer flex items-center justify-center gap-2 min-w-[100px]";
    const variantStyles = {
        primary: "bg-blue hover:bg-blue-hover text-white border-transparent",
        outline: "border text-gray hover:text-white border-border-dark hover:border-border-hover bg-transparent"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${baseStyles} 
                ${variantStyles[variant]} 
                ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
            `}
        >
            {loading ? (
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                text
            )}
        </button>
    );
}

export default Button;