interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: 'primary' | 'outline' | 'outlineDark';
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
    const baseStyles = "text-sm font-medium transition-all rounded-xl cursor-pointer gap-2";
    const variantStyles = {
        primary: "bg-blue hover:bg-blue-hover text-white border-transparent p-2",
        outline: "border text-gray hover:text-white border-border-dark hover:border-border-hover bg-transparent p-2",
        outlineDark: "flex flex-1 items-center justify-center border bg-light-black border-border-dark text-xs hover:border-border-hover text-white/75 hover:text-white py-2"
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