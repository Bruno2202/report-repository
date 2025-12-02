import { X } from "lucide-react"
import type { Tag } from "../data/tags"
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

interface FieldTagProps {
    tag: Tag;
}

const FieldTag: React.FC<FieldTagProps> = ({ tag }) => {
    const { tags, setTags } = useContext(SearchContext)!;

    return (
        <span
            onClick={() => setTags(tags.filter(t => t.id !== tag.id))}
            className="flex px-2 py-1 bg-blue/12 text-sm rounded-full gap-1 items-center select-none cursor-pointer"
        >
            <p className="flex flex-row items-center gap-2 text-blue text-sm hover: font-medium">
                {tag.name} <X size={16} />
            </p>
        </span>
    )
}

export default FieldTag