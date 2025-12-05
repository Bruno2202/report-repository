interface SearchInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
    return (
        <input
            type="search"
            placeholder="🔍 Busque por nome, xml ou conteúdo da descrição..."
            onChange={onChange}
            className="py-2 px-4 border border-border-dark rounded-xl w-full outline-none focus:border-blue transition-colors bg-card-dark placeholder:text-dark-gray text-white"
        />
    );
}

export default SearchInput;