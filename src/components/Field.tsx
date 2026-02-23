import { X } from "lucide-react";
import type { TagModel } from "../models/TagModel";

interface FieldTagProps {
    tag: TagModel;
    setSelectedTags: React.Dispatch<React.SetStateAction<TagModel[]>>;
}

const FieldTag: React.FC<FieldTagProps> = ({ tag, setSelectedTags }) => {
    const handleRemove = () => {
        setSelectedTags(prev => prev.filter(t => t.id !== tag.id));
    };

    return (
        <div
            className={`
                group flex items-center gap-1.5 
                pl-3 pr-1.5 py-1 
                bg-blue/10 border border-blue/20
                hover:border-blue/40 hover:bg-blue/20
                rounded-full transition-colors duration-200
                cursor-pointer
            `}
            onClick={handleRemove}
        >
            <span className="text-blue text-sm font-medium select-none">
                {tag.name}
            </span>
            
            <button
                type="button"
                className={`
                    p-0.5 rounded-full
                    text-blue/60 hover:text-blue hover:bg-blue/20
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue/40
                    cursor-pointer
                `}
                aria-label={`Remover tag ${tag.name}`}
            >
                <X size={14} strokeWidth={2.5} />
            </button>
        </div>
    );
};

export default FieldTag;