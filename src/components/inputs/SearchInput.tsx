const SearchInput: React.FC = () => {
    return (
        <input
            type="text"
            placeholder="🔍 Busque por nome, xml ou conteúdo da descrição..."
            className="py-2 px-4 border border-border-dark rounded-md w-full outline-none focus:border-blue transition-colors bg-card-dark placeholder:text-dark-gray text-white"
        />
    );
}

export default SearchInput;