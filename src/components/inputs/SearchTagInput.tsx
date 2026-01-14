import { X } from "lucide-react";

interface SearchTagInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchParam: string;
    setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const SearchTagInput: React.FC<SearchTagInputProps> = ({ onChange, searchParam, setSearchParam }) => {
    return (
        <div className="flex flex-row w-full border border-border-dark rounded-full bg-card-dark focus-within:border-blue transition-all">
            <input
                onChange={onChange}
                type="text"
                value={searchParam}
                placeholder="🏷️ Busque pelos campos do relatório..."
                className="py-2 px-4 w-full outline-none bg-transparent placeholder:text-dark-gray text-white"
            />
            <div
                className="flex items-center justify-center w-fit px-4"
                onClick={() => setSearchParam("")}
            >
                {searchParam && (
                    <X
                        size={20}
                        className="text-blue cursor-pointer hover:text-blue-hover transition-colors"
                    />
                )}
            </div>
        </div>
    );
}

export default SearchTagInput;