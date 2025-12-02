interface SearchTagInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchTagInput: React.FC<SearchTagInputProps> = ({ onChange }) => {
    return (
        <input
            onChange={onChange}
            type="text"
            placeholder="🏷️ Busque pelos campos do relatório..."
            className="py-2 px-4 border border-border-dark rounded-full w-full outline-none focus:border-blue transition-colors bg-card-dark placeholder:text-dark-gray text-white"
        />
    );
}

export default SearchTagInput;